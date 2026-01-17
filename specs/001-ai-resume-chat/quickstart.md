# Quickstart: AI Resume Chat Website

**Feature Branch**: `001-ai-resume-chat`  
**Date**: 2026-01-17  

## Prerequisites

- Node 20+
- Python 3.11+
- ZAI_API_KEY set in your environment for model access

## Backend (FastAPI)

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export ZAI_API_KEY="your_key_here"
export MODEL_ID="zai/glm-4.7"
uvicorn app.main:app --reload --port 8000
```

Expected output:

- `GET http://localhost:8000/api/health` returns `{"status":"ok"}`
- `POST /api/job-fit` returns a JSON payload with `rating`, `evidence`, `gaps`

## Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
```

Expected output:

- App loads at `http://localhost:3000`
- Chat UI streams responses from the backend

## Smoke Tests

1) Load the homepage and verify hero + sections render.
2) Ask a question in the chat: "What projects show your multi-agent experience?"
3) Paste a job description into the fit tool and confirm a "Strong/Moderate/Weak" rating is returned.

## Troubleshooting

- If the chat does not respond, confirm `ZAI_API_KEY` is set and backend is running.
- If streaming fails, ensure the frontend `API_BASE_URL` points to `http://localhost:8000`.
- If markdown content is missing, verify files exist under `backend/content/`.

