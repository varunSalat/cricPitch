# Cricket Pitch Booking — API

Backend for the cricket pitch booking app. It exposes a REST API for auth, pitches and
bookings, and a Socket.IO layer that keeps slot availability in sync across everyone
looking at the same pitch in real time.

Built with Express 5, TypeScript, Prisma (MySQL) and Socket.IO.

## Stack

- Express 5 + TypeScript
- Prisma ORM on MySQL
- Socket.IO for real-time slot updates
- JWT auth (bcrypt for password hashing)
- Zod for request validation
- Redis for the Socket.IO adapter when running more than one instance
- Swagger UI for API docs

## Folder layout

```
src/
  config/         prisma client, cors, redis, swagger, env parsing
  controllers/    request handlers (auth, pitch, booking, user)
  middlewares/    auth, validation, error + 404 handling, socket auth
  repositories/   all Prisma queries live here
  services/       business logic (booking, reservation, slots, ...)
  routes/         public (auth) and protected route groups
  socket/         socket bootstrap, slot/booking handlers, event names
  jobs/           background reservation-expiry sweeper
  prisma/         multi-file schema (models/) + seed script
  utils/          ApiResponse, AppError, jwt, logger, asyncHandler
```

## Getting started

You'll need Node 18+ and a MySQL database you can connect to.

1. Install dependencies

```bash
npm install
```

2. Create a `.env` file in the `server/` root

```env
PORT=3000
DATABASE_URL="mysql://user:password@host:3306/booking_app"
JWT_SECRET="change-me"
# Optional. Only needed if you run multiple server instances behind a load balancer.
# REDIS_URL="redis://localhost:6379"
```

3. Push the schema to your database and generate the client

```bash
npx prisma db push
npx prisma generate
```

4. Seed pitches and time slots

```bash
npx prisma db seed
```

The seed inserts the pitches and pre-generates hourly slots (06:00–23:00) for every
pitch from today through 18 Jun 2026.

5. Run it

```bash
npm run dev      # ts-node-dev with auto-restart
```

API docs are served at `http://localhost:3000/api-docs` once it's up.

For production: `npm run build` then `npm start`.

## Environment variables

| Variable       | Required | Notes                                                        |
| -------------- | -------- | ------------------------------------------------------------ |
| `PORT`         | no       | Defaults to 3000                                             |
| `DATABASE_URL` | yes      | MySQL connection string                                      |
| `JWT_SECRET`   | yes      | Used to sign and verify access tokens                        |
| `REDIS_URL`    | no       | When set, Socket.IO uses the Redis adapter; otherwise in-memory |

## Database schema

All models live under `src/prisma/models`. The relevant ones:

- **User** — id, name, email (unique), phoneNumber (unique, optional), password, timestamps
- **Pitch** — id, name, type, location, pricePerHour, hours, tags, image, description
- **TimeSlot** — id, pitchId, date, startTime, endTime, `isBooked`. One row per pitch per hour per day.
- **Reservation** — id, userId, slotId, `status` (ACTIVE / EXPIRED / COMPLETED / CANCELLED), `expiresAt`. This is the temporary 2-minute hold.
- **Booking** — id, userId, timeSlotId, timestamps. Created only after a confirmed booking.

A slot's availability is derived, not stored on a single column: `isBooked` on the
TimeSlot plus any ACTIVE Reservation determines whether it shows as BOOKED, RESERVED or
AVAILABLE.

## API

Everything is mounted under `/api/v1`.

| Method | Endpoint        | Auth | Description                          |
| ------ | --------------- | ---- | ------------------------------------ |
| POST   | `/auth/register`| no   | Register a user                      |
| POST   | `/auth/login`   | no   | Login, returns an access token       |
| GET    | `/users/me`     | yes  | Current user profile                 |
| GET    | `/pitches`      | no   | Paginated pitch list (`page`, `limit`, `name`) |
| GET    | `/pitches/:id`  | no   | Single pitch                         |
| POST   | `/bookings`     | yes  | Confirm a booking for a reserved slot|
| GET    | `/bookings`     | yes  | Current user's bookings              |
| DELETE | `/bookings/:id` | yes  | Cancel a booking and free the slot   |

Protected routes expect `Authorization: Bearer <token>`.

## Real-time (Socket.IO)

The socket connection is authenticated with the same JWT (sent in the handshake `auth`
field). Event names live in `src/socket/events.ts`.

Client → server:

- `slot:get` `{ pitchId, date }` — ask for slots
- `slot:reserve` `{ slotId }` — place a 2-minute hold
- `slot:unreserve` `{ slotId }` — drop your hold

Server → client:

- `slot:list` — the slots for the requested pitch/date
- `slot:updated` `{ slotId, status }` — broadcast when a slot changes (reserved, booked, freed)
- `slot:error`, `slot:expired`

When someone reserves or books a slot, the server broadcasts `slot:updated` so everyone
else watching that pitch sees it change without refreshing.

## How concurrency is handled

This is the part that matters, so it's worth being explicit.

**Two users can't book the same slot.** Reserving and booking both run inside a Prisma
`$transaction`. When a user reserves, the transaction first checks for an existing ACTIVE
reservation that hasn't expired; if one exists it throws and the second user gets
"Slot already reserved". Confirming a booking re-checks `isBooked` inside the transaction
before flipping it to `true`, so a duplicate confirm fails instead of double-booking.

**Temporary 2-minute hold.** A reservation row is created with `status = ACTIVE` and
`expiresAt = now + 2 minutes`. While that's active, the slot shows as RESERVED to everyone
else. If the user confirms, the reservation is marked COMPLETED and a Booking is created.
If they don't, it just expires.

**Releasing expired holds.** A background job (`src/jobs/reservation-expiry.job.ts`) runs
every 30 seconds, flips any ACTIVE reservation past its `expiresAt` to EXPIRED, and emits
`slot:updated` so the slot becomes available again on every connected client. Even if that
job hasn't run yet, the availability query ignores reservations whose `expiresAt` is in the
past, so an expired hold never blocks anyone.

## Notes on scaling

- **10k users just checking availability:** reads dominate, so add read replicas and cache
  the slot list per pitch/date (Redis) with a short TTL. The `GET /pitches` list is already
  paginated.
- **Scaling Socket.IO across servers:** sockets are stateful, so a single Node process
  becomes the bottleneck. Run multiple instances behind a load balancer with sticky
  sessions, and wire them together with the Redis adapter (set `REDIS_URL`). The code falls
  back to the in-memory adapter when Redis isn't configured, so local dev needs nothing.
- **Reservation expiry at scale:** the polling job is fine for now but doesn't scale to many
  instances. A Redis key with a TTL (and keyspace expiry events) or a single dedicated
  worker would be the next step.
```
