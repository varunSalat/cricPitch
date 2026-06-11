# Cricket Pitch Booking — Web Client

React frontend for the pitch booking app. Users browse pitches, pick a date, see slot
availability update live as other people reserve or book, hold a slot for 2 minutes while
they confirm, and manage their bookings.

Built with React 19, Vite, TypeScript and Tailwind v4.

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4 with shadcn-style components (Radix primitives)
- TanStack Query for server data (pitches, bookings)
- Socket.IO client for live slot availability
- React Router v7
- React Hook Form + Zod for forms
- sonner for toasts

## Setup

Needs Node 18+ and the API running (see the `server` README).

1. Install

```bash
npm install
```

2. Create a `.env` file in `client/` (there's a `.env.example` to copy)

```env
VITE_API_URL="http://localhost:3000/api/v1"
VITE_SOCKET_URL="http://localhost:3000"
```

`VITE_API_URL` points at the REST API (with the `/api/v1` prefix). `VITE_SOCKET_URL` is the
backend origin only — no path — because Socket.IO connects to the server root. If
`VITE_SOCKET_URL` is missing, the client falls back to the page origin and the socket won't
connect.

3. Run

```bash
npm run dev
```

Vite serves on `http://localhost:5173`. Note that env changes only take effect after a
restart.

## Scripts

- `npm run dev` — dev server
- `npm run build` — type-check and build for production
- `npm run preview` — preview the production build
- `npm run lint` — eslint

## Routes

| Path             | Access    | What it is                          |
| ---------------- | --------- | ----------------------------------- |
| `/`              | public    | Landing page                        |
| `/pitches`       | public    | Pitch listing with search + paging  |
| `/pitches/:id`   | public    | Pitch details, date picker, slots   |
| `/bookings`      | protected | The signed-in user's bookings       |
| `/login`, `/register` | public | Auth screens                     |

## Folder layout

```
src/
  components/
    pitchDetailsPage/   slot grid, booking summary, confirm modal
    pitchesPage/        listing, filters, skeletons
    myBookingPage/      booking cards + cancel modal
    ui/                 shared shadcn components
    general/            header, footer, error, pagination
  context/              AuthContext, SocketContext
  hooks/                useSlots (socket slot logic), useDebounce
  lib/                  fetchAPI, bookings API, socket event names
  pages/                route components
  layout/               root / auth / protected layouts
  data/                 static pitch data used for some views
```

## How the real-time part works

The socket connection is set up once in `context/SocketContext.tsx`. It connects with the
user's JWT (read from cookies) and exposes the socket through a hook.

All slot logic lives in `hooks/useSlots.ts`:

- On mount (and when pitch or date changes) it emits `slot:get` and renders the returned slots.
- It listens for `slot:updated` and `slot:expired`, so when another user reserves, books, or
  lets a hold expire, the grid updates without a refetch.
- `reserveSlot` / `unreserveSlot` send the reserve/unreserve events and optimistically update
  the UI, with the server broadcast confirming it for everyone else.

Bookings (the `/bookings` page) use TanStack Query rather than sockets. After a booking is
confirmed or cancelled, the `["bookings"]` query is invalidated so the list reflects the
change.

## Data fetching

`lib/fetchAPI.ts` wraps `fetch` with two helpers: `publicFetch` for open endpoints and
`privateFetch`, which attaches the bearer token from cookies. Both throw an `Error` carrying
the API's message and status, which is what TanStack Query surfaces to the UI for the
loading / error states.
```
