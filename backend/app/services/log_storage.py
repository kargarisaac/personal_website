from __future__ import annotations

import json
from datetime import datetime
from pathlib import Path

from app.config import settings
from app.models.schemas import ChatLogRecord


class LogStorage:
    def __init__(self) -> None:
        self.enabled = settings.logging_enabled

    def save_chat_log(self, record: ChatLogRecord) -> str | None:
        if not self.enabled:
            return None

        if settings.log_bucket:
            try:
                return self._save_s3(record)
            except Exception:
                # Fall back to local storage if object storage fails.
                return self._save_local(record)

        return self._save_local(record)

    def _save_local(self, record: ChatLogRecord) -> str:
        logs_dir = Path(settings.logs_dir)
        logs_dir.mkdir(parents=True, exist_ok=True)
        filename = f"{record.session_id}-{int(datetime.utcnow().timestamp())}.json"
        path = logs_dir / filename
        path.write_text(record.model_dump_json(indent=2), encoding="utf-8")
        return str(path)

    def _save_s3(self, record: ChatLogRecord) -> str:
        import boto3

        session = boto3.session.Session(
            aws_access_key_id=settings.log_access_key,
            aws_secret_access_key=settings.log_secret_key,
            region_name=settings.log_region,
        )
        client = session.client("s3", endpoint_url=settings.log_endpoint)
        key = f"{settings.log_prefix}/{record.session_id}-{int(datetime.utcnow().timestamp())}.json"
        payload = json.dumps(record.model_dump(), indent=2)
        client.put_object(Bucket=settings.log_bucket, Key=key, Body=payload)
        return f"s3://{settings.log_bucket}/{key}"
