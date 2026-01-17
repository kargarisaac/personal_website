# Decision Records: AI Resume Chat Website

**Feature Branch**: `001-ai-resume-chat`
**Created**: 2026-01-17
**Last Updated**: 2026-01-17

## Purpose

This document captures the "why" behind architectural and implementation decisions for this feature. Each decision is recorded as an Architectural Decision Record (ADR) to provide context for future sessions and contributors.

---

## ADR-001: Next.js App Router for frontend

**Status**: Accepted  
**Date**: 2026-01-17  
**Deciders**: Isaac, Codex

### Context

The current site is static HTML/CSS. The new UI needs richer interactivity, chat, and modular sections, while remaining performant and easy to iterate on.

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| 1. Static HTML/JS | Fast to start, minimal tooling | Harder to scale, messy interactivity |
| 2. React SPA | Componentized UI | Larger client bundle, less SSR control |
| 3. Next.js App Router | SSR/streaming, server components, good DX | More setup |

### Decision

Adopt Next.js App Router for the frontend to balance speed, interactivity, and performance.

### Consequences

**Positive:**
- Fast first paint with server rendering
- Clean component structure for complex UI

**Negative:**
- Requires Node tooling and build pipeline

**Neutral:**
- Enables server-side content loading from markdown

---

## ADR-002: FastAPI backend with SSE streaming

**Status**: Accepted  
**Date**: 2026-01-17

### Context

The chat interface must stream responses in real time and use the Claude Agent SDK for tool-based file grounding.

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| 1. FastAPI + SSE | Simple async streaming, Python ecosystem | Requires separate service |
| 2. WebSockets | Bi-directional, flexible | More infra complexity |
| 3. Next.js API routes | Co-located | Ties model runtime to frontend deploy |

### Decision

Use a separate Python FastAPI backend with SSE endpoints for streaming.

### Consequences

**Positive:**
- Clean separation of UI and AI runtime
- Easy to host on Railway

**Negative:**
- Requires CORS and two deploys

**Neutral:**
- Allows future swap to WebSockets if needed

---

## ADR-003: Claude Agent SDK with Z.AI GLM-4.7 default

**Status**: Accepted  
**Date**: 2026-01-17

### Context

The runtime must use Claude Agent SDK with tool access, defaulting to GLM-4.7 via Z.AI.

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| 1. Claude Agent SDK + Z.AI (GLM-4.7) | Tool access, proven in Nazmito | Requires provider env config |
| 2. Direct HTTP calls | Simple | No tool runtime |
| 3. Anthropic-only default | Standard | Not requested |

### Decision

Implement Claude Agent SDK with Z.AI provider, defaulting to GLM-4.7, and allow overrides via env or API.

### Consequences

**Positive:**
- Tool-aware agent can read markdown files for grounding
- Aligns with prior working implementation

**Negative:**
- Requires API key management for Z.AI

**Neutral:**
- Leaves option to add Anthropic models later

---

## ADR-004: Markdown knowledge base (no RAG)

**Status**: Accepted  
**Date**: 2026-01-17

### Context

The user prefers editable markdown files instead of embeddings or vector databases.

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| 1. Markdown files + tool read | Transparent, low ops | Must curate manually |
| 2. RAG + embeddings | Scales to large corpora | Infra overhead |
| 3. External CMS | Easy updates | Extra dependency |

### Decision

Use a markdown knowledge base under `content/` and instruct the agent to read from it.

### Consequences

**Positive:**
- Easy to update with simple edits
- No extra services required

**Negative:**
- Requires periodic curation for consistency

**Neutral:**
- Can add RAG later without breaking UI

---

## ADR-005: Chat logging to object storage with local fallback

**Status**: Accepted  
**Date**: 2026-01-17

### Context

Chat transcripts should be stored for analytics and iteration, but local dev should remain simple.

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| 1. Object storage + local fallback | Durable logs, simple dev | Requires storage config |
| 2. No logging | Privacy | No analytics |
| 3. Database logging | Queryable | Extra infra |

### Decision

Persist chat logs to S3-compatible storage in production and to local files in development.

### Consequences

**Positive:**
- Durable transcripts for review
- Local dev stays lightweight

**Negative:**
- Requires log rotation or retention policy

**Neutral:**
- Storage backend can be swapped later

---

## Pending Decisions

- [ ] **PD-001**: Hosting for frontend (Vercel vs other) - decide during deployment.

---

## Decision Log (Quick Reference)

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| ADR-001 | Next.js App Router for frontend | Accepted | 2026-01-17 |
| ADR-002 | FastAPI backend with SSE streaming | Accepted | 2026-01-17 |
| ADR-003 | Claude Agent SDK with Z.AI GLM-4.7 default | Accepted | 2026-01-17 |
| ADR-004 | Markdown knowledge base (no RAG) | Accepted | 2026-01-17 |
| ADR-005 | Chat logging to object storage with local fallback | Accepted | 2026-01-17 |

---

## Notes

- Decisions should be recorded BEFORE implementation, not after.
- When revisiting a decision, create a new ADR that supersedes the old one.
