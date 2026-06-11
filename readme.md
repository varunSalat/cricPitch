# Cricket Pitch Booking System

A real-time cricket pitch booking platform. Users browse pitches, pick a date, and reserve
hourly slots. Availability updates live across everyone viewing the same pitch, and a slot
is held for 2 minutes while the user confirms so two people can't grab it at once.

This is a monorepo with two parts:

```
root/
  client/    React + Vite frontend
  server/    Express + Prisma + Socket.IO API
```

## Where to go next

Each folder is its own project with setup instructions, environment variables, and
architecture notes in its own README:

- [`client/`](./client/README.md) — frontend: pages, real-time slot UI, build/run steps
- [`server/`](./server/ReadMe.md) — backend: REST API, sockets, database schema, concurrency handling

## Quick start

Run the backend and frontend in separate terminals. Full details are in each README.

```bash
# 1. API
cd server
npm install
npm run dev        # http://localhost:3000

# 2. Web client
cd client
npm install
npm run dev        # http://localhost:5173
```

The client expects the API URL and socket origin in its `.env` (see `client/.env.example`),
and the server needs a `DATABASE_URL` and `JWT_SECRET` in `server/.env`.

## Tech stack

- **Frontend:** React 19, Vite, TypeScript, Tailwind CSS, TanStack Query, Socket.IO client
- **Backend:** Express 5, TypeScript, Prisma (MySQL), Socket.IO, JWT auth
