from __future__ import annotations

import re
from datetime import datetime
from pathlib import Path

from app.config import settings
from app.models.schemas import KnowledgeSource

_TITLE_RE = re.compile(r"^#\s+(.+)")


def _resolve_path(content_dir: Path, filename: str) -> Path:
    candidate = (content_dir / filename).resolve()
    if content_dir not in candidate.parents and candidate != content_dir:
        raise ValueError("Invalid content path")
    return candidate


def load_knowledge_sources(
    content_dir: str | Path | None = None,
    allowlist: list[str] | None = None,
) -> list[KnowledgeSource]:
    base_dir = Path(content_dir or settings.content_dir).resolve()
    allowlist = allowlist or settings.allowed_sources

    sources: list[KnowledgeSource] = []
    for filename in allowlist:
        path = _resolve_path(base_dir, filename)
        if not path.exists():
            continue
        raw = path.read_text(encoding="utf-8")
        title_match = _TITLE_RE.search(raw)
        title = title_match.group(1).strip() if title_match else path.stem.replace("-", " ").title()
        sources.append(
            KnowledgeSource(
                title=title,
                filepath=str(path),
                updated_at=datetime.fromtimestamp(path.stat().st_mtime),
                content=raw,
            )
        )

    return sources


def combined_content(sources: list[KnowledgeSource]) -> str:
    return "\n\n".join(source.content for source in sources)


def extract_relevant_snippets(question: str, sources: list[KnowledgeSource], limit: int = 4) -> list[str]:
    terms = [term.lower() for term in re.findall(r"[A-Za-z]{4,}", question)]
    if not terms:
        return []

    snippets: list[str] = []
    for source in sources:
        for line in source.content.splitlines():
            if not line.strip():
                continue
            lower = line.lower()
            if any(term in lower for term in terms):
                snippets.append(line.strip())
                if len(snippets) >= limit:
                    return snippets

    return snippets
