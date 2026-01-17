from __future__ import annotations

import asyncio
import os
from dataclasses import dataclass, field
from datetime import date
from pathlib import Path
from typing import AsyncGenerator, Iterable, Literal

import yaml

from app.config import settings
from app.models.schemas import ChatMessage
from app.services.knowledge_loader import extract_relevant_snippets, load_knowledge_sources

try:
    from claude_agent_sdk import ClaudeAgentOptions, ClaudeSDKClient
except Exception:  # pragma: no cover - handled by sdk availability checks
    ClaudeAgentOptions = None
    ClaudeSDKClient = None

AGENT_NAME = "isaac-resume"
SDK_SESSION_IDS: dict[str, str] = {}

MODEL_IDS: dict[str, str] = {
    "haiku": "claude-haiku-4-5",
    "sonnet": "claude-sonnet-4-5",
    "opus": "claude-opus-4-5",
}


@dataclass
class ProviderConfig:
    provider: Literal["anthropic", "zai"]
    base_url: str | None
    auth_token: str | None
    timeout_ms: int
    model_mappings: dict[str, str] = field(default_factory=dict)

    @classmethod
    def for_anthropic(cls) -> "ProviderConfig":
        return cls(
            provider="anthropic",
            base_url=None,
            auth_token=os.getenv("ANTHROPIC_API_KEY"),
            timeout_ms=120000,
            model_mappings=MODEL_IDS,
        )

    @classmethod
    def for_zai(cls) -> "ProviderConfig":
        return cls(
            provider="zai",
            base_url="https://api.z.ai/api/anthropic",
            auth_token=os.getenv("ZAI_API_KEY") or settings.zai_api_key,
            timeout_ms=3000000,
            model_mappings={
                "haiku": "GLM-4.5-Air",
                "sonnet": "GLM-4.7",
                "opus": "GLM-4.7",
                "glm-4.7": "GLM-4.7",
                "glm-4.5-air": "GLM-4.5-Air",
            },
        )


@dataclass
class AgentConfig:
    prompt: str
    tools: list[str]
    skills: list[str]
    model: str | None


def _repo_root() -> Path:
    return Path(__file__).resolve().parents[3]


def _agent_path(agent_name: str) -> Path:
    return _repo_root() / ".claude" / "agents" / f"{agent_name}.md"


def _parse_frontmatter(raw: str) -> tuple[dict[str, object], str]:
    if not raw.lstrip().startswith("---"):
        return {}, raw

    parts = raw.split("---", 2)
    if len(parts) < 3:
        return {}, raw

    _, frontmatter, body = parts
    data = yaml.safe_load(frontmatter) or {}
    return data, body.strip()


def _build_system_prompt(prompt: str, skills: Iterable[str]) -> str:
    current_date = date.today().isoformat()
    system_prompt = f"Current Date: {current_date}\n\n{prompt}".strip()
    skills_list = ", ".join(skills)
    if skills_list:
        system_prompt = (
            system_prompt
            + f"\n\n# Available Skills\nYou have access to the following skills: {skills_list}."
            " Use the Skill tool to invoke them when appropriate."
        )
    return system_prompt


def load_agent_config(agent_name: str) -> AgentConfig:
    path = _agent_path(agent_name)
    raw = path.read_text(encoding="utf-8")
    frontmatter, body = _parse_frontmatter(raw)

    tools = frontmatter.get("tools") or []
    skills = frontmatter.get("skills") or []
    if isinstance(tools, str):
        tools = [item.strip() for item in tools.split(",") if item.strip()]
    if isinstance(skills, str):
        skills = [item.strip() for item in skills.split(",") if item.strip()]

    model = frontmatter.get("model") if frontmatter else None
    model_value = None if model in (None, "inherit") else str(model)

    return AgentConfig(
        prompt=body,
        tools=[str(item) for item in tools],
        skills=[str(item) for item in skills],
        model=model_value,
    )


def _resolve_model(frontmatter_model: str | None) -> str:
    env_override = os.environ.get("NAZMI_CLAUDE_MODEL") or os.environ.get("MODEL_ID")
    if env_override:
        return env_override
    if frontmatter_model:
        return frontmatter_model
    return settings.model_id


def parse_provider_model(model_string: str | None) -> tuple[str, str]:
    if not model_string:
        provider = os.getenv("NAZMI_CLAUDE_PROVIDER", "anthropic").lower()
        return (provider, "sonnet")

    model_string = model_string.strip().lower()
    if "/" not in model_string:
        provider = os.getenv("NAZMI_CLAUDE_PROVIDER", "anthropic").lower()
        return (provider, model_string)

    provider, model = model_string.split("/", 1)
    if provider not in ("anthropic", "zai"):
        provider = "anthropic"
    return (provider, model)


def get_provider_config(provider: str) -> ProviderConfig:
    if provider == "zai":
        return ProviderConfig.for_zai()
    return ProviderConfig.for_anthropic()


def _build_provider_env(provider_config: ProviderConfig) -> dict[str, str]:
    env_vars: dict[str, str] = {}
    if provider_config.provider == "zai":
        env_vars["ANTHROPIC_BASE_URL"] = provider_config.base_url or ""
        env_vars["ANTHROPIC_AUTH_TOKEN"] = provider_config.auth_token or ""
        env_vars["API_TIMEOUT_MS"] = str(provider_config.timeout_ms)
        env_vars["ANTHROPIC_DEFAULT_HAIKU_MODEL"] = provider_config.model_mappings.get(
            "haiku", "GLM-4.5-Air"
        )
        env_vars["ANTHROPIC_DEFAULT_SONNET_MODEL"] = provider_config.model_mappings.get(
            "sonnet", "GLM-4.7"
        )
        env_vars["ANTHROPIC_DEFAULT_OPUS_MODEL"] = provider_config.model_mappings.get(
            "opus", "GLM-4.7"
        )
    else:
        if provider_config.auth_token:
            env_vars["ANTHROPIC_API_KEY"] = provider_config.auth_token
    return env_vars


def _resolve_provider_model(provider: str, model_name: str, provider_config: ProviderConfig) -> str:
    mapped = provider_config.model_mappings.get(model_name)
    if mapped:
        return mapped

    if provider == "zai":
        if model_name == "glm-4.7":
            return "GLM-4.7"
        if model_name == "glm-4.5-air":
            return "GLM-4.5-Air"
        return model_name.upper()

    return MODEL_IDS.get(model_name, model_name)


class ClaudeAgent:
    def __init__(self) -> None:
        self.sources = load_knowledge_sources()
        self.agent_config = load_agent_config(AGENT_NAME)
        self.system_prompt = _build_system_prompt(
            self.agent_config.prompt, self.agent_config.skills
        )
        self.model_raw = _resolve_model(self.agent_config.model)
        self.sdk_available = ClaudeSDKClient is not None

    def refresh_sources(self) -> None:
        self.sources = load_knowledge_sources()

    def source_titles(self) -> list[str]:
        return [source.title for source in self.sources]

    async def stream_response(
        self,
        message: str,
        history: list[ChatMessage],
        reveal_detail: bool,
        session_id: str | None = None,
    ) -> AsyncGenerator[str, None]:
        self.refresh_sources()
        if not self.sdk_available:
            response = self._fallback_response(message, reveal_detail)
            async for chunk in self._stream_text(response):
                yield chunk
            return

        provider, model_name = parse_provider_model(self.model_raw)
        provider_config = get_provider_config(provider)
        if provider == "zai" and not provider_config.auth_token:
            raise RuntimeError("Z.AI Error: ZAI_API_KEY not configured")

        provider_env = _build_provider_env(provider_config)
        effective_model = _resolve_provider_model(provider, model_name, provider_config)

        user_text = message
        if reveal_detail:
            user_text = f"{message}\n\nPlease include deeper technical detail."

        client = await self._create_client(session_id, effective_model, provider_env)
        await client.query(user_text)

        try:
            async for msg in client.receive_response():
                if getattr(msg, "subtype", None) == "init":
                    data = getattr(msg, "data", None) or {}
                    sdk_session_id = data.get("session_id")
                    if sdk_session_id and session_id:
                        SDK_SESSION_IDS[session_id] = sdk_session_id

                blocks = getattr(msg, "content", []) or []
                for block in blocks:
                    text = getattr(block, "text", None) or getattr(block, "value", None)
                    if text:
                        yield text

                status = getattr(msg, "subtype", None) or getattr(msg, "status", None)
                if status in ("success", "error") or getattr(msg, "stop_reason", None):
                    if status == "error":
                        raise RuntimeError("Claude Agent SDK reported an error")
                    break
        finally:
            if hasattr(client, "disconnect"):
                await client.disconnect()

    def _fallback_response(self, message: str, reveal_detail: bool) -> str:
        snippets = extract_relevant_snippets(message, self.sources)
        if not snippets:
            return (
                "I don't see that explicitly in the provided materials. "
                "If you'd like, ask about Isaac's platform engineering work, cost optimization, "
                "or multi-agent systems and I'll share what's documented."
            )

        response_lines = [
            "Here's what the provided materials say:",
            *[f"- {snippet}" for snippet in snippets],
        ]

        if reveal_detail:
            response_lines.extend(
                [
                    "\nDeeper Technical Detail:",
                    "- The notes emphasize infrastructure automation, cost optimization, and AI tooling work.",
                ]
            )

        response_lines.append("\nWant me to expand on any of these points?")
        return "\n".join(response_lines)

    async def _create_client(
        self,
        session_id: str | None,
        model: str,
        provider_env: dict[str, str],
    ) -> ClaudeSDKClient:
        options_dict: dict[str, object] = {
            "cwd": str(_repo_root()),
            "system_prompt": self.system_prompt,
            "permission_mode": "bypassPermissions",
            "setting_sources": ["project"],
            "model": model,
        }

        if provider_env:
            options_dict["env"] = provider_env

        if self.agent_config.tools:
            tools = self.agent_config.tools
            if self.agent_config.skills and "Skill" not in tools:
                tools = tools + ["Skill"]
            options_dict["allowed_tools"] = tools

        if session_id and session_id in SDK_SESSION_IDS:
            options_dict["resume"] = SDK_SESSION_IDS[session_id]

        options = ClaudeAgentOptions(**options_dict)  # type: ignore[arg-type]
        client = ClaudeSDKClient(options=options)
        if hasattr(client, "connect"):
            await client.connect()
        return client

    async def _stream_text(self, text: str) -> AsyncGenerator[str, None]:
        for chunk in self._chunk_text(text, size=18):
            yield chunk
            await asyncio.sleep(0.02)

    @staticmethod
    def _chunk_text(text: str, size: int = 18) -> list[str]:
        return [text[i : i + size] for i in range(0, len(text), size)]
