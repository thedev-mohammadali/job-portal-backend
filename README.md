# 🚀 Job Portal Backend API

A production-oriented backend API for a Job Portal platform built with **Node.js, Express, TypeScript, PostgreSQL, and Prisma ORM**.

The project focuses on clean architecture, security, scalability, and production backend practices rather than simply implementing CRUD APIs.

---

# 📌 Project Overview

This project powers a Job Portal platform where:

- Job seekers can search and apply for jobs.
- Employers can manage job postings and applications.
- Administrators can manage users and platform activities.

The backend is designed using production-inspired architecture with clear separation of concerns, session-based authentication, and role-based authorization.

---

# 🧱 Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT (Access + Refresh Tokens)
- bcrypt
- cookie-parser
- http-status
- ms

---

# 🏛️ Architecture

The project follows a layered architecture:

```text
Client
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Services
   │
   ▼
Prisma ORM
   │
   ▼
PostgreSQL
```

### Design Principles

- Thin Controllers / Fat Services
- Feature-based module organization
- Shared utilities
- Strict TypeScript
- Production-oriented architecture
- Small atomic Git commits
- Separation of authentication and session management
- Favor readability over clever abstractions

---

# 🔐 Authentication

Implemented features:

- ✅ User Registration
- ✅ User Login
- ✅ JWT Access Tokens
- ✅ JWT Refresh Tokens
- ✅ HttpOnly Refresh Cookies
- ✅ Session-based Refresh Authentication
- ✅ Multiple Device Login Support
- ✅ Refresh Token Rotation
- ✅ Logout
- ✅ Authentication Middleware
- ✅ Role-based Authorization Middleware
- ✅ Refresh Token Hashing (SHA-256)
- ✅ Session Revocation
- ✅ Active User Validation

### Authentication Flow

```text
Login

Credentials
      │
      ▼
Verify User
      │
Generate Session
      │
Generate Refresh Token
      │
Hash Refresh Token
      │
Store Session
      │
Generate Access Token
      │
Return
```

### Refresh Flow

```text
Refresh Token
      │
Verify JWT
      │
Validate Session
      │
Validate User
      │
Rotate Refresh Token
      │
Revoke Old Session
      │
Create New Session
      │
Generate New Access Token
      │
Return Tokens
```

### Logout Flow

```text
Refresh Token
      │
Verify JWT
      │
Validate Session
      │
Revoke Session
      │
Clear Cookie
```

---

# 🔒 Session Management

Sessions are persisted in PostgreSQL.

Each login creates a separate session.

Features:

- Multiple concurrent device logins
- Session revocation
- Refresh token rotation
- Hashed refresh tokens
- Expiration tracking
- Soft revocation using `revokedAt`

Refresh tokens are **never stored in plaintext**.

```text
SHA-256(refreshToken)
```

---

# 👥 User Roles

- JOB_SEEKER
- EMPLOYER
- ADMIN
- SUPER_ADMIN

Role-based authorization is enforced through middleware.

---

# 💼 Job System (Planned)

Job lifecycle:

```text
DRAFT
    ↓
PUBLISHED
    ↓
CLOSED
    ↓
ARCHIVED
```

Features:

- Employers create jobs
- Publish jobs
- Update jobs
- Archive jobs
- Republish archived jobs
- No hard deletes

---

# 📄 Application System (Planned)

Application lifecycle:

```text
SUBMITTED
        ↓
UNDER_REVIEW
        ↓
SHORTLISTED
        ↓
INTERVIEW_SCHEDULED
        ↓
SELECTED
REJECTED
WITHDRAWN
```

Applications will preserve complete history.

---

# 🏢 Profile System (Planned)

## Employer Profile

- Company information
- Logo
- Description
- Website

## Job Seeker Profile

- Resume
- Skills
- Education
- Experience
- Personal information

Each profile has a one-to-one relationship with its User.

---

# 🚨 Reporting System (Planned)

Users will be able to report:

- Jobs
- Companies
- Other users

Reports are visible only to administrators.

---

# 📁 File Uploads (Planned)

Initial implementation:

- Local storage (`/uploads`)
- Database stores file path only

Future:

- AWS S3
- Cloudflare R2
- Azure Blob Storage

---

# 📂 Project Structure

```text
src/
│
├── config/
├── generated/
│
├── modules/
│   ├── auth/
│   ├── session/
│   ├── user/
│   ├── job/
│   ├── company/
│   ├── application/
│   ├── skill/
│   └── savedJob/
│
├── middlewares/
│
├── routes/
│
├── types/
│
├── utils/
│
├── app.ts
└── server.ts
```

---

# 🚧 Current Status

## ✅ Completed

- Backend project setup
- Prisma integration
- User model
- Authentication system
- Session management
- Login
- Logout
- Refresh token rotation
- Authentication middleware
- Authorization middleware
- Error handling
- Shared response utilities

## 🚀 Next

- Logout from all devices
- Password change with session invalidation
- Job management
- Employer profile
- Job seeker profile
- Applications
- Saved jobs
- Reporting system
- File uploads

---

# ⚙️ Getting Started

```bash
pnpm install
```

Configure your environment variables:

```env
DATABASE_URL=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
JWT_ACCESS_EXPIRES_IN=
JWT_REFRESH_EXPIRES_IN=
```

Run database migrations:

```bash
pnpm prisma migrate dev
```

Start the development server:

```bash
pnpm dev
```

---

# 📜 Commit Convention

- `feat:` New features
- `fix:` Bug fixes
- `refactor:` Code improvements
- `chore:` Tooling and configuration
- `prisma:` Database schema changes

---

# 🧭 Design Philosophy

This project emphasizes production backend engineering practices.

Core principles include:

- Preserve historical data whenever possible
- Avoid premature abstractions
- Keep controllers thin and services expressive
- Prefer explicit code over clever code
- Build features through small, reviewable commits
- Design for scalability from the beginning
- Use sessions for refresh-token management instead of purely stateless authentication

---

# 📄 License

This project is developed for learning, portfolio, and backend engineering practice.
