from __future__ import annotations

import json
import uuid
from datetime import datetime
from typing import AsyncGenerator

from fastapi import APIRouter
from fastapi.responses import StreamingResponse

from app.config import settings
from app.models.schemas import ChatLogRecord, ChatRequest, ChatStreamEvent
from app.services.claude_agent import ClaudeAgent
from app.services.log_storage import LogStorage

router = APIRouter(tags=["chat"])


def _format_sse(event: ChatStreamEvent) -> str:
    payload = event.model_dump(exclude_none=True)
    return f"data: {json.dumps(payload)}\n\n"


@router.post("/chat")
async def chat_endpoint(request: ChatRequest) -> StreamingResponse:
    session_id = request.session_id or str(uuid.uuid4())
    agent = ClaudeAgent()
    storage = LogStorage()
    collected: list[str] = []

    async def event_stream() -> AsyncGenerator[str, None]:
        yield _format_sse(ChatStreamEvent(type="meta", session_id=session_id))
        try:
            async for token in agent.stream_response(
                request.message,
                request.history,
                request.reveal_detail,
                session_id=session_id,
            ):
                collected.append(token)
                yield _format_sse(ChatStreamEvent(type="token", content=token))
            assistant_message = "".join(collected).strip()

            logging_enabled = (
                request.logging_enabled
                if request.logging_enabled is not None
                else settings.logging_enabled
            )
            if logging_enabled:
                record = ChatLogRecord(
                    session_id=session_id,
                    created_at=datetime.utcnow(),
                    user_message=request.message,
                    assistant_message=assistant_message,
                    reveal_detail=request.reveal_detail,
                    sources=agent.source_titles(),
                )
                storage.save_chat_log(record)

            yield _format_sse(ChatStreamEvent(type="done"))
        except Exception as exc:  # pragma: no cover - defensive fallback
            yield _format_sse(
                ChatStreamEvent(
                    type="error",
                    content=(
                        "Chat service unavailable. "
                        "Please try again soon."
                    ),
                )
            )

    return StreamingResponse(event_stream(), media_type="text/event-stream")
