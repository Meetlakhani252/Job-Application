# Rooklet — Internship & Job Listing Portal

A full-stack web application built for students and early-career talent to discover vetted internships and entry-level jobs, search and filter listings, apply with resumes, and track their application status in real-time. Includes an administrative portal for managing opportunities and reviewing submissions.

---

## 🌟 Key Features

### 👤 Candidate & Public Portal
- **Browse Opportunities:** View all active job and internship postings, sorted chronologically with newest first.
- **Search & Filter:** Instant title search and dropdown domain filtering (*Web Development, Data & AI, UI/UX Design, Marketing, Other*).
- **Opportunity Details:** Comprehensive job descriptions, experience requirements, compensation/stipend tags, and direct employer application links.
- **Application Submission:** In-app application form with auto-filled profile info, customizable cover notes, and PDF resume upload.
- **Application Code Tracking:** Each application generates a unique reference code (e.g. `APP-54RLS6`). Candidates can view and track their application progress anytime via the public tracking page or dashboard without needing a login.
- **Candidate Account & Profile:** Optional candidate authentication (Supabase Auth) with profile management (skills, education, contact information) and a personalized **Applicant Dashboard** tracking submission milestones.

### 🛡️ Admin Portal
- **Secure Authentication:** Session-based admin login with bcrypt password hashing and route guards.
- **Opportunity Management (CRUD):**
  - Create new job or internship listings with rich fields (domain, type, location, experience, description, external application link).
  - Edit active listings with pre-populated form values.
  - Delete listings with interactive confirmation dialogs.
- **Review Applications:** Centralized administrative table displaying candidate contact details, submitted resume links, linked opportunity names, and submission timestamps.

---

## 🛠️ Tech Stack & Architecture

### **Frontend**
- **Library/Framework:** React 18, Vite
- **Routing:** React Router v6
- **UI Components & Icons:** Material-UI (MUI), Lucide React
- **Styling:** CSS Modules (`.module.css` scoped styling)
- **Forms & HTTP:** React Hook Form, Axios instance with JWT interceptors

### **Backend**
- **Runtime & Framework:** Node.js, Express.js (RESTful APIs)
- **Session Management:** `express-session` with secure cookie options
- **File Handling:** Multer (in-memory buffer processing for PDF resumes)
- **Architecture Flow:** `Route` ➔ `Middleware` ➔ `Validator` ➔ `Controller` ➔ `Service` ➔ `Database Layer`

### **Database & Cloud Services**
- **Database:** PostgreSQL (hosted on Supabase)
  > *Design Note:* PostgreSQL was selected for relational integrity (foreign keys between applications and opportunities, unique constraints preventing duplicate submissions), indexing (`pg_trgm` for title search), and Row Level Security (RLS) data isolation.
- **Authentication:** Supabase Auth for candidates; Express session-based auth for portal administrators.
- **Storage:** Supabase Storage bucket for candidate PDF resumes.

---

## 📂 Project Structure

```text
├── Backend/
│   ├── src/
│   │   ├── config/          # Database (Supabase), session, environment setup
│   │   ├── controllers/     # HTTP request/response handlers
│   │   ├── middleware/      # Auth (requireAdmin, requireUser), error handling, 404
│   │   ├── routes/          # Express route definitions (opportunities, applications, admin, auth)
│   │   ├── services/        # Business logic & database operations
│   │   ├── utils/           # ID generators, response formatters, AppError class
│   │   ├── validators/      # Input payload validators
│   │   ├── app.js           # Express app instance & middleware stack
│   │   └── server.js        # Server entry point
│   └── supabase/            # Database schemas & SQL migration scripts
│
├── Frontend/
│   ├── src/
│   │   ├── api/             # API caller functions (axios wrapper)
│   │   ├── components/      # Common UI components, Navbar, Footer, AdminLayout, UserLayout
│   │   ├── context/         # AuthContext (admin and candidate state)
│   │   ├── pages/           # Application views (Home, Opportunities, Dashboard, Admin, Auth)
│   │   ├── routes/          # AppRoutes with role-based ProtectedRoute
│   │   └── styles/          # Global theme and styling utilities
│
└── docs/
    ├── database/            # Database schema documentation and ER diagram
    ├── screenshots/         # Application visual captures
    └── PRD.html             # Product Requirements Document
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.x or higher)
- [npm](https://www.npmjs.com/) (v9.x or higher)
- A [Supabase](https://supabase.com/) project (with PostgreSQL database & a public `resumes` storage bucket)

---

### 1. Database Setup
1. In your Supabase project dashboard, open the **SQL Editor**.
2. Run the migration scripts in the following order:
   - `Backend/supabase/schema.sql` (Creates `opportunities`, `applications`, `admins` tables and search indexes)
   - `Backend/supabase/auth_migration.sql` (Adds `profiles` table, `user_id` relation, and RLS policies)
   - `Backend/supabase/profile_expansion.sql` (Adds education, skills, and portfolio attributes)
3. Under **Storage**, create a new public bucket named **`resumes`** with PDF file type restrictions.

---

### 2. Backend Setup
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` configuration file:
   ```bash
   cp .env.example .env
   ```
4. Update `.env` with your project credentials:
   ```env
   PORT=5000
   CLIENT_ORIGIN=http://localhost:5173
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   SESSION_SECRET=your-random-session-secret-key
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=your_secure_password
   ```
5. Seed the initial admin account (if needed):
   ```bash
   npm run seed:admin
   ```
6. Start the backend development server:
   ```bash
   npm run dev
   ```
   *The backend will be live at `http://localhost:5000`.*

---

### 3. Frontend Setup
1. Open a new terminal and navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env` configuration file:
   ```bash
   cp .env.example .env
   ```
4. Update `.env` with your API and Supabase keys:
   ```env
   VITE_API_URL=http://localhost:5000/api
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```
5. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The client will be running at `http://localhost:5173`.*

---

## 📡 REST API Reference

### Public & Candidate Endpoints
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/opportunities` | List all opportunities (with optional `?title=` and `?domain=`) | No |
| `GET` | `/api/opportunities/:id` | Get details for an individual opportunity | No |
| `POST` | `/api/applications` | Submit application for an opportunity | User (Bearer Token) |
| `GET` | `/api/applications/public/:applicationId` | Lookup application by tracking code (e.g. `APP-54RLS6`) | No |
| `GET` | `/api/applications/my` | List all applications submitted by logged-in candidate | User (Bearer Token) |
| `POST` | `/api/applications/upload-resume` | Upload candidate PDF resume to secure storage | User (Bearer Token) |
| `POST` | `/api/auth/signup` | Register new candidate account with pre-confirmed email | No |

### Admin Endpoints
| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/admin/login` | Authenticate admin & start session | No |
| `POST` | `/api/admin/logout` | Destroy admin session | Admin (Session) |
| `GET` | `/api/admin/me` | Check active admin session status | Admin (Session) |
| `POST` | `/api/admin/opportunities` | Create a new opportunity posting | Admin (Session) |
| `PUT` | `/api/admin/opportunities/:id` | Update an existing opportunity posting | Admin (Session) |
| `DELETE` | `/api/admin/opportunities/:id` | Delete an opportunity | Admin (Session) |
| `GET` | `/api/admin/applications` | View all candidate submissions across all listings | Admin (Session) |

---

## 📋 Evaluation Checklist & Deliverables

- [x] **Source Code:** Complete frontend and backend codebase following clean architecture and separation of concerns.
- [x] **Database Structure:** Detailed schema design and ERD available at [`docs/database/schema.md`](docs/database/schema.md).
- [x] **Setup & Instructions:** Fully documented in `README.md` with environment templates.
- [x] **Responsive UI & Accessibility:** Designed with CSS Modules and clean layout hierarchy across desktop and mobile.
- [x] **Security:** Protected routes, parameterized database queries, hashed credentials, and storage RLS protection.

---

## 📄 License
This project was developed as an Internship Mini Project assignment. All rights reserved.
