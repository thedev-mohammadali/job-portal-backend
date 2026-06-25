# 🚀 Job Portal Backend API

A production-leaning backend system for a Job Portal platform built with **Node.js, Express, TypeScript, PostgreSQL, and Prisma ORM**.

---

## 📌 Project Overview

This project is a backend API for a Job Portal system where job seekers can apply for jobs and employers can manage job postings and applications.

The system is designed with **real-world backend architecture principles**, including role-based access control, job lifecycle management, and strict data integrity rules.

---

## 🧱 Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication (Access + Refresh Tokens)

---

## 👥 User Roles

- JOB_SEEKER
- EMPLOYER
- ADMIN
- SUPER_ADMIN

---

## 🧠 Core Features (Planned / In Progress)

### 🔐 Authentication

- JWT-based authentication
- Refresh token session system
- Multiple device login support
- Password change invalidates all sessions

---

### 💼 Job System

- Job lifecycle:

```text
DRAFT → PUBLISHED → CLOSED → ARCHIVED
```

- Employers can create, update, archive, and republish jobs
- Jobs are never hard deleted

---

### 📄 Application System

- Job seekers can apply to jobs
- Application status flow:

```text
SUBMITTED
→ UNDER_REVIEW
→ SHORTLISTED
→ INTERVIEW_SCHEDULED
→ SELECTED / REJECTED / WITHDRAWN
```

- Applications are never deleted (full history preserved)

---

### 🏢 Profile System

- Employer Profile (company-based identity)
- Job Seeker Profile (resume, skills, experience)
- One-to-one relationship with User

---

### 🚨 Reporting System

- Users can report jobs or other users
- Reports are visible to admins
- Reporter identity is stored (not anonymous)

---

### 📁 File Uploads

- Resume uploads stored locally (`/uploads`)
- Database stores file path only
- Cloud storage integration planned for future

---

## 🏗️ Architecture Principles

- No hard deletes (data is preserved using ARCHIVE system)
- Role-based access control (RBAC)
- Clean separation of concerns (Controller → Service → DB layer)
- Relational data integrity enforced via PostgreSQL + Prisma
- Scalable backend structure for future growth

---

## 📂 Project Structure (Planned)

```text
src/
│
├── config/
│   ├── env.ts
│   └── prisma.ts
│
├── generated/
│
├── modules/
│   │
│   ├── auth/
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── auth.route.ts
│   │   ├── auth.validation.ts
│   │   ├── auth.interface.ts
│   │   └── auth.constant.ts
│   │
│   ├── user/
│   │   ├── user.controller.ts
│   │   ├── user.service.ts
│   │   ├── user.route.ts
│   │   ├── user.validation.ts
│   │   ├── user.interface.ts
│   │   └── user.constant.ts
│   │
│   ├── job/
│   ├── company/
│   ├── application/
│   ├── skill/
│   └── savedJob/
│
├── middlewares/
│   ├── auth.ts
│   ├── validateRequest.ts
│   ├── notFound.ts
│   └── globalErrorHandler.ts
│
├── utils/
│   ├── ApiError.ts
│   ├── catchAsync.ts
│   ├── sendResponse.ts
│   ├── jwt.ts
│   ├── password.ts
│   └── pagination.ts
│
├── types/
│   ├── express.d.ts
│   └── common.ts
│
├── routes/
│   └── index.ts
│
├── app.ts
└── server.ts
```

---

## 🚧 Current Status

> Project is in early development stage.

- Backend setup not started yet
- Prisma schema design coming next
- Core architecture being finalized

---

## ⚙️ Setup Instructions

Will be added after initial backend setup is complete.

---

## 📜 Commit Convention

- `chore:` project setup and config changes
- `feat:` new features
- `fix:` bug fixes
- `refactor:` code restructuring
- `prisma:` database schema changes

---

## 🧭 Design Philosophy

- Preserve data history (no hard deletes)
- Keep system scalable and modular
- Favor clarity over premature optimization
- Real-world backend patterns over toy examples

---

## 📄 License

This project is for learning and development purposes.
