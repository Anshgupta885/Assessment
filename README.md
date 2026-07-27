# Authflow — MERN Authentication Assessment

A MERN authentication application using a short-lived JWT access token and a long-lived refresh token.

## Architecture

- **Frontend:** React + Vite + Motion + custom CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB Atlas
- **Deployment target:** Vercel for both frontend and backend
- **Access token:** short-lived, kept in frontend memory
- **Refresh token:** long-lived, stored in an HttpOnly cookie
- **Refresh flow:** Axios interceptor requests a fresh access token after a 401 and retries the original request.

## Local setup

### Backend
```bash
cd server
npm install
```
Copy `.env.example` to `.env`, fill the values, then:
```bash
npm run dev
```

### Frontend
```bash
cd client
npm install
```
Copy `.env.example` to `.env`, then:
```bash
npm run dev
```

Frontend: `http://localhost:5173`
Backend health check: `http://localhost:5000/api/health`

## API routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`
- `GET /api/user/me`
- `GET /api/health`

> Never commit real `.env` secrets.
