# Tasks: AI Resume Chat Website

**Input**: Design documents from `/specs/001-ai-resume-chat/`  
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

---

## Progress (Session Continuity)

**Last Updated**: 2026-01-17 22:39

### What's Done
- T001 Initialize repository structure
- T002 Create backend virtualenv setup and requirements.txt
- T003 Initialize Next.js App Router project
- T004 Create .gitignore entries for build artifacts
- T005 Create backend config and environment loader
- T006 Define Pydantic schemas
- T007 Add markdown knowledge loader with allowlist
- T008 Add log storage service with local fallback
- T009 Setup FastAPI app scaffold
- T010 Create system prompt
- T011 Add Claude Agent SDK client wrapper
- T012 Implement SSE chat endpoint
- T013 Wire chat routes into main app
- T014 Build chat UI components
- T015 Implement chat API client
- T016 Add chat state + streaming handling
- T017 Integrate chat section into page
- T018 Curate experience markdown into resume.md
- T019 Build Experience section UI
- T020 Integrate Experience section into page
- T021 Implement job-fit endpoint
- T022 Add job-fit prompt template
- T023 Build Job Fit UI
- T024 Integrate Job Fit section into page
- T025 Create dark theme tokens
- T026 Apply global layout and typography
- T027 Add responsive layout tweaks
- T028 Add hero, skills, and publications sections
- T029 Add SEO metadata
- Switched chat runtime to Claude Agent SDK prompt in `.claude/agents/nazmi-advisor.md`

### Currently In Progress
- None yet

### Blocked / Issues
- None

### Next Session Should
1. Run quickstart smoke tests
2. Verify chat/job-fit against backend locally
3. Iterate on content copy if needed

---

## Phase 1: Setup (Shared Infrastructure)

- [x] T001 Initialize repository structure: `frontend/`, `backend/`, `backend/content/`, `backend/logs/`
- [x] T002 [P] Create backend virtualenv setup and `backend/requirements.txt`
- [x] T003 [P] Initialize Next.js App Router project in `frontend/`
- [x] T004 [P] Create `.gitignore` entries for `backend/logs/`, `backend/.venv/`, `frontend/.next/`, `frontend/node_modules/`

---

## Phase 2: Foundational (Blocking Prerequisites)

- [x] T005 Create backend config and environment loader in `backend/app/config.py`
- [x] T006 [P] Define Pydantic schemas in `backend/app/models/schemas.py`
- [x] T007 [P] Add markdown knowledge loader with allowlist in `backend/app/services/knowledge_loader.py`
- [x] T008 [P] Add log storage service with local fallback in `backend/app/services/log_storage.py`
- [x] T009 Setup FastAPI app scaffold in `backend/app/main.py`
- [x] T010 [P] Create system prompt in `backend/app/prompts/system_prompt.md`

---

## Phase 3: User Story 1 - Ask AI About Isaac (Priority: P1) 🎯 MVP

**Goal**: Streaming AI chat grounded in markdown sources.  
**Independent Test**: Ask 3–5 questions and see streamed grounded responses.

- [x] T011 [P] Add Claude Agent SDK client wrapper in `backend/app/services/claude_agent.py`
- [x] T012 Implement SSE chat endpoint in `backend/app/api/chat.py`
- [x] T013 [P] Wire chat routes into `backend/app/main.py`
- [x] T014 [P] Build chat UI components in `frontend/components/chat/`
- [x] T015 Implement chat API client in `frontend/lib/api.ts`
- [x] T016 [P] Add chat state + streaming handling in `frontend/components/chat/ChatWindow.tsx`
- [x] T017 Integrate chat section into `frontend/app/page.tsx`

---

## Phase 4: User Story 2 - Explore Experience Context (Priority: P2)

**Goal**: Expandable experience entries with deep context.  
**Independent Test**: Expand 3 entries and verify context is visible.

- [x] T018 [P] Curate experience markdown into `backend/content/resume.md`
- [x] T019 [P] Build Experience section UI in `frontend/components/sections/Experience.tsx`
- [x] T020 Integrate Experience section into `frontend/app/page.tsx`

---

## Phase 5: User Story 3 - Bidirectional Job Fit Check (Priority: P3)

**Goal**: Job description analysis with Strong/Moderate/Weak rating.  
**Independent Test**: Paste a JD and see rating + evidence + gaps.

- [x] T021 Implement job-fit endpoint in `backend/app/api/job_fit.py`
- [x] T022 [P] Add job-fit prompt template in `backend/app/prompts/system_prompt.md`
- [x] T023 [P] Build Job Fit UI in `frontend/components/sections/JobFit.tsx`
- [x] T024 Integrate Job Fit section into `frontend/app/page.tsx`

---

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T025 [P] Create dark theme tokens in `frontend/styles/theme.css`
- [x] T026 Apply global layout and typography in `frontend/app/globals.css`
- [x] T027 [P] Add responsive layout tweaks for mobile in `frontend/components/sections/`
- [x] T028 Add hero, skills, and publications sections in `frontend/components/sections/`
- [x] T029 Add SEO metadata in `frontend/app/layout.tsx`
- [ ] T030 Run quickstart.md validation (smoke tests)
