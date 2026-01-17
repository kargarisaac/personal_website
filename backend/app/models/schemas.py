from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field


class HealthResponse(BaseModel):
    status: str = "ok"


class KnowledgeSource(BaseModel):
    title: str
    filepath: str
    updated_at: datetime
    content: str


class ChatMessage(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=6000)
    session_id: str | None = None
    history: list[ChatMessage] = Field(default_factory=list)
    reveal_detail: bool = False
    logging_enabled: bool | None = None


class ChatStreamEvent(BaseModel):
    type: Literal["meta", "token", "done", "error"]
    content: str | None = None
    session_id: str | None = None


class ChatLogRecord(BaseModel):
    session_id: str
    created_at: datetime
    user_message: str
    assistant_message: str
    reveal_detail: bool
    sources: list[str]


class JobFitRequest(BaseModel):
    description: str = Field(..., min_length=1, max_length=12000)


class JobFitResponse(BaseModel):
    rating: Literal["Strong", "Moderate", "Weak"]
    summary: str
    evidence: list[str]
    gaps: list[str]
