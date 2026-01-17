# Feature Specification: AI Resume Chat Website

**Feature Branch**: `001-ai-resume-chat`  
**Created**: 2026-01-17  
**Status**: Draft  
**Input**: User description: "Build an AI-powered interactive CV website with resume chat using Claude Agent SDK and GLM 4.7"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Ask AI About Isaac (Priority: P1)

As a hiring manager, I want to ask questions about Isaac's experience and get grounded, specific answers so I can evaluate fit beyond resume skimming.

**Why this priority**: This is the primary conversion action and differentiator for the site.

**Independent Test**: Can be fully tested by opening the site, asking 3-5 questions, and confirming responses are grounded in Isaac's resume/context.

**Acceptance Scenarios**:

1. **Given** the visitor is on the site, **When** they submit a question in the chat, **Then** the system returns a streamed response grounded in Isaac's resume/context and acknowledges uncertainty when appropriate.
2. **Given** the chat backend is unavailable, **When** the visitor submits a question, **Then** the UI shows a clear fallback state and guidance.

---

### User Story 2 - Explore Experience Context (Priority: P2)

As a hiring manager, I want to expand resume items to see the deeper situation-action-outcome context so I can assess depth and impact.

**Why this priority**: It increases credibility and supports the AI responses with human-readable evidence.

**Independent Test**: Can be tested by expanding experience entries and confirming each reveals richer context.

**Acceptance Scenarios**:

1. **Given** the visitor views the experience section, **When** they expand an entry, **Then** they see detailed context for the achievement.

---

### User Story 3 - Bidirectional Job Fit Check (Priority: P3)

As a hiring manager, I want to paste a job description and see a fit analysis so I can quickly determine if pursuing a conversation makes sense.

**Why this priority**: It provides honest fit assessment and saves time for both sides.

**Independent Test**: Can be tested by pasting a job description and reviewing the fit summary and evidence mapping.

**Acceptance Scenarios**:

1. **Given** a job description is submitted, **When** the analysis completes, **Then** the system provides a fit rating with evidence and gaps.

---

### Edge Cases

- What happens when the chat API returns an error or times out?
- How does the system handle empty or extremely long user prompts?
- How does the job-fit tool handle malformed or unrelated job descriptions?
- What happens if the model refuses or cannot answer a question?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST render a professional landing page with Isaac's identity, summary, and key links.
- **FR-002**: System MUST provide an AI chat interface that supports multi-turn dialogue and streamed responses.
- **FR-003**: System MUST ground answers in curated resume/context sources and acknowledge uncertainty.
- **FR-004**: System MUST provide expandable experience context for major roles and achievements.
- **FR-005**: System MUST present a skills dashboard with clear Strengths, Moderate, and Gaps categories.
- **FR-006**: System MUST provide a job-fit analysis tool that accepts a job description and returns a fit summary with evidence mapping.
- **FR-007**: System MUST be responsive and usable on mobile and desktop.
- **FR-008**: System MUST use a dark theme visual design.
- **FR-009**: System MUST provide a backend API that powers chat and job-fit analysis.
- **FR-010**: System MUST include a clear contact path (email + LinkedIn).
- **FR-011**: System MUST load AI context from editable local markdown files (resume, LinkedIn, project notes) without a vector database.
- **FR-012**: Chat runtime MUST use Claude Agent SDK tool access to read local markdown files for grounding.
- **FR-013**: System MUST provide a default concise response style with an explicit option to reveal deeper technical detail.
- **FR-014**: System MUST persist chat transcripts and metadata to object storage when logging is enabled, with a local development fallback.

### Key Entities *(include if feature involves data)*

- **Profile**: Core identity data (name, title, summary, links).
- **ExperienceEntry**: Role metadata plus impact narratives and context.
- **Project**: Projects with links and summaries.
- **Publication**: Research papers and citations.
- **SkillCategory**: Strength/Moderate/Gaps buckets with items.
- **ChatSession**: Conversation metadata and timestamps.
- **ChatMessage**: User and assistant message content.
- **JobFitAnalysis**: Job description, fit rating, evidence mapping, and gap notes.
- **KnowledgeSource**: Markdown content source with title, filepath, and update timestamp.
- **ChatLogRecord**: Stored transcript reference with session ID, timestamps, and storage location.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: First streamed token begins within 2 seconds for typical prompts in local development.
- **SC-002**: Visitors can complete at least one chat interaction on mobile without layout issues.
- **SC-003**: Job-fit analysis completes within 8 seconds for a 2-3 paragraph job description in local development.
- **SC-004**: Core sections load with no client-side errors on modern browsers.
- **SC-005**: Chat logs are persisted with a session identifier when logging is enabled.

## Assumptions & Constraints

- Frontend will be implemented in React with Next.js.
- Backend will be a separate Python service (planned for Railway hosting).
- Chat runtime will use Claude Agent SDK with default model GLM-4.7.
- Source content will be derived from editable markdown files extracted from the resume PDF, the provided project proposal, and LinkedIn profile.
- Chat logging will be enabled and stored in object storage, with a local filesystem fallback for development.
