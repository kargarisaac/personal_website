from __future__ import annotations

from pydantic import Field
from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    _repo_root = Path(__file__).resolve().parents[2]
    _env_candidates = [
        _repo_root / ".env",
        _repo_root / "backend" / ".env",
    ]
    model_config = SettingsConfigDict(
        env_file=[str(path) for path in _env_candidates if path.exists()],
        env_file_encoding="utf-8",
        env_parse_delimiter=",",
        case_sensitive=False,
    )

    api_title: str = "AI Resume Chat API"
    api_version: str = "0.1.0"
    api_prefix: str = "/api"

    cors_origins: list[str] = Field(
        default_factory=lambda: ["http://localhost:3000"],
        validation_alias="CORS_ORIGINS",
    )

    content_dir: str = Field(default="content", validation_alias="CONTENT_DIR")
    logs_dir: str = Field(default="logs", validation_alias="LOGS_DIR")
    logging_enabled: bool = Field(default=False, validation_alias="LOGGING_ENABLED")

    log_bucket: str | None = Field(default=None, validation_alias="LOG_BUCKET")
    log_region: str | None = Field(default=None, validation_alias="LOG_REGION")
    log_endpoint: str | None = Field(default=None, validation_alias="LOG_ENDPOINT")
    log_access_key: str | None = Field(default=None, validation_alias="LOG_ACCESS_KEY")
    log_secret_key: str | None = Field(default=None, validation_alias="LOG_SECRET_KEY")
    log_prefix: str = Field(default="chat-logs", validation_alias="LOG_PREFIX")

    model_id: str = Field(default="zai/glm-4.7", validation_alias="MODEL_ID")
    zai_api_key: str | None = Field(default=None, validation_alias="ZAI_API_KEY")

    allowed_sources: list[str] = Field(
        default_factory=lambda: [
            "resume.md",
            "linkedin.md",
            "project-proposal.md",
            "highlights.md",
        ],
        validation_alias="ALLOWED_SOURCES",
    )


settings = Settings()
