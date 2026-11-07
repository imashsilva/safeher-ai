# SafeHer AI — Backend Service

FastAPI-powered asynchronous backend and AI classification engine for SafeHer AI.

## Tech Stack
- **Framework**: FastAPI (Python 3.12 / 3.13)
- **Database**: PostgreSQL (Supabase-hosted cloud instance)
- **ORM / Driver**: SQLAlchemy with psycopg2-binary
- **Server**: Uvicorn ASGI

## Core REST Endpoints
- `GET /`: Health check probe
- `POST /api/analyze`: Ingests incident narrative and runs rule-based exploratory AI classification
- `POST /api/report/approve`: Records survivor approval and category corrections (Human-in-the-Loop)
- `GET /api/professionals`: Fetches verified psychosocial and legal support personnel
- `POST /api/consultation/request`: Dispatches secure consultation lifecycle request

## Local Setup

1. **Create and Activate Virtual Environment**:
   ```bash
   python -m venv .venv
   # Windows:
   .venv\Scripts\activate
   # Linux/macOS:
   source .venv/bin/activate