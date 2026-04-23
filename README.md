## TaskFlow (MERN) – API + Frontend

TaskFlow is a simple task manager with:
- **Backend**: Node.js + Express + MongoDB (JWT auth)
- **Frontend**: React (Vite) + Axios

## Features
- **Auth**: Register / Login (JWT token)
- **Tasks**: Create, list, delete tasks (per-user)

## Project structure
- `backend/` – Express API + MongoDB models/routes
- `backend/frontend/` – React (Vite) UI

## Prerequisites
- Node.js (recommended: latest LTS)
- MongoDB (local or Atlas)

## Environment variables
Create a file: `backend/.env`

Example:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskflow
JWT_SECRET=change_this_to_a_long_random_secret
```

## Install & Run (Backend)
From the repo root:

```powershell
Set-Location backend
npm install
npm run dev
```

Backend will run on `http://localhost:5000` (based on `PORT`).

## Install & Run (Frontend)
Open a new terminal, from the repo root:

```powershell
Set-Location backend/frontend
npm install
npm run dev
```

Frontend will run on the Vite dev URL (usually `http://localhost:5173`).

## API Endpoints
Base URL: `http://localhost:5000/api/v1`

### Auth
- **POST** `/auth/register`  
  Body: `{ "name": "...", "email": "...", "password": "..." }`
- **POST** `/auth/login`  
  Body: `{ "email": "...", "password": "..." }`  
  Response: `{ "token": "..." }`

### Tasks (Protected)
Add header:
- `Authorization: Bearer <token>`

Endpoints:
- **GET** `/tasks` – list tasks for current user
- **POST** `/tasks` – create task  
  Body: `{ "title": "...", "description": "...", "status": "pending|completed" }`
- **PUT** `/tasks/:id` – update task
- **DELETE** `/tasks/:id` – delete task

## Notes
- Frontend API base URL is configured in `backend/frontend/src/api.js` as `http://localhost:5000/api/v1`.
- If you change backend port, update `baseURL` accordingly.

