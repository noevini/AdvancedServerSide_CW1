# Alumni Influencers API

RESTful API built with Node.js and Express for the Phantasmagoria Ltd alumni engagement platform.

## Tech Stack

- Node.js + Express
- SQLite 3
- JWT + bcrypt
- Helmet, CORS, CSRF, cookie-parser
- Swagger/OpenAPI 3.0

## Setup

1. Install dependencies:

```bash
   npm install
```

2. Configure environment:

```bash
   cp .env.example .env
```

Edit `.env` and set `JWT_SECRET` to a long random string.

3. Run:

```bash
   npm run dev
   npm start
```

4. API docs: http://localhost:3000/api-docs

## Project Structure

```
src/
├── app.js
├── server.js
├── config/
│   ├── database.js
│   ├── initDb.js
│   └── csrf.js
├── controllers/
├── services/
├── dao/
├── routes/
├── middleware/
└── swagger/
```

## Database Tables

- users
- profiles (belongs to user)
- degrees (belongs to profile)
- certifications (belongs to profile)
- licences (belongs to profile)
- short_courses (belongs to profile)
- employment_history (belongs to profile)
- bids (belongs to user)
- email_verification_tokens (belongs to user)
- password_reset_tokens (belongs to user)
- api_tokens
- api_usage_logs (belongs to api_token)
