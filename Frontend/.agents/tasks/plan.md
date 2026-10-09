# Implementation Plan — Internship & Job Listing Portal Frontend

> Worktree: `d:\Internship Project\Frontend`  
> Stack: Vite 8 + React 19 + JavaScript/JSX + MUI + React Hook Form  
> Backend is finished — never open `d:\Internship Project\Backend`  
> API source of truth: `d:\Internship Project\Frontend\API_CONTRACT.md`

---

## Key decisions

- **No TypeScript** — project is plain JS/JSX; all files use `.jsx` / `.js`.  
- **BrowserRouter lives in main.jsx** — App.jsx must NOT add a second one; only ThemeProvider + CssBaseline + AuthProvider go there.  
- **ConfirmModal.jsx** (existing filename) is kept; the component is exported as `ConfirmDialog` to match spec; all import sites reference `ConfirmModal.jsx`.  
- **FindApplication page** is a new directory `src/pages/FindApplication/` (not in stubs) — create it.  
- **AdminLayout uses MUI Drawer + Outlet** — admin sub-pages render inside the outlet.  
- **Admin route for `/admin`** redirects to `/admin/opportunities` or simply renders AdminOpportunities directly.  
- **SearchBar debounce** — local state holds immediate value; parent callback is debounced 400 ms via useDebounce hook.  
- **opportunity field in applications** — if backend populates it, show title+company; otherwise show the ID string (note gap in FEAT-003 findings).

---

## FEAT decomposition

This plan is implemented as three sequential FEATs. Artifacts live at:  
`d:\Internship Project\Frontend\.agents\tasks\task-frontend-portal\`

---

- [ ] 1. **FEAT-001 — Foundation: deps, theme, API layer, AuthContext, all shared components**  
      Install MUI + react-hook-form. Create theme.js. Wire App.jsx (AuthProvider + ThemeProvider). Complete all 4 API modules. Implement AuthContext with useAuth hook. Implement useDebounce. Implement all shared components: Loader, ErrorMessage, EmptyState, ConfirmDialog (in ConfirmModal.jsx), Navbar, Footer, AdminLayout, ProtectedRoute, OpportunityCard, SearchBar, DomainFilter, ApplyForm.  
      Files: `package.json` (npm install), `src/theme.js`, `src/App.jsx`, `src/api/axiosInstance.js`, `src/api/opportunityApi.js`, `src/api/applicationApi.js`, `src/api/adminApi.js`, `src/context/AuthContext.jsx`, `src/hooks/useDebounce.js`, `src/utils/formatDate.js`, `src/components/common/Loader.jsx`, `src/components/common/ErrorMessage.jsx`, `src/components/common/EmptyState.jsx`, `src/components/common/ConfirmModal.jsx`, `src/components/layout/Navbar.jsx`, `src/components/layout/Footer.jsx`, `src/components/layout/AdminLayout.jsx`, `src/components/ProtectedRoute.jsx`, `src/components/opportunity/OpportunityCard.jsx`, `src/components/opportunity/SearchBar.jsx`, `src/components/opportunity/DomainFilter.jsx`, `src/components/opportunity/ApplyForm.jsx`  
      Verify: `cd "d:\Internship Project\Frontend" && npm run build` — zero errors.

- [ ] 2. **FEAT-002 — Applicant pages + routing**  
      Implement Home, OpportunityDetails, ApplySuccess, ViewApplication, FindApplication (new), NotFound. Overwrite AppRoutes.jsx with all 11 routes, ProtectedRoute nesting for admin, AdminLayout as layout outlet.  
      Files: `src/pages/Home/Home.jsx`, `src/pages/Home/Home.module.css`, `src/pages/OpportunityDetails/OpportunityDetails.jsx`, `src/pages/OpportunityDetails/OpportunityDetails.module.css`, `src/pages/ApplySuccess/ApplySuccess.jsx`, `src/pages/ApplySuccess/ApplySuccess.module.css`, `src/pages/ViewApplication/ViewApplication.jsx`, `src/pages/ViewApplication/ViewApplication.module.css`, `src/pages/FindApplication/index.jsx` (new), `src/pages/FindApplication/FindApplication.module.css` (new), `src/pages/NotFound/NotFound.jsx`, `src/pages/NotFound/NotFound.module.css`, `src/routes/AppRoutes.jsx`  
      Verify: `cd "d:\Internship Project\Frontend" && npm run build` — zero errors.

- [ ] 3. **FEAT-003 — Admin pages**  
      Implement AdminLogin, AdminOpportunities (list+delete+Snackbar), AdminOpportunityForm (add+edit), AdminApplications (table). These render inside AdminLayout via ProtectedRoute wired in FEAT-002.  
      Files: `src/pages/admin/AdminLogin/AdminLogin.jsx`, `src/pages/admin/AdminLogin/AdminLogin.module.css`, `src/pages/admin/AdminOpportunities/AdminOpportunities.jsx`, `src/pages/admin/AdminOpportunities/AdminOpportunities.module.css`, `src/pages/admin/AdminOpportunityForm/AdminOpportunityForm.jsx`, `src/pages/admin/AdminOpportunityForm/AdminOpportunityForm.module.css`, `src/pages/admin/AdminApplications/AdminApplications.jsx`, `src/pages/admin/AdminApplications/AdminApplications.module.css`  
      Verify: `cd "d:\Internship Project\Frontend" && npm run build` — zero errors, no console.log statements.

---

## Backend gaps

1. **`GET /admin/applications` — opportunity population unknown**: the API contract shows `opportunity: ObjectId` on Application. It is not confirmed whether the backend populates this field with `{ title, companyName }` or returns the raw ObjectId. AdminApplications handles both cases defensively.
2. **`/find-application` route**: the spec defines this route but there is no corresponding backend endpoint — it is purely a frontend navigation aid.
3. **Admin route `/admin`**: the spec lists `/admin` as a route but does not specify a dedicated admin dashboard page — AdminOpportunities is rendered there directly.

---

## Run steps (after all FEATs complete)

```bash
cd "d:\Internship Project\Frontend"
cp .env.example .env          # edit VITE_API_URL if backend port differs
npm install                   # if not already done
npm run dev                   # starts on http://localhost:5173
```

## Manual test checklist

- [ ] Home page loads opportunities, search by title filters results, domain dropdown filters results
- [ ] Opportunity card click navigates to detail page
- [ ] Apply form submits, shows duplicate error when applying twice, redirects to success page
- [ ] Success page shows applicationId and copy button works
- [ ] `/applications/:applicationId` shows the saved application
- [ ] Navbar "Find my application" input navigates to the right URL
- [ ] `/find-application` page submits and navigates
- [ ] `/admin/login` shows error on bad credentials, redirects to /admin on success
- [ ] Admin opportunity list shows all opportunities
- [ ] Add opportunity form creates and navigates back
- [ ] Edit opportunity pre-fills all fields
- [ ] Delete opportunity shows confirm dialog, deletes on confirm, shows Snackbar
- [ ] Admin applications table shows all applications
- [ ] Logout clears session, subsequent visit to /admin redirects to /admin/login
- [ ] 404 page renders for unknown routes
