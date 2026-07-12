# AssetFlow - Enterprise Asset & Resource Management System

AssetFlow is a robust, full-stack application built for the Odoo Hackathon. This repository contains the foundational architecture.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, TypeScript
- **Backend:** FastAPI, Python, SQLAlchemy
- **Database:** PostgreSQL
- **Auth:** JWT, Role-Based Access Control (RBAC)

## Project Structure
- `/backend`: FastAPI Python backend architecture.
- `/frontend`: React frontend architecture.

## Getting Started

### Docker (Recommended)
You can start the entire stack with a single command using Docker:
```bash
docker compose up --build
```
After startup, the services will be available at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8000
- **Swagger API Docs**: http://localhost:8000/docs
- **PostgreSQL**: localhost:5432

### Local Setup (Without Docker)

#### Backend Setup
1. `cd backend`
2. Create virtual environment: `python -m venv venv`
3. Activate virtual environment (Windows): `.\venv\Scripts\activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Copy `.env.example` to `.env` and fill in DB credentials.
6. Run server: `uvicorn app.main:app --reload`
   - API Docs: http://localhost:8000/api/v1/docs

### Frontend Setup
1. `cd frontend`
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
   - App URL: http://localhost:5173

## Core Features Implemented in Foundation
- Professional FastAPI folder structure (API, Core, CRUD, DB, Models, Schemas).
- Professional React folder structure (Components, Context, Pages, Routes, Services, Types).
- Custom Tailwind CSS theming matching dark mode aesthetic.
- Global Layouts, Sidebar, Navbar.
- Protected Routes with Role Based Access Control (`admin`, `asset_manager`, `department_head`, `employee`).
- Axios interceptors for global JWT injection and error handling.
- Reusable UI Components (Button, Input, Card).
- Auth system ready to connect to FastAPI JWT.
