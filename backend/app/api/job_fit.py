from __future__ import annotations

from fastapi import APIRouter

from app.models.schemas import JobFitRequest, JobFitResponse
from app.services.knowledge_loader import (
    combined_content,
    extract_relevant_snippets,
    load_knowledge_sources,
)

router = APIRouter(tags=["job-fit"])


def _extract_section(content: str, header: str) -> list[str]:
    items: list[str] = []
    capture = False
    header_key = header.strip().lower()
    for line in content.splitlines():
        if line.strip().startswith("## "):
            capture = line.strip().lower() == f"## {header_key}"
            if not capture and items:
                break
            continue
        if capture and line.strip().startswith("-"):
            items.append(line.strip().lstrip("-").strip())
    return items


def _rating_from_evidence(evidence: list[str]) -> str:
    if len(evidence) >= 4:
        return "Strong"
    if len(evidence) >= 2:
        return "Moderate"
    return "Weak"


@router.post("/job-fit", response_model=JobFitResponse)
async def job_fit(request: JobFitRequest) -> JobFitResponse:
    sources = load_knowledge_sources()
    combined = combined_content(sources)
    evidence = extract_relevant_snippets(request.description, sources, limit=5)

    gaps = _extract_section(combined, "Gaps")
    if not gaps:
        gaps = [
            "Consumer mobile growth loops",
            "High-scale ML model training",
            "Game or real-time media pipelines",
        ]

    rating = _rating_from_evidence(evidence)
    summary = (
        f"Based on the provided materials, this looks like a {rating} fit. "
        "Evidence below maps to the most prominent requirements, with gaps called out explicitly."
    )

    if not evidence:
        summary = (
            "The provided materials do not strongly map to this description yet. "
            "Consider this a Weak fit until more overlap is confirmed."
        )
        evidence = [
            "General platform engineering, automation, and cost optimization experience is documented.",
        ]

    return JobFitResponse(
        rating=rating,
        summary=summary,
        evidence=evidence,
        gaps=gaps,
    )
