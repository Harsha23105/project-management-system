# ProjectFlow — Project Management System

A production-grade, full-stack Project Management System built for technical assessments and senior engineering review. Manage projects, tasks, and team progress with enterprise-level security, architecture, and UX.

![Tech Stack](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-20-green)
![MySQL](https://img.shields.io/badge/MySQL-8.0-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## Project Overview

ProjectFlow is a modern SaaS-quality project management platform that enables authenticated users to create and manage projects and tasks, track progress via an interactive dashboard, and search/filter their workspace — with strict data isolation so every user only accesses their own data.

---

## Features

### Authentication
- User registration with email uniqueness validation
- Secure login with bcrypt password hashing
- JWT-based session management with token expiration
- Logout with server-side token blacklisting

### Project Management
- Create, view, edit, and delete projects
- Project fields: name, description, status, start/end dates
- Status tracking: Not Started, In Progress, Completed
- Progress indicators based on task completion

### Task Management
- Full CRUD operations on tasks
- Task fields: name, description, priority, status, due date
- Priority levels: Low, Medium, High
- Status tracking: Pending, In Progress, Completed
- Mark tasks as complete with one click

### Dashboard
- Real-time statistics: total projects, tasks, completed/pending counts
- Interactive charts: project status breakdown, task priority distribution
- Overall progress percentage
- Recent activity feed with audit logs

### Search & Filtering
- Search projects by name
- Filter projects by status
- Search tasks by name
- Filter tasks by status and priority
- Sorting and pagination on all list views

### Bonus Features
- Pagination on projects and tasks
- Column sorting on task table
- Audit logging for all CRUD operations
- Docker containerization
- Unit and integration tests
- CI/CD pipeline (GitHub Actions)
- Swagger/OpenAPI documentation

---

## Architecture

```
Frontend (React + Vite)  →  API Gateway (Express)  →  Service Layer  →  Repository Layer  →  MySQL
```

The backend follows **MVC + Service + Repository** pattern with centralized error handling, request validation, and structured logging.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed architecture documentation.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, React Router, Axios, Bootstrap 5, Chart.js |
| Backend | Node.js, Express.js |
| Database | MySQL 8.0 |
| Authentication | JWT, bcrypt |
| Validation | express-validator |
| Security | Helmet, CORS, Rate Limiting |
| Documentation | Swagger/OpenAPI |
| Testing | Jest, Supertest |
| DevOps | Docker, GitHub Actions |

---

## Folder Structure

```
project-management-system/
├── backend/
│   ├── config/           # Database and app configuration
│   ├── controllers/      # HTTP request handlers
│   ├── middleware/       # Auth, validation, error handling
│   ├── models/           # Entity definitions
│   ├── routes/           # API route definitions
│   ├── validators/       # express-validator schemas
│   ├── services/         # Business logic layer
│   ├── repositories/     # Database access layer
│   ├── utils/            # Helpers, JWT, logging
│   ├── docs/             # Swagger configuration
│   ├── tests/            # Unit and integration tests
│   ├── scripts/          # Migration scripts
│   └── server.js         # Application entry point
├── frontend/
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Route-level page components
│   │   ├── context/      # Auth context provider
│   │   ├── services/     # Axios API client
│   │   ├── utils/        # Frontend helpers
│   │   └── styles/       # Custom CSS
│   └── index.html
├── database/
│   ├── schema.sql        # Complete SQL schema
│   ├── migrations/       # Migration scripts
│   └── ER_DIAGRAM.md     # Entity relationship diagram
├── docker/               # Docker configuration files
├── docs/                 # Architecture documentation
├── .github/workflows/    # CI/CD pipeline
└── docker-compose.yml    # Multi-container orchestration
```

---

## Installation Guide

### Prerequisites

- Node.js 20+
- MySQL 8.0+
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd project-management-system
```

### 2. Database Setup

```bash
mysql -u root -p < database/schema.sql
```

Or use the migration script:

```bash
cd backend
cp .env.example .env
# Edit .env with your database credentials
npm run migrate
```

### 3. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` with your configuration (see Environment Variables below).

```bash
npm run dev
```

The API runs at `http://localhost:5000`.

### 4. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

---

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `5000` |
| `DB_HOST` | MySQL host | `localhost` |
| `DB_PORT` | MySQL port | `3306` |
| `DB_USER` | MySQL user | `root` |
| `DB_PASSWORD` | MySQL password | — |
| `DB_NAME` | Database name | `project_management` |
| `JWT_SECRET` | JWT signing secret | — |
| `JWT_EXPIRES_IN` | Token expiration | `24h` |
| `CORS_ORIGIN` | Allowed frontend origin | `http://localhost:5173` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window | `900000` |
| `RATE_LIMIT_MAX` | Max requests per window | `100` |

### Frontend (`frontend/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |

---

## API Documentation

Interactive Swagger documentation is available at:

```
http://localhost:5000/api/docs
```

OpenAPI JSON spec:

```
http://localhost:5000/api/docs.json
```

### API Endpoints

#### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/profile` | Get user profile |
| PUT | `/api/auth/profile` | Update user profile |

#### Projects
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List user's projects |
| GET | `/api/projects/:id` | Get project with tasks |
| POST | `/api/projects` | Create project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |

#### Tasks
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | List user's tasks |
| GET | `/api/tasks/:id` | Get task details |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

#### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard` | Get dashboard statistics |

---

## Authentication Flow

1. User submits registration/login credentials
2. Server validates input and hashes password (registration)
3. Server generates JWT with user ID, email, and expiration
4. Client stores JWT in localStorage
5. Axios interceptor attaches `Authorization: Bearer <token>` to all requests
6. Server middleware verifies JWT signature and checks token blacklist
7. Protected routes reject unauthenticated requests (401)
8. Service layer scopes all queries to authenticated user's ID
9. Unauthorized resource access returns 403 Forbidden
10. Logout adds token to server-side blacklist

---

## Security Features

- **Password Hashing**: bcrypt with 12 salt rounds
- **JWT Authentication**: Signed tokens with configurable expiration
- **Protected Routes**: All project/task/dashboard endpoints require auth
- **Authorization**: user_id scoping on every database query
- **Input Validation**: express-validator on all endpoints
- **SQL Injection Protection**: Parameterized queries via mysql2
- **Helmet**: Security HTTP headers
- **CORS**: Whitelisted origin configuration
- **Rate Limiting**: Configurable request throttling
- **Secure Error Handling**: No stack traces in production
- **Environment Variables**: Sensitive config externalized
- **Token Blacklisting**: Secure logout implementation

---

## Running Tests

```bash
cd backend

# Run all tests
npm test

# Unit tests only
npm run test:unit

# Integration tests only
npm run test:integration
```

---

## Docker Deployment

### Quick Start with Docker Compose

```bash
# Build and start all services
docker compose up --build

# Access the application
# Frontend: http://localhost
# Backend API: http://localhost:5000
# Swagger Docs: http://localhost:5000/api/docs
```

### Individual Services

```bash
# MySQL only
docker compose up mysql

# Backend only
docker compose up backend

# Frontend only
docker compose up frontend
```

---

## Deployment Instructions

### Production Checklist

1. Set strong `JWT_SECRET` and `DB_PASSWORD`
2. Set `NODE_ENV=production`
3. Configure `CORS_ORIGIN` to your production domain
4. Use HTTPS in production (reverse proxy with Nginx/Traefik)
5. Run database migrations
6. Build frontend: `cd frontend && npm run build`
7. Use Docker Compose or deploy containers individually

### Manual Deployment

```bash
# Backend
cd backend
npm ci --only=production
NODE_ENV=production node server.js

# Frontend
cd frontend
npm ci
npm run build
# Serve dist/ with Nginx or any static file server
```

---

## Database Design

See [database/ER_DIAGRAM.md](database/ER_DIAGRAM.md) for the complete entity relationship diagram.

### Tables

- **users** — User accounts with hashed passwords
- **projects** — User-owned projects with status tracking
- **tasks** — Project tasks with priority and status
- **audit_logs** — Activity tracking for all operations
- **token_blacklist** — Revoked JWT tokens for logout

### Relationships

- User → Many Projects (CASCADE DELETE)
- User → Many Tasks (CASCADE DELETE)
- Project → Many Tasks (CASCADE DELETE)

---

## Screenshots

> Add screenshots of the Dashboard, Projects, Tasks, and Login pages after running the application.

| Page | Description |
|------|-------------|
| Login | Clean authentication page with form validation |
| Dashboard | Statistics cards, progress charts, activity feed |
| Projects | Searchable project cards with progress indicators |
| Tasks | Sortable data table with filters and pagination |
| Project Details | Project info with inline task management |

---

## Future Enhancements

- Team collaboration with role-based access control
- Real-time notifications via WebSockets
- File attachments on projects and tasks
- Kanban board view for tasks
- Email notifications for due dates
- Two-factor authentication (2FA)
- API rate limiting per user
- Project templates
- Time tracking on tasks
- Export reports (PDF/CSV)
- Dark mode theme
- Mobile native app

---

## License

MIT License — see LICENSE file for details.
