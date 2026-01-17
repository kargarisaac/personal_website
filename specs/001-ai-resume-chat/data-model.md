# Data Model: AI Resume Chat Website

**Feature Branch**: `001-ai-resume-chat`  
**Date**: 2026-01-17  

## Core Entities

### Profile
- name
- title
- location
- summary
- links (email, LinkedIn, GitHub, etc)

### ExperienceEntry
- company
- role
- location
- start_date
- end_date
- highlights (bullet list)
- deep_context (situation/action/outcome)

### Project
- name
- summary
- links
- technologies

### Publication
- title
- venue
- year
- authors
- summary

### SkillCategory
- label (Strengths, Moderate, Gaps)
- items

### KnowledgeSource
- id
- title
- path
- last_updated
- tags

### ChatSession
- session_id
- created_at
- metadata (ip, user_agent, referrer)

### ChatMessage
- session_id
- role (user|assistant|system)
- content
- created_at
- detail_level (brief|deep)

### JobFitAnalysis
- job_description
- rating (strong|moderate|weak)
- evidence (list of mapped experience)
- gaps (list)
- created_at

### ChatLogRecord
- session_id
- storage_path
- created_at
- model_id
- prompt_summary

## TypeScript Interfaces (frontend)

```ts
export type DetailLevel = "brief" | "deep";
export type FitRating = "strong" | "moderate" | "weak";

export interface Profile {
  name: string;
  title: string;
  location: string;
  summary: string;
  links: Record<string, string>;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
  deepContext: {
    situation: string;
    action: string;
    outcome: string;
  };
}

export interface SkillCategory {
  label: "Strengths" | "Moderate" | "Gaps";
  items: string[];
}

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: string;
  detailLevel?: DetailLevel;
}

export interface JobFitAnalysis {
  rating: FitRating;
  evidence: string[];
  gaps: string[];
}
```

## Python Models (backend)

```py
from pydantic import BaseModel, Field
from typing import List, Literal, Optional


DetailLevel = Literal["brief", "deep"]
FitRating = Literal["strong", "moderate", "weak"]


class ChatMessage(BaseModel):
    role: Literal["user", "assistant", "system"]
    content: str
    created_at: str
    detail_level: Optional[DetailLevel] = None


class ChatRequest(BaseModel):
    session_id: Optional[str] = None
    prompt: str
    detail_level: DetailLevel = "brief"


class JobFitRequest(BaseModel):
    job_description: str = Field(min_length=20)


class JobFitResponse(BaseModel):
    rating: FitRating
    evidence: List[str]
    gaps: List[str]
```

