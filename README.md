# Alumni Influencers API

RESTful API built with Node.js and Express for the Phantasmagoria Ltd alumni engagement platform.

## Tech Stack

- Node.js + Express 5
- SQLite 3 (tables created automatically on startup)
- JWT + bcrypt for authentication
- Helmet, CORS, express-rate-limit, express-validator for security
- node-cron for automated winner selection
- Swagger/OpenAPI 3.0 for documentation

## Setup

1. Install dependencies:

```bash
   npm install
```

2. Configure environment:

```bash
   cp .env.example .env
```

Edit `.env` — at minimum set `JWT_SECRET` to a long random string.
For emails, use [Mailtrap](https://mailtrap.io) in development.

3. Run:

```bash
   npm run dev   # development
   npm start     # production
```

The `database.sqlite` file is created automatically — no migrations needed.

4. API docs: http://localhost:3000/api-docs

## Project Structure

```
src/
├── app.js
├── server.js
├── config/
│   ├── database.js     # SQLite connection
│   └── initDb.js       # Creates all tables on startup
├── controllers/
├── services/
├── repositories/
├── routes/
├── middleware/
├── jobs/
│   └── winnerSelectionJob.js
└── swagger/
```

## Database Schema

```
users ──< profiles ──< degrees
                  ──< certifications
                  ──< licences
                  ──< short_courses
                  ──< employment_history
users ──< bids
users ──< email_verification_tokens
users ──< password_reset_tokens
api_tokens ──< api_usage_logs
```
