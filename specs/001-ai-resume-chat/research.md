# Research: AI Resume Chat Website

**Feature Branch**: `001-ai-resume-chat`  
**Date**: 2026-01-17  

## Technical Decisions (Decision -> Rationale -> Alternatives)

1) **Next.js (App Router) + React + TypeScript for frontend**
- **Rationale**: Componentized UI, server rendering for fast first paint, and strong ecosystem for polished interactions.
- **Alternatives**: Static HTML/CSS/JS (faster to start but less scalable), React without Next.js (more client bundle, less SSR control).

2) **FastAPI backend with Server-Sent Events (SSE) for streaming**
- **Rationale**: Simple async streaming to the UI, clean request/response typing, minimal overhead for hosting.
- **Alternatives**: WebSockets (more complex stateful infra), long-polling (slower UX).

3) **Claude Agent SDK runtime with Z.AI provider defaulting to GLM-4.7**
- **Rationale**: Matches prior proven usage in the Nazmito project and supports tool access for file-based grounding.
- **Alternatives**: Direct HTTP API calls (less tooling), Anthropic-only defaults (not requested).

4) **Markdown knowledge base (no vector database)**
- **Rationale**: Editable, transparent, low-ops; Claude Agent SDK can read markdown via tools for grounding.
- **Alternatives**: RAG + embeddings (more infra), full CMS (overkill for a personal site).

5) **Chat logging to object storage with local fallback**
- **Rationale**: Persistent transcripts for analytics and iteration; local file logs for dev.
- **Alternatives**: No logging (lower insight), full database (extra setup).

6) **Executive-briefing response style with "Go deeper" toggle**
- **Rationale**: Hiring managers prefer concise summaries but can dive into technical detail on demand.
- **Alternatives**: Always technical (overwhelming) or always brief (insufficient depth).

## Integration Notes

- Adopt the Claude Agent SDK pattern from `nazmito/src/nazmi/api/claude_agent_runtime.py`:
  - Configure provider model with `zai/glm-4.7`.
  - Pass provider env vars to SDK (ZAI_API_KEY, ANTHROPIC_BASE_URL).
  - Use a system prompt that instructs the agent to read local markdown files.
- Use file allowlist enforcement so the agent only reads from `content/`.
- Backend should expose:
  - `POST /api/chat/stream` (SSE)
  - `POST /api/job-fit` (JSON response)
  - `GET /api/health`

## React/Next.js Performance Guidelines (Vercel Best Practices)

- Prefer Server Components for static content; keep interactive widgets as Client Components.
- Avoid barrel imports for large component trees.
- Dynamically import non-critical UI (e.g., animated hero background).
- Keep data fetching in server components to avoid client waterfalls.
- Keep JSON payloads minimal; stream chat responses instead of waiting for full completion.

