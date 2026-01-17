# AGENTS.md — AI Resume Chat Website

**Feature Branch**: `001-ai-resume-chat`
**Created**: 2026-01-17

## Project Context

Build a premium, dark-themed portfolio site with an AI chat and job-fit tool. The frontend is Next.js and the backend is FastAPI using Claude Agent SDK with GLM-4.7 default, grounded in editable markdown files.

## Before Starting Work

1. Read `specs/001-ai-resume-chat/spec.md` for requirements
2. Check `specs/001-ai-resume-chat/tasks.md` for current progress (see Progress section)
3. Review `specs/001-ai-resume-chat/decisions.md` for architectural decisions made
4. Look at existing similar implementations for patterns

## Related Files

### Files to Modify
- `index.html` - legacy static page, replace or archive once Next.js is live
- `styles.css` - legacy styles, replace or archive once Next.js is live

### Files to Create
- `frontend/app/layout.tsx` - global shell, fonts, metadata
- `frontend/app/page.tsx` - main page layout and sections
- `frontend/app/globals.css` - base reset and global styles
- `frontend/components/` - hero, sections, chat UI, job-fit UI
- `frontend/lib/api.ts` - backend API helpers (chat + job fit)
- `frontend/lib/content.ts` - load local markdown content
- `frontend/styles/theme.css` - design tokens and dark theme variables
- `backend/app/main.py` - FastAPI entrypoint
- `backend/app/api/chat.py` - SSE chat endpoint
- `backend/app/api/job_fit.py` - job-fit endpoint
- `backend/app/services/claude_agent.py` - Claude Agent SDK client
- `backend/app/services/knowledge_loader.py` - markdown loader + allowlist
- `backend/app/services/log_storage.py` - log persistence (local + S3)
- `backend/app/prompts/system_prompt.md` - agent system prompt
- `backend/content/*.md` - resume, LinkedIn, proposal content

### Reference Implementations
- `/Users/isaackargar/codes/personal/nazmito/src/nazmi/api/claude_agent_runtime.py` - Claude Agent SDK + provider config

## Code Patterns

- Use Server Components for static content; isolate chat and fit tools as Client Components.
- Stream chat responses via SSE; parse incrementally on the client.
- Restrict file reads to `backend/content/` with explicit allowlist.
- Log chat transcripts with session IDs; support local file fallback.

## Don't

- Don't introduce a vector database or RAG pipeline.
- Don't use default system fonts (avoid Inter/Roboto).
- Don't invent resume facts not present in the markdown sources.
- Don't block the UI on full chat completion (stream).

## Session Continuity

When resuming work on this feature:
1. Check `tasks.md` Progress section for what's done/in-progress
2. Check `decisions.md` for any pending decisions
3. Run tests to verify current state: `pytest` and `npm run test`

## Quick Commands

```bash
# Run tests for this feature
pytest
npm run test

# Start implementation (sequential in Codex)
/build specs/001-ai-resume-chat/

# Or phase-by-phase implementation
/speckit.implement phase:1
/speckit.implement continue
```
