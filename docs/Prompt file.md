# Scaffold Prompt for Cursor and Antigravity: Create the Project Structure

How to use this:

1. Create an empty folder called `job-portal` and open it in Cursor or Antigravity (File > Open Folder).
2. Save this file as `SCAFFOLD_PROMPT.md` inside that folder.
3. Open the agent chat.
   - Cursor: switch to **Agent** mode (not Ask).
   - Antigravity: use the Agent panel in the editor.
4. Pick a strong model (Claude Sonnet or Gemini Pro level works well). Keep terminal command approval on "ask", so you can see what runs.
5. Send this one line: `Read SCAFFOLD_PROMPT.md fully and follow it step by step. Do not skip any step.`

You can also paste everything below the line straight into the chat.

---

## ROLE

You are a senior full-stack engineer. You are setting up the folder structure for a beginner-level internship project: **Internship & Job Listing Portal**. Stack: React (Vite), Node.js + Express, MongoDB with Mongoose. JavaScript only, ES Modules, no TypeScript.

## YOUR JOB (and what it is NOT)

Create the complete folder and file structure, install packages, add config files, and add a tiny amount of starter code so both apps run.

Do NOT build any real features. No schemas, no business logic, no real forms, no styling beyond what is listed. I will build those later, step by step. If you are unsure about anything, stop and ask me in the chat. Do not guess.

## RULES

1. Work in the current workspace folder. The root folder is `job-portal/` (the folder that is already open).
2. Create ONLY the folders and files listed below. No extra files, no extra folders. That includes plan files, notes, walkthroughs, or task lists inside the project. If you need to plan, keep it in the chat.
3. Use exactly the names and spelling given. Names are case-sensitive.
4. Do not overwrite a file that already exists. If something exists, tell me.
5. Both apps use ES Modules (`"type": "module"` in `package.json`, `import`/`export` only, no `require`).
6. Do not hardcode secrets. Use `.env` files.
7. Work in the order of the steps. After each step, run the check and show me the result before moving on.
8. If a command fails, show me the full error and stop. Do not try random fixes.
9. Check which shell you are in (PowerShell, cmd, bash, zsh). If a command below does not work in that shell, use the equivalent for it and tell me what you changed. Example: on Windows PowerShell use `curl.exe` instead of `curl`, and `Copy-Item` instead of `cp`.
10. Start dev servers in the background or a separate terminal so the chat does not hang. Stop them after each check.

## STEP 0: Check the environment

Run `node -v`, `npm -v`, and `git --version`. Node must be 18 or higher. If not, stop and tell me. Also tell me whether MongoDB is running locally (`mongosh --eval "db.runCommand({ping:1})"` or check the service). If it is not running, just tell me and continue. Do not install anything for it.

## STEP 1: Root files

Run `git init`. Create these at the root:

- `README.md` with only a title and the line "Setup instructions coming later."
- `.gitignore` with:

```
node_modules/
.env
dist/
build/
*.log
.DS_Store
.vscode/
```

- `.editorconfig` with: root = true, utf-8, lf line endings, 2-space indent, final newline, trim trailing whitespace.
- `docs/` folder with these empty subfolders, each holding a `.gitkeep` file: `docs/database/`, `docs/screenshots/`.

## STEP 2: Backend folders and files (`server/`)

Create this exact structure:

```
server/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   ├── env.js
│   │   └── session.js
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Opportunity.js
│   │   └── Application.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── opportunities.js
│   │   ├── applications.js
│   │   └── admin.js
│   ├── controllers/
│   │   ├── opportunityController.js
│   │   ├── applicationController.js
│   │   └── adminController.js
│   ├── services/
│   │   ├── opportunityService.js
│   │   ├── applicationService.js
│   │   └── authService.js
│   ├── validators/
│   │   ├── opportunityValidator.js
│   │   └── applicationValidator.js
│   ├── middleware/
│   │   ├── requireAdmin.js
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   ├── utils/
│   │   ├── generateApplicationId.js
│   │   ├── escapeRegex.js
│   │   ├── AppError.js
│   │   └── asyncHandler.js
│   ├── constants/
│   │   └── enums.js
│   ├── seed/
│   │   └── seedAdmin.js
│   ├── app.js
│   └── server.js
├── .env.example
├── .env
├── .gitignore
├── package.json
└── README.md
```

**Placeholder rule for every file above:** put one comment line at the top: `// <FileName>: <what this file will do>`, then nothing else. Use this table for the purpose text. Files listed in "Real starter code" below are the only exceptions.

| File | Purpose text |
| --- | --- |
| models/Admin.js | Mongoose schema for admins (email, passwordHash) |
| models/Opportunity.js | Mongoose schema for opportunities |
| models/Application.js | Mongoose schema for applications, unique index on opportunity + email |
| routes/opportunities.js | Opportunity routes (public list/details, admin create/update/delete) |
| routes/applications.js | Application routes (submit, get by applicationId) |
| routes/admin.js | Admin routes (login, logout, me, all applications) |
| controllers/\* | Handles req/res only, calls the matching service |
| services/\* | Business logic for the matching feature |
| validators/\* | Required-field checks only |
| config/session.js | express-session + connect-mongo setup |
| middleware/requireAdmin.js | Blocks request with 401 if admin is not logged in |
| utils/generateApplicationId.js | Returns APP- plus 6 random characters, no look-alike characters |
| utils/escapeRegex.js | Escapes special characters in search text |
| constants/enums.js | DOMAINS and OPPORTUNITY_TYPES arrays |
| seed/seedAdmin.js | One-time script that creates the first admin from .env |

**Real starter code (only these files):**

- `config/env.js`: load `dotenv`, read `PORT`, `MONGODB_URI`, `SESSION_SECRET`, `CLIENT_ORIGIN`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and export them as one object. Default `PORT` to 5000.
- `config/db.js`: export an async `connectDB()` that connects with mongoose using `MONGODB_URI`, logs "MongoDB connected" on success, and on failure logs the error and exits with code 1.
- `constants/enums.js`: export `DOMAINS = ["Web Development", "Data & AI", "UI/UX Design", "Marketing", "Other"]` and `OPPORTUNITY_TYPES = ["Job", "Internship"]`.
- `utils/AppError.js`: a class extending `Error` with a `statusCode` property.
- `utils/asyncHandler.js`: a function that wraps an async handler and passes errors to `next`.
- `middleware/notFound.js`: respond 404 with `{ "message": "Route not found" }`.
- `middleware/errorHandler.js`: a 4-argument Express error handler. Respond with `err.statusCode || 500` and `{ "message": err.message }`. For 500 errors, send "Something went wrong" instead of the real message.
- `routes/index.js`: an Express Router with one route `GET /health` returning `{ "status": "ok" }`. Export the router.
- `app.js`: create the Express app, add `cors({ origin: CLIENT_ORIGIN, credentials: true })`, `express.json()`, mount the router at `/api`, then `notFound`, then `errorHandler`. Export `app`. Do not call listen here.
- `server.js`: import `app` and `connectDB`, connect to the database, then start `app.listen(PORT)` and log the port.

Do NOT add session setup, models, or any other logic yet.

**Config files:**

- `server/package.json`: name `job-portal-server`, `"type": "module"`, scripts: `"dev": "nodemon src/server.js"`, `"start": "node src/server.js"`, `"seed": "node src/seed/seedAdmin.js"`.
- Install runtime packages: `express mongoose express-session connect-mongo bcrypt dotenv cors`
- Install dev package: `nodemon`
- `server/.env.example`:

```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/job_portal
SESSION_SECRET=change_this_to_a_long_random_string
CLIENT_ORIGIN=http://localhost:5173
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=choose_a_strong_password
```

- `server/.env`: copy of `.env.example` (it is ignored by git).
- `server/.gitignore`: `node_modules/` and `.env`.
- `server/README.md`: title and the line "Server setup coming later."

**Check for Step 2:** run `npm run dev` inside `server/` (in the background). Then call `http://localhost:5000/api/health` with curl. It must return `{"status":"ok"}`. Stop the server after. If MongoDB is not running, the server will exit at the connection step. In that case, tell me and do not change the code.

## STEP 3: Frontend folders and files (`client/`)

Create the app with Vite: `npm create vite@latest client -- --template react`, then `cd client && npm install`. If Vite asks any questions (for example about experimental or rolldown builds, or "install and start now"), choose No and do not start the dev server. Then install: `npm install react-router-dom axios`.

Delete the Vite demo files: `src/App.css`, `src/index.css`, and `src/assets/` (and the `public/vite.svg` if present). Keep `index.html`, `vite.config.js`, `eslint.config.js`, `package.json`.

Create this exact structure inside `client/src/`:

```
src/
├── api/
│   ├── axiosInstance.js
│   ├── opportunityApi.js
│   ├── applicationApi.js
│   └── adminApi.js
├── pages/
│   ├── Home/
│   │   ├── Home.jsx
│   │   └── Home.module.css
│   ├── OpportunityDetails/
│   │   ├── OpportunityDetails.jsx
│   │   └── OpportunityDetails.module.css
│   ├── ApplySuccess/
│   │   ├── ApplySuccess.jsx
│   │   └── ApplySuccess.module.css
│   ├── ViewApplication/
│   │   ├── ViewApplication.jsx
│   │   └── ViewApplication.module.css
│   ├── NotFound/
│   │   ├── NotFound.jsx
│   │   └── NotFound.module.css
│   └── admin/
│       ├── AdminLogin/
│       │   ├── AdminLogin.jsx
│       │   └── AdminLogin.module.css
│       ├── AdminOpportunities/
│       │   ├── AdminOpportunities.jsx
│       │   └── AdminOpportunities.module.css
│       ├── AdminOpportunityForm/
│       │   ├── AdminOpportunityForm.jsx
│       │   └── AdminOpportunityForm.module.css
│       └── AdminApplications/
│           ├── AdminApplications.jsx
│           └── AdminApplications.module.css
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── AdminLayout.jsx
│   ├── opportunity/
│   │   ├── OpportunityCard.jsx
│   │   ├── SearchBar.jsx
│   │   ├── DomainFilter.jsx
│   │   └── ApplyForm.jsx
│   ├── common/
│   │   ├── Loader.jsx
│   │   ├── EmptyState.jsx
│   │   ├── ErrorMessage.jsx
│   │   └── ConfirmModal.jsx
│   └── ProtectedRoute.jsx
├── context/
│   └── AuthContext.jsx
├── hooks/
│   ├── useDebounce.js
│   └── useFetch.js
├── routes/
│   └── AppRoutes.jsx
├── constants/
│   └── index.js
├── utils/
│   └── formatDate.js
├── styles/
│   ├── variables.css
│   └── global.css
├── App.jsx
└── main.jsx
```

Also create `client/.env` and `client/.env.example`, both containing: `VITE_API_URL=http://localhost:5000/api`. Also create `client/public/favicon.svg` (a simple placeholder SVG) and point `index.html` to it. Set the page `<title>` to "Job Portal".

**Placeholder rules:**

- Every page and component `.jsx` file: a small default-exported function component that returns `<div>ComponentName</div>` (use the real name), with a one-line comment above it saying what it will do. Page `.module.css` files stay empty.
- Every api file: a one-line comment saying what it will do. Only `axiosInstance.js` has real code (below).
- `hooks/` and `utils/` files: one-line comment only.

**Real starter code (only these files):**

- `api/axiosInstance.js`: axios instance with `baseURL: import.meta.env.VITE_API_URL` and `withCredentials: true`. Export it as default.
- `constants/index.js`: export `DOMAINS` and `TYPES` with the same values as the server's `enums.js`.
- `styles/variables.css`: a `:root` block with a few CSS variables (primary color, text color, background, spacing, font family).
- `styles/global.css`: a basic reset (box-sizing, margin 0, body font and background from the variables).
- `routes/AppRoutes.jsx`: use `Routes` and `Route` from react-router-dom with these routes, each pointing to its placeholder page:

| Path | Page |
| --- | --- |
| `/` | Home |
| `/opportunities/:id` | OpportunityDetails |
| `/apply-success/:applicationId` | ApplySuccess |
| `/application/:applicationId` | ViewApplication |
| `/admin/login` | AdminLogin |
| `/admin/opportunities` | AdminOpportunities |
| `/admin/opportunities/new` | AdminOpportunityForm |
| `/admin/opportunities/:id/edit` | AdminOpportunityForm |
| `/admin/applications` | AdminApplications |
| `*` | NotFound |

Do not wrap admin routes in `ProtectedRoute` yet.

- `App.jsx`: renders `AppRoutes`.
- `main.jsx`: import `styles/variables.css` and `styles/global.css`, wrap `App` in `BrowserRouter`, and render into `#root`.

Keep the `lint` script. Make sure `package.json` scripts are: `dev`, `build`, `preview`, `lint`.

**Check for Step 3:** run `npm run dev` inside `client/` (in the background). If you have a browser tool, open `http://localhost:5173` and visit `/`, `/admin/login`, `/admin/applications`, and `/random`. Each must show its placeholder name with no console errors. If you do not have a browser tool, just give me the four URLs and I will check them myself. Then run `npm run lint` and `npm run build` and show me the results. Stop the dev server after.

## STEP 4: Project rules file for future sessions

Create `AGENTS.md` in the root (both Cursor and Antigravity read this file automatically). Keep it a short bullet list with these project rules:

- Stack: React (Vite) + Express + MongoDB (Mongoose), JavaScript, ES Modules.
- Server flow: route, middleware, validator, controller, service, model. Controllers only handle req/res. Services hold business logic.
- Client flow: page, component, hook, api function, axios instance. Pages never call axios directly.
- All API errors use the shape `{ "message": "..." }`.
- Styling: CSS Modules, one `.module.css` per page or component.
- Do not add files or folders outside the agreed structure without asking.
- Never commit `.env`. Never log or return password hashes.
- The source documents are in `docs/` (PRD and TSD). Follow them.

## STEP 5: Final verification and first commit

1. List the full project tree without `node_modules` and `.git`. Use `tree -I node_modules` if it exists. On Windows PowerShell use `Get-ChildItem -Recurse -Force | Where-Object { $_.FullName -notmatch 'node_modules|\\.git\\' }`. Show the full output.
2. Compare it against the structures above. List any missing or extra files. Fix only what is missing or extra.
3. Run `git status` and confirm `.env` and `node_modules` are NOT listed.
4. Commit: `git add .` then `git commit -m "chore: scaffold project structure"`.

## FINAL REPORT

When everything is done, give me a short report:

- Which steps passed their checks
- Anything that failed or was skipped, and why
- The exact commands to start the server and client
- Confirmation that you did NOT build any real features

Then stop and wait for my next instruction.