# Implementation Plan: AI Resume Chat Website

**Branch**: `001-ai-resume-chat` | **Date**: 2026-01-17 | **Spec**: `specs/001-ai-resume-chat/spec.md`  
**Input**: Feature specification from `/specs/001-ai-resume-chat/spec.md`

## Summary

Build a dark, high-end portfolio site in Next.js with an AI chat experience and a job-fit tool powered by a separate FastAPI service using the Claude Agent SDK (default GLM-4.7). Content is grounded in editable markdown files and chat logs are persisted to object storage with a local fallback.

## Technical Context

**Language/Version**: TypeScript (Node 20 LTS), Python 3.11  
**Primary Dependencies**: Next.js (App Router), React, FastAPI, Uvicorn, claude-agent-sdk, pydantic  
**Storage**: Local markdown files + S3-compatible object storage for chat logs  
**Testing**: Vitest + React Testing Library (frontend), pytest (backend)  
**Target Platform**: Modern browsers; backend hosted on Railway  
**Project Type**: Web application (frontend + backend)  
**Performance Goals**: First streamed token <2s; job-fit response <8s; LCP <2s on desktop  
**Constraints**: No RAG; dark theme; agent file access restricted to `content/`; streamed chat required  
**Scale/Scope**: Single-user portfolio site with occasional concurrent visitors

## Project Structure

### Documentation (this feature)

```text
specs/001-ai-resume-chat/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```text
backend/
├── app/
│   ├── api/
│   │   ├── chat.py
│   │   ├── job_fit.py
│   │   └── health.py
│   ├── services/
│   │   ├── claude_agent.py
│   │   ├── knowledge_loader.py
│   │   └── log_storage.py
│   ├── models/
│   │   └── schemas.py
│   ├── prompts/
│   │   └── system_prompt.md
│   ├── config.py
│   └── main.py
├── content/
│   ├── resume.md
│   ├── linkedin.md
│   ├── project-proposal.md
│   └── highlights.md
├── logs/                # local dev log sink (gitignored)
└── requirements.txt

frontend/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── chat/
│   ├── sections/
│   └── ui/
├── lib/
│   ├── api.ts
│   ├── content.ts
│   └── types.ts
├── public/
│   └── images/
├── styles/
│   └── theme.css
└── package.json
```

**Structure Decision**: Use a frontend/ + backend/ split for a clear deployment boundary and simpler local development.

