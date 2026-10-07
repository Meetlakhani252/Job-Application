# Project Structure: Internship & Job Listing Portal

**Based on:** PRD v2 and TSD v1.0 **Stack:** React (Vite), Node.js + Express, MongoDB with Mongoose **Language:** JavaScript (ES Modules)

---

## 1. About this document

This file explains how the project folders are arranged and what goes inside each one. It follows the folder layout in TSD section 3.1. I added a few extra folders (marked **\[+\]**) so the code stays tidy and each file has one clear job. If the mentor wants the exact TSD layout, those can be removed without breaking anything.

The app has three parts:

| Part | Folder | What it does |
| --- | --- | --- |
| Frontend | `client/` | What the user sees. React pages, forms, search and filter. |
| Backend | `server/` | The REST API. Validation, admin login, business rules. |
| Database | MongoDB (used through `server/`) | Stores admins, opportunities and applications. |

The browser never talks to MongoDB directly. Everything goes through the API.

---

## 2. How a request moves through the code

**Backend:** route, then middleware, then validator, then controller, then service, then model.

**Frontend:** page, then component, then hook, then api function, then axios instance.

Example: an applicant submits the apply form.

1. `ApplyForm.jsx` collects the data and calls `createApplication()` from `applicationApi.js`.
2. The request goes to `POST /api/applications`.
3. `routes/applications.js` passes it to `applicationValidator.js`.
4. The controller calls `applicationService.js`.
5. The service checks the opportunity exists, builds the application ID, and saves through `Application.js`.
6. If the same email already applied, MongoDB's unique index throws an error and the service returns a 409.
7. The page shows the new application ID.

---

## 3. Root folder

```
job-portal/
├── client/              React app
├── server/              Express API
├── docs/                PRD, TSD, report, screenshots, database diagram
├── .gitignore
├── .editorconfig        [+]
├── package.json         [+] optional, scripts to run both apps together
└── README.md
```

| Item | Purpose |
| --- | --- |
| `client/` | Complete frontend. Has its own `package.json` and `node_modules`. |
| `server/` | Complete backend. Has its own `package.json` and `node_modules`. |
| `docs/` | Everything that is not code but is part of the submission. |
| `.gitignore` | Keeps `node_modules`, `.env` and build files out of GitHub. |
| `.editorconfig` | Same indentation and line endings in every editor. |
| `README.md` | Project intro, features, tech stack, setup steps, screenshots, author. |

---

## 4. Backend: `server/`

### 4.1 Folder tree

```
server/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   ├── env.js                     [+]
│   │   └── session.js                 [+]
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Opportunity.js
│   │   └── Application.js
│   ├── routes/
│   │   ├── index.js                   [+]
│   │   ├── opportunities.js
│   │   ├── applications.js
│   │   └── admin.js
│   ├── controllers/                   [+]
│   │   ├── opportunityController.js
│   │   ├── applicationController.js
│   │   └── adminController.js
│   ├── services/                      [+]
│   │   ├── opportunityService.js
│   │   ├── applicationService.js
│   │   └── authService.js
│   ├── validators/                    [+]
│   │   ├── opportunityValidator.js
│   │   └── applicationValidator.js
│   ├── middleware/
│   │   ├── requireAdmin.js
│   │   ├── errorHandler.js
│   │   └── notFound.js                [+]
│   ├── utils/
│   │   ├── generateApplicationId.js
│   │   ├── escapeRegex.js             [+]
│   │   ├── AppError.js                [+]
│   │   └── asyncHandler.js            [+]
│   ├── constants/                     [+]
│   │   └── enums.js
│   ├── seed/
│   │   └── seedAdmin.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
└── README.md                          [+]
```

### 4.2 What each folder and file does

**`config/`: setup code that runs once at startup**

| File | What it does |
| --- | --- |
| `db.js` | Connects to MongoDB using `MONGODB_URI`. Logs success or exits on failure. |
| `env.js` | Loads `.env` with dotenv, checks that required variables exist, and exports them in one object. The rest of the code imports from here instead of using `process.env` directly. |
| `session.js` | Sets up `express-session` with `connect-mongo`. Cookie is httpOnly, sameSite `lax`, secure only in production, expires in 1 day. |

**`models/`: Mongoose schemas (details in section 6)**

| File | What it does |
| --- | --- |
| `Admin.js` | email (unique, lowercase), passwordHash. Timestamps on. |
| `Opportunity.js` | title, companyName, type, domain, location, experience, description, applicationLink. Type and domain use enums. |
| `Application.js` | applicationId, opportunity (reference), name, phone, email, resumeLink, message. Has the unique `{ opportunity, email }` index. |

**`routes/`: only URL mapping, no logic**

| File | Endpoints |
| --- | --- |
| `index.js` | Mounts the three route files under `/api`. |
| `opportunities.js` | `GET /`, `GET /:id` (public). `POST /`, `PUT /:id`, `DELETE /:id` (admin, uses `requireAdmin`). |
| `applications.js` | `POST /` and `GET /:applicationId` (public). |
| `admin.js` | `POST /login`, `POST /logout`, `GET /me`, `GET /applications`. |

**`controllers/`: read the request, call a service, send the response**

| File | Functions |
| --- | --- |
| `opportunityController.js` | `listOpportunities`, `getOpportunity`, `createOpportunity`, `updateOpportunity`, `deleteOpportunity` |
| `applicationController.js` | `submitApplication`, `getApplicationById`, `listAllApplications` |
| `adminController.js` | `login`, `logout`, `me` |

**`services/`: the actual business logic**

| File | What it handles |
| --- | --- |
| `opportunityService.js` | Builds the title search (case-insensitive, escaped regex), applies the domain filter, sorts newest first. Handles create, update, delete. |
| `applicationService.js` | Trims and lowercases email, checks the opportunity exists, generates a unique application ID (retries if it already exists), saves, and converts the duplicate-key error into a 409. Also fetches a saved application with opportunity title and company. |
| `authService.js` | Finds admin by email, runs `bcrypt.compare`. Same error message for wrong email or wrong password. |

**`validators/`: input checks before the controller runs**

| File | What it checks |
| --- | --- |
| `opportunityValidator.js` | All required fields present. Picks only known fields from `req.body`. |
| `applicationValidator.js` | `name`, `phone`, `email`, `opportunityId` are not empty. Nothing else is format-checked, as decided in the PRD. |

**`middleware/`**

| File | What it does |
| --- | --- |
| `requireAdmin.js` | Checks `req.session.adminId`. Returns 401 if missing. |
| `errorHandler.js` | Last middleware in the chain. Sends every error as `{ "message": "..." }` with the right status code. Hides internal details on 500. |
| `notFound.js` | Catches unknown routes and returns 404. |

**`utils/`: small helpers**

| File | What it does |
| --- | --- |
| `generateApplicationId.js` | Returns `APP-` plus 6 characters from a set with no look-alikes (no 0/O, 1/I), using Node's `crypto`. |
| `escapeRegex.js` | Escapes special characters in the search text so users can't break the regex. |
| `AppError.js` | Custom error class with a status code, e.g. `new AppError("Not found", 404)`. |
| `asyncHandler.js` | Wraps async controllers so errors reach `errorHandler` without try/catch in every function. |

**Other files**

| File | What it does |
| --- | --- |
| `constants/enums.js` | `DOMAINS` and `OPPORTUNITY_TYPES` arrays. Used by the model and validators so the values live in one place. |
| `seed/seedAdmin.js` | One-time script. Reads `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env`, hashes the password, creates the admin only if it does not exist. Safe to run twice. |
| `app.js` | Creates the Express app. Adds cors (with credentials), JSON parser, session, routes, `notFound`, `errorHandler`. Does not start the server. |
| `server.js` | Connects to the database, then calls `app.listen`. Keeping this separate from `app.js` makes the app easier to test later. |
| `.env.example` | Template for environment variables (see section 8). |
| `README.md` | Server setup steps and a short API list. |

### 4.3 API to file map

| Endpoint | Access | Route file | Controller function |
| --- | --- | --- | --- |
| `GET /api/opportunities` | Public | opportunities.js | listOpportunities |
| `GET /api/opportunities/:id` | Public | opportunities.js | getOpportunity |
| `POST /api/applications` | Public | applications.js | submitApplication |
| `GET /api/applications/:applicationId` | Public | applications.js | getApplicationById |
| `POST /api/admin/login` | Public | admin.js | login |
| `POST /api/admin/logout` | Admin | admin.js | logout |
| `GET /api/admin/me` | Admin | admin.js | me |
| `POST /api/opportunities` | Admin | opportunities.js | createOpportunity |
| `PUT /api/opportunities/:id` | Admin | opportunities.js | updateOpportunity |
| `DELETE /api/opportunities/:id` | Admin | opportunities.js | deleteOpportunity |
| `GET /api/admin/applications` | Admin | admin.js | listAllApplications |

### 4.4 Backend packages

| Package | Why |
| --- | --- |
| express | Web framework |
| mongoose | MongoDB models and validation |
| express-session, connect-mongo | Admin session stored in MongoDB |
| bcrypt | Password hashing |
| dotenv | Load `.env` |
| cors | Let the React app call the API with cookies |
| nodemon (dev) | Auto restart while coding |

### 4.5 Backend scripts (`package.json`)

```
"dev":  "nodemon src/server.js"
"start": "node src/server.js"
"seed": "node src/seed/seedAdmin.js"
```

---

## 5. Frontend: `client/`

### 5.1 Folder tree

```
client/
├── public/
│   └── favicon.svg
├── src/
│   ├── api/
│   │   ├── axiosInstance.js
│   │   ├── opportunityApi.js
│   │   ├── applicationApi.js
│   │   └── adminApi.js
│   ├── pages/
│   │   ├── Home/
│   │   ├── OpportunityDetails/
│   │   ├── ApplySuccess/
│   │   ├── ViewApplication/
│   │   ├── NotFound/                  [+]
│   │   └── admin/
│   │       ├── AdminLogin/
│   │       ├── AdminOpportunities/
│   │       ├── AdminOpportunityForm/
│   │       └── AdminApplications/
│   ├── components/
│   │   ├── layout/                    [+]
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── AdminLayout.jsx
│   │   ├── opportunity/
│   │   │   ├── OpportunityCard.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── DomainFilter.jsx
│   │   │   └── ApplyForm.jsx
│   │   ├── common/                    [+]
│   │   │   ├── Loader.jsx
│   │   │   ├── EmptyState.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   └── ConfirmModal.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/                       [+]
│   │   └── AuthContext.jsx
│   ├── hooks/                         [+]
│   │   ├── useDebounce.js
│   │   └── useFetch.js
│   ├── routes/                        [+]
│   │   └── AppRoutes.jsx
│   ├── constants/                     [+]
│   │   └── index.js
│   ├── utils/                         [+]
│   │   └── formatDate.js
│   ├── styles/                        [+]
│   │   ├── variables.css
│   │   └── global.css
│   ├── App.jsx
│   └── main.jsx
├── .env
├── .env.example                       [+]
├── .gitignore
├── eslint.config.js                   [+]
├── index.html
├── package.json
└── vite.config.js
```

Each page folder holds the page file and its CSS module, for example `Home/Home.jsx` and `Home/Home.module.css`.

### 5.2 Pages and routes

| Route | Page folder | Who | What it shows |
| --- | --- | --- | --- |
| `/` | Home | Everyone | Opportunity list, title search box, domain dropdown. Loading, empty ("No opportunities found") and error states. |
| `/opportunities/:id` | OpportunityDetails | Everyone | Full details, Application Link, and the in-app apply form. |
| `/application/:applicationId` | ViewApplication | Everyone | A saved application with opportunity title and company. |
| (after applying) | ApplySuccess | Everyone | Shows the new application ID with a copy button and a link to the view page. Tells the user to save it. |
| `/admin/login` | AdminLogin | Admin | Email and password form. |
| `/admin/opportunities` | AdminOpportunities | Admin | Table with Edit and Delete, plus an Add button. |
| `/admin/opportunities/new`, `/admin/opportunities/:id/edit` | AdminOpportunityForm | Admin | One shared form for adding and editing. |
| `/admin/applications` | AdminApplications | Admin | One list of all applications with the opportunity each is for. Shows "Opportunity removed" if it was deleted. |
| `*` | NotFound | Everyone | Simple 404 page. |

### 5.3 What each folder and file does

**`api/`: all network calls live here**

| File | What it does |
| --- | --- |
| `axiosInstance.js` | Axios with `baseURL` from `VITE_API_URL` and `withCredentials: true` so the session cookie is sent. |
| `opportunityApi.js` | `getOpportunities(search, domain)`, `getOpportunityById`, `createOpportunity`, `updateOpportunity`, `deleteOpportunity` |
| `applicationApi.js` | `createApplication`, `getApplicationById` |
| `adminApi.js` | `loginAdmin`, `logoutAdmin`, `getMe`, `getAllApplications` |

**`components/`: reusable pieces**

| File | What it does |
| --- | --- |
| `layout/Navbar.jsx` | Top bar with logo and links. Shows Logout when the admin is logged in. |
| `layout/Footer.jsx` | Simple footer. |
| `layout/AdminLayout.jsx` | Wrapper with admin navigation (Opportunities, Applications). |
| `opportunity/OpportunityCard.jsx` | One card in the list: title, company, type, domain, location. Links to details. |
| `opportunity/SearchBar.jsx` | Title search input. |
| `opportunity/DomainFilter.jsx` | Dropdown using the fixed domain list. |
| `opportunity/ApplyForm.jsx` | Name, phone, email (required), resume link and message (optional). Checks for empty required fields, shows server errors such as the 409 duplicate message. |
| `common/Loader.jsx` | Loading indicator. |
| `common/EmptyState.jsx` | Message when a list has no results. |
| `common/ErrorMessage.jsx` | Shows API error text. |
| `common/ConfirmModal.jsx` | "Are you sure?" popup before deleting. |
| `ProtectedRoute.jsx` | Wraps admin pages. Redirects to `/admin/login` if the user is not logged in. |

**Other folders**

| Item | What it does |
| --- | --- |
| `context/AuthContext.jsx` | Holds admin login state. Calls `/api/admin/me` on page load so a refresh does not log the admin out. |
| `hooks/useDebounce.js` | Waits a short moment after typing before the search request goes out. |
| `hooks/useFetch.js` | Handles loading, data and error state in one place so pages stay short. |
| `routes/AppRoutes.jsx` | All route definitions in one file. |
| `constants/index.js` | `DOMAINS` and `TYPES`, same values as the server. |
| `utils/formatDate.js` | Formats `createdAt` for display. |
| `styles/variables.css` | Colors, spacing, font sizes. |
| `styles/global.css` | Resets and base styles. |
| `App.jsx` | Wraps the app with `AuthContext` and `AppRoutes`. |
| `main.jsx` | Entry point. Renders `App` and `BrowserRouter`. |
| `.env` / `.env.example` | `VITE_API_URL` (the real one is not committed). |
| `vite.config.js` | Vite settings. |
| `eslint.config.js` | Lint rules to keep the code consistent. |

### 5.4 Frontend packages

| Package | Why |
| --- | --- |
| react, react-dom | UI |
| react-router-dom | Routing |
| axios | API calls |
| vite | Dev server and build |
| eslint (dev) | Code checks |

### 5.5 Frontend scripts

```
"dev":     "vite"
"build":   "vite build"
"preview": "vite preview"
"lint":    "eslint ."
```

---

## 6. Database: MongoDB

The database has no folder of its own. The connection is `server/src/config/db.js`, the schemas are in `server/src/models/`, and the first admin comes from `server/src/seed/seedAdmin.js`.

Database name: `job_portal`. It has three collections, plus a `sessions` collection that `connect-mongo` creates by itself.

### 6.1 admins (model: `Admin.js`)

| Field | Type | Rules |
| --- | --- | --- |
| \_id | ObjectId | Auto |
| email | String | Required, unique, lowercase |
| passwordHash | String | Required, bcrypt hash, never the plain password |
| createdAt | Date | Auto |

### 6.2 opportunities (model: `Opportunity.js`)

| Field | Type | Rules |
| --- | --- | --- |
| \_id | ObjectId | Auto |
| title | String | Required, used by search |
| companyName | String | Required |
| type | String | Required. `Job` or `Internship` |
| domain | String | Required. Web Development, Data & AI, UI/UX Design, Marketing, Other |
| location | String | Required |
| experience | String | Required, free text like "Fresher" or "1-2 years" |
| description | String | Required |
| applicationLink | String | Required, URL |
| createdAt, updatedAt | Date | Auto. The list is sorted by `createdAt`, newest first |

### 6.3 applications (model: `Application.js`)

| Field | Type | Rules |
| --- | --- | --- |
| \_id | ObjectId | Auto |
| applicationId | String | Required, unique. Format like `APP-7K3F9Q` |
| opportunity | ObjectId (ref) | Required, points to `opportunities._id` |
| name | String | Required |
| phone | String | Required, stored as text |
| email | String | Required, trimmed and lowercased |
| resumeLink | String | Optional, a URL |
| message | String | Optional |
| createdAt | Date | Auto |

**Unique compound index:** `{ opportunity: 1, email: 1 }`. This is what blocks a second application from the same email for the same opportunity. The database enforces it, so it still works if two requests arrive at the same moment.

### 6.4 Relationships

```
admins (standalone)

opportunities 1 ------ * applications
              (application.opportunity -> opportunity._id)
```

When an opportunity is deleted, the default plan is to keep its applications. The admin list then shows "Opportunity removed". The PRD does not say what should happen, so this needs the mentor's confirmation.

### 6.5 Database files in `docs/`

```
docs/
└── database/
    ├── schema-diagram.png        collections and relationships
    └── sample-data.json          a few sample opportunities for testing
```

This covers the "Database structure" item in the submission checklist.

---

## 7. Docs: `docs/`

```
docs/
├── PRD.pdf
├── TSD.pdf
├── project-report.pdf
├── presentation.pptx
├── database/
│   ├── schema-diagram.png
│   └── sample-data.json
└── screenshots/
    ├── home.png
    ├── opportunity-details.png
    ├── apply-form.png
    ├── apply-success.png
    ├── view-application.png
    ├── admin-login.png
    ├── admin-opportunities.png
    └── admin-applications.png
```

---

## 8. Environment variables

**`server/.env.example`**

```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/job_portal
SESSION_SECRET=change_this_to_a_long_random_string
CLIENT_ORIGIN=http://localhost:5173
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=choose_a_strong_password
```

**`client/.env.example`**

```
VITE_API_URL=http://localhost:5000/api
```

Only the `.example` files are committed. The real `.env` files stay local.

---

## 9. Conventions

| Thing | Style | Example |
| --- | --- | --- |
| React components and pages | PascalCase | `OpportunityCard.jsx` |
| Hooks | camelCase starting with `use` | `useDebounce.js` |
| Server files | camelCase, models in PascalCase | `applicationService.js`, `Application.js` |
| CSS Modules | Same name as the component | `Home.module.css` |
| Env variables | UPPER_SNAKE_CASE | `SESSION_SECRET` |
| API routes | lowercase, plural nouns | `/api/opportunities` |
| Git branches | `feature/...`, `fix/...` | `feature/apply-form` |
| Commits | Short, with a prefix | `feat: add duplicate application check` |

**`.gitignore`**

```
node_modules/
.env
dist/
build/
*.log
.DS_Store
.vscode/
```

---

## 10. Build order (matches TSD section 12)

**Week 1**

1. Create the folder skeleton (empty files are fine).
2. Server: `config`, `models`, opportunity routes/controller/service, `seedAdmin`, admin login and session.
3. Client: Vite setup, `AppRoutes`, `Home`, `OpportunityDetails`, search and filter (use sample data until the API is ready).

**Week 2**

4. Server: application API, duplicate check, ID generator, admin CRUD, applications list, `errorHandler`.
5. Client: connect the `api/` files, `ApplyForm`, `ApplySuccess`, `ViewApplication`, admin pages.
6. Test everything, fix bugs, then README, project report, screenshots and presentation.

---

## 11. Assumptions

- Plain JavaScript, not TypeScript (the TSD files are `.js` and `.jsx`).
- CSS Modules for styling (the TSD says to pick one and stay consistent).
- No automated tests folder, since the TSD plans manual testing. If the mentor asks for tests, add `server/tests/` and `client/src/__tests__/`.
- Folders marked **\[+\]** go beyond TSD section 3.1 and can be trimmed.