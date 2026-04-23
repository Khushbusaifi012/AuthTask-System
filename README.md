## TaskFlow

TaskFlow is a simple **task manager**.

- **Backend**: Node.js + Express + MongoDB
- **Frontend**: React (Vite)

## How to run (local)

### 1) Setup backend env
Create `backend/.env` (you can copy `backend/.env.example`).

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/taskflow
JWT_SECRET=change_this_to_a_long_random_secret
```

### 2) Start backend
From the project root:

```powershell
Set-Location backend
npm install
npm run dev
```

Backend runs on `http://localhost:5000`.

### 3) Start frontend
Open a new terminal, from the project root:

```powershell
Set-Location backend/frontend
npm install
npm run dev
```

Frontend runs on the Vite URL (usually `http://localhost:5173`).

## API (quick)
Base: `http://localhost:5000/api/v1`

- **POST** `/auth/register`
- **POST** `/auth/login` → returns `{ token }`
- **Tasks** (need header `Authorization: Bearer <token>`)
  - **GET** `/tasks`
  - **POST** `/tasks`
  - **PUT** `/tasks/:id`
  - **DELETE** `/tasks/:id`

## Note
Frontend API base URL is in `backend/frontend/src/api.js`.

