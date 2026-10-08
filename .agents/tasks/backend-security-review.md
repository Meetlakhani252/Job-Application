# Backend Security Review Report

**Project:** Job Portal Server (`d:/Internship Project/Backend`)  
**Date:** 2025-07-13  
**Scope:** Full backend — middleware, routes, controllers, services, validators, models

---

## Executive Summary

The codebase is reasonably structured and avoids the worst vulnerabilities (SQL injection is N/A; Mongoose is used with parameterized queries; passwords are never returned in API responses; bcrypt hashing is solid). However, several real issues need fixing before production deployment:

- **No `helmet` middleware** — all security headers are missing (HIGH)
- **`secure: false` hardcoded on the session cookie** — sessions are vulnerable to interception even in production (HIGH)
- **No rate limiting on the login endpoint** — brute-force attacks are unrestricted (HIGH)
- **`CORS` accepts any value of `CLIENT_ORIGIN` from `.env` without validation** — misconfiguration silently allows wildcard-like behavior (MEDIUM)
- **`opportunityValidator.js` is a stub** — the admin `addOpportunity` and `editOpportunity` controllers do only presence checks; no type, enum, or URL validation (MEDIUM)
- **`resumeLink` field is not URL-validated** — arbitrary strings can be stored/returned as links (MEDIUM)
- **Error handler leaks a stack trace** via `console.log(err)` — in production this goes to stdout/logs but the shape should be guarded (LOW)
- **`applicationId` collision retry is non-atomic** — two concurrent requests could both pass the `exists()` check and hit the unique index (LOW, handled gracefully by Mongoose but silently)
- **`me` controller trusts `req.session.adminId` without verifying it is a valid ObjectId** before hitting the DB (LOW)
- **Missing `success` field in 500 error responses** — inconsistent with all other endpoints (LOW)

---

## 1. Security Issues

### 1.1 No `helmet` Middleware — CRITICAL/HIGH

**File:** `src/app.js`

`helmet` is not installed or used. Without it the server sends no security headers:

| Missing Header | Risk |
|---|---|
| `Content-Security-Policy` | XSS escalation |
| `X-Content-Type-Options: nosniff` | MIME sniffing |
| `X-Frame-Options` | Clickjacking |
| `Strict-Transport-Security` | Forces HTTP downgrade |
| `X-XSS-Protection` | Legacy XSS filter off |
| `Referrer-Policy` | Leaks URLs |

**Fix:** `npm install helmet`, then `app.use(helmet())` before other middleware in `app.js`.

---

### 1.2 Session Cookie `secure: false` Hardcoded — HIGH

**File:** `src/config/session.js`, line 19

```js
secure: false, // set to true in production with HTTPS
```

The comment acknowledges the problem but the code never actually flips the flag. If this is deployed to any HTTPS host the cookie will still be sent over HTTP (no `Secure` attribute), allowing session hijacking.

**Fix:**
```js
secure: process.env.NODE_ENV === "production",
```

---

### 1.3 No Rate Limiting on Login — HIGH

**File:** `src/routes/admin.js`, line 9 (`router.post("/login", login)`)

There is no rate-limiting middleware on the login route or anywhere else. An attacker can make unlimited password-guessing requests.

**Fix:** Install `express-rate-limit`, add a tight limiter specifically to `POST /api/admin/login` (e.g., 10 requests per 15 minutes per IP).

---

### 1.4 CORS — Single Origin, Credentials — MEDIUM

**File:** `src/app.js`, lines 11–15

```js
cors({
  origin: env.CLIENT_ORIGIN,
  credentials: true,
})
```

This is correct when `CLIENT_ORIGIN` is a real URL. Two edge cases to watch:

1. If `CLIENT_ORIGIN` is unset (undefined), `cors` defaults to allowing **all** origins while `credentials: true` is set — browsers will block the response, but the header `Access-Control-Allow-Origin: *` is still sent.
2. No validation that `CLIENT_ORIGIN` is a valid URL in `env.js`.

**Fix:** Guard the value in `env.js`:
```js
if (!process.env.CLIENT_ORIGIN) throw new Error("CLIENT_ORIGIN must be set");
```

---

### 1.5 Passwords Never Returned in API Responses — ✅ PASS

- `authService.getAdminById` uses `.select("-password")` — `src/services/authService.js` line 33.
- `verifyAdminCredentials` returns only `admin._id.toString()` — never the full document.
- Login controller stores only `adminId` in session, returns only `{ success, message }`.
- No endpoint returns the Admin document directly without the `-password` projection.

---

### 1.6 Password Hashing — ✅ PASS

- `bcrypt` with `SALT_ROUNDS = 12` — `src/models/Admin.js`.
- Pre-save hook only re-hashes when `isModified("password")`.
- Timing-safe: `verifyAdminCredentials` calls `comparePassword` even when the admin is not found (`src/services/authService.js` lines 22–24).

---

### 1.7 Input Sanitization / NoSQL Injection — ✅ PASS (with caveats)

- All user input that reaches Mongoose queries goes through:
  - ObjectId regex checks before `findById` calls.
  - `escapeRegex()` for the `$regex` search query.
  - Mongoose schema casting (implicit sanitization).
- No raw `eval`, `Function`, or `$where` usage found.
- **Caveat:** `editOpportunity` passes `updates` (a plain object) directly to `findByIdAndUpdate`. Each value comes from `req.body[field]`, but because the fields are whitelisted explicitly and Mongoose runs `runValidators: true`, operator injection (e.g., `{ "$gt": "" }`) is blocked by Mongoose's type casting for String fields.

---

### 1.8 Authentication / Authorization Middleware — ✅ PASS (minor note)

`requireAdmin` in `src/middleware/requireAdmin.js` correctly checks `req.session?.adminId` and returns 401. All write/admin routes are protected.

**Minor note:** `POST /api/admin/logout` is NOT protected by `requireAdmin`. This is intentional (you need to be able to call logout), but it means `req.session.destroy()` is called even for unauthenticated requests. This is harmless but wasteful.

---

### 1.9 `env.js` — Missing Required-Field Guards — MEDIUM

**File:** `src/config/env.js`

`MONGO_URI` and `SESSION_SECRET` are used but never validated as non-empty. If the app starts without them:
- `MONGO_URI` undefined → `mongoose.connect(undefined)` → crash at runtime (caught by `connectDB` → `process.exit(1)`).
- `SESSION_SECRET` undefined → sessions silently use `undefined` as the secret, breaking all session operations without an obvious error.

**Fix:** Throw at startup if required vars are missing:
```js
const required = ["MONGO_URI", "SESSION_SECRET", "CLIENT_ORIGIN"];
for (const key of required) {
  if (!process.env[key]) throw new Error(`Missing required env var: ${key}`);
}
```

---

## 2. Missing Validation

### 2.1 `opportunityValidator.js` Is a Stub — MEDIUM

**File:** `src/validators/opportunityValidator.js`

Content:
```js
// opportunityValidator.js: Required-field checks only
```

The file is empty. The admin `addOpportunity` controller (`src/controllers/adminController.js` lines 66–75) does only a presence check (`if (!title || !companyName || ...)`). No type, enum, or format validation is applied before the data reaches the service/Mongoose.

Mongoose does enforce the `enum` for `type` and `domain` and `required` for all fields, so invalid data is rejected at the DB layer — but the error message surfaced to the client will be a raw Mongoose validation error rather than a clean API error.

**Missing validations:**
- `type` must be one of `OPPORTUNITY_TYPES` (caught by Mongoose, but should be checked earlier)
- `domain` must be one of `DOMAINS` (same)
- `applicationLink` should be a valid URL
- String fields should have max-length limits to prevent oversized payloads

---

### 2.2 `resumeLink` Not URL-Validated — MEDIUM

**File:** `src/validators/applicationValidator.js`

`resumeLink` is optional but when provided, any string is accepted. An attacker could submit `javascript:alert(1)` or a local file path.

**Fix:** When `resumeLink` is present, validate with a URL regex or `new URL()`:
```js
if (resumeLink) {
  try {
    const parsed = new URL(String(resumeLink).trim());
    if (!["http:", "https:"].includes(parsed.protocol)) {
      throw new AppError("resumeLink must be an http or https URL", 400);
    }
  } catch {
    throw new AppError("resumeLink must be a valid URL", 400);
  }
}
```

---

### 2.3 No Length Limits on Free-Text Fields — LOW

**Files:** `src/validators/applicationValidator.js`, `src/controllers/adminController.js`

`name`, `message`, `description`, `experience`, etc., have no maximum length check. A client can send a 10 MB string. Mongoose schemas have no `maxlength` constraints either.

**Fix:** Add `maxlength` to Mongoose schemas and/or explicit checks in validators (e.g., `name` ≤ 100 chars, `message` ≤ 2000 chars, `description` ≤ 5000 chars).

---

### 2.4 Login Endpoint Has No Input Validation — LOW

**File:** `src/controllers/adminController.js` lines 23–24

```js
const { email, password } = req.body;
const adminId = await verifyAdminCredentials(email, password);
```

`verifyAdminCredentials` does check for empty values, but there is no email-format validation or length check before the DB lookup. A 10 MB `email` string will trigger a DB query.

**Fix:** Validate email format and enforce a max length (e.g., 254 chars) before calling the service.

---

### 2.5 `getOpportunities` — `search` Parameter Has No Length Limit — LOW

**File:** `src/controllers/opportunityController.js` / `src/services/opportunityService.js`

`search` is regex-escaped before use, which prevents ReDoS via metacharacters. However there is no length limit — a 1 MB search string will still get compiled into a MongoDB regex.

**Fix:** Cap `search` at a reasonable length (e.g., 200 chars) in the controller.

---

## 3. Bugs

### 3.1 `applicationId` Collision Retry Is Non-Atomic — LOW

**File:** `src/services/applicationService.js`, lines 38–43

```js
let applicationId = generateApplicationId();
const collision = await Application.exists({ applicationId });
if (collision) {
  applicationId = generateApplicationId();
}
```

Two concurrent requests could both pass the `exists()` check before either has written to the DB, and then both attempt to write with the same `applicationId`. The `unique` index on `applicationId` will reject the second write with a Mongo `11000` error, but the `catch` block only handles the compound `email + opportunity` duplicate, not a bare `applicationId` duplicate. The bare collision would be re-thrown as a generic 500.

**Fix:** Either handle `error.keyPattern?.applicationId` in the catch block, or use a loop with retries rather than a single conditional retry.

---

### 3.2 `me` Controller — `adminId` Not Validated Before DB Call — LOW

**File:** `src/controllers/adminController.js`, `me` function

`req.session.adminId` is set on login as `admin._id.toString()` (a valid ObjectId string), but nothing stops a manually crafted session from containing an arbitrary string. `Admin.findById(nonHexString)` will throw a Mongoose `CastError` which surfaces as a 500.

**Fix:** Add an ObjectId format check in `requireAdmin` or at the top of `me`, or catch the CastError and return 401.

---

### 3.3 Error Handler Uses `console.log` for All Errors Including 500s — LOW

**File:** `src/middleware/errorHandler.js`, line 2

```js
console.log(err);
```

Using `console.log` instead of `console.error` means stack traces don't go to stderr. On platforms that split stdout/stderr for log aggregation, 500 errors will be silently swallowed into the normal log stream.

Also: the error response for 500s has shape `{ message }` while all other endpoints use `{ success, message }`. This inconsistency complicates frontend error handling.

**Fix:**
```js
if (status === 500) console.error(err); // stderr for real errors
res.status(status).json({ success: false, message });
```

---

### 3.4 `logout` Does Not Clear `sameSite`/`path` on `clearCookie` — LOW

**File:** `src/controllers/adminController.js`, line 38

```js
res.clearCookie("connect.sid");
```

`clearCookie` must be called with the same `path` and `domain` options the cookie was set with, otherwise the browser will not actually delete it. Since `express-session` sets `connect.sid` on path `/` by default, this works, but if the session cookie `path` or `name` is ever customized the `clearCookie` call will silently fail.

**Fix:** Use the session's configured cookie name and options, or call `req.session.destroy()` and rely on the `connect-mongo` store clearing; `clearCookie` is redundant when using `session.destroy()` correctly (the store handles expiry).

---

### 3.5 `server.js` Error Handling Swallows Start-up Failures — LOW

**File:** `src/server.js`

```js
} catch (err) {
  console.log("could not start server");
  console.log(err);
}
```

On startup failure (e.g., Mongo unreachable) the process doesn't exit after the `catch` block (the catch is inside `connectDB` which calls `process.exit(1)`, but if `app.listen` itself throws the outer catch would just log and hang). Use `console.error` and `process.exit(1)` in the outer catch too.

---

## 4. Complete Endpoint Test List (Postman / Thunder Client)

**Base URL:** `http://localhost:5000/api`  
**Auth:** Cookie-based session. After a successful `POST /admin/login` the server sets a `connect.sid` cookie; include it on all protected requests.

---

### Group 1: Health

#### GET /health
- **Description:** Liveness check
- **Auth:** None
- **Body/Query:** None
- **Expected 200:**
  ```json
  { "status": "ok" }
  ```

---

### Group 2: Opportunities (Public)

#### GET /opportunities
- **Description:** List all opportunities (optional filters)
- **Auth:** None
- **Query Params:**
  - `search` (string, optional) — substring match on title
  - `domain` (string, optional) — one of: `Web Development`, `Data & AI`, `UI/UX Design`, `Marketing`, `Other`
- **Expected 200:**
  ```json
  {
    "success": true,
    "count": 2,
    "data": [{ "_id": "...", "title": "...", "companyName": "...", ... }]
  }
  ```
- **Test cases:**
  1. `GET /opportunities` → 200, all results
  2. `GET /opportunities?search=engineer` → 200, filtered
  3. `GET /opportunities?domain=Web%20Development` → 200, filtered
  4. `GET /opportunities?domain=InvalidDomain` → 400, `{ message: "Invalid domain..." }`
  5. `GET /opportunities?unknownParam=foo` → 400, `{ message: "Unknown query parameter(s): unknownParam" }`

#### GET /opportunities/:id
- **Description:** Fetch a single opportunity by MongoDB ObjectId
- **Auth:** None
- **Params:** `id` — 24-character hex ObjectId
- **Expected 200:**
  ```json
  { "success": true, "data": { ... } }
  ```
- **Test cases:**
  1. Valid existing ID → 200
  2. Valid format but non-existent ID → 404, `{ message: "Opportunity not found" }`
  3. Invalid format (e.g., `abc`) → 400, `{ message: "Invalid opportunity ID format" }`

---

### Group 3: Applications (Public)

#### POST /applications
- **Description:** Submit a new application
- **Auth:** None
- **Body (JSON):**
  ```json
  {
    "name": "Jane Doe",
    "phone": "+919876543210",
    "email": "jane@example.com",
    "opportunityId": "<valid 24-char ObjectId>",
    "resumeLink": "https://drive.google.com/resume",
    "message": "I am interested..."
  }
  ```
- **Required fields:** `name`, `phone`, `email`, `opportunityId`
- **Optional fields:** `resumeLink`, `message`
- **Expected 201:**
  ```json
  { "success": true, "applicationId": "APP-A3K9Q7" }
  ```
- **Test cases:**
  1. Valid full body → 201
  2. Valid minimal body (no resumeLink, no message) → 201
  3. Missing `name` → 400, `{ message: "Name is required" }`
  4. Missing `phone` → 400, `{ message: "Phone is required" }`
  5. Invalid phone format (`abc`) → 400, `{ message: "Phone must be 7–15 digits..." }`
  6. Missing `email` → 400, `{ message: "Email is required" }`
  7. Invalid email (`notanemail`) → 400, `{ message: "Invalid email address" }`
  8. Missing `opportunityId` → 400, `{ message: "opportunityId is required" }`
  9. Invalid `opportunityId` format → 400, `{ message: "Invalid opportunityId format" }`
  10. Valid format but non-existent `opportunityId` → 404, `{ message: "Opportunity not found" }`
  11. Duplicate email + same opportunityId → 409, `{ message: "You have already applied to this opportunity" }`

#### GET /applications/:applicationId
- **Description:** Retrieve an application by its display ID
- **Auth:** None
- **Params:** `applicationId` — format `APP-XXXXXX` (6 alphanumeric chars)
- **Expected 200:**
  ```json
  {
    "success": true,
    "data": {
      "_id": "...",
      "applicationId": "APP-A3K9Q7",
      "name": "Jane Doe",
      "phone": "+919876543210",
      "email": "jane@example.com",
      "opportunity": { ... },
      "createdAt": "...",
      "updatedAt": "..."
    }
  }
  ```
- **Test cases:**
  1. Valid existing ID → 200
  2. Valid format but non-existent → 404, `{ message: "Application not found" }`
  3. Invalid format (`APP-1234`) → 400, `{ message: "Invalid application ID format" }`
  4. All-lowercase valid format (`app-a3k9q7`) → 200 (controller uppercases before lookup)

---

### Group 4: Admin — Authentication

#### POST /admin/login
- **Description:** Authenticate as admin, create session
- **Auth:** None
- **Body (JSON):**
  ```json
  { "email": "admin@example.com", "password": "yourpassword" }
  ```
- **Expected 200:**
  ```json
  { "success": true, "message": "Logged in successfully" }
  ```
  Sets `connect.sid` cookie.
- **Test cases:**
  1. Correct credentials → 200 + Set-Cookie
  2. Wrong password → 401, `{ message: "Invalid email or password" }`
  3. Non-existent email → 401, `{ message: "Invalid email or password" }`
  4. Missing email or password → 400, `{ message: "Email and password are required" }`
  5. Empty body → 400

#### POST /admin/logout
- **Description:** Destroy the session and clear the cookie
- **Auth:** Session cookie (works even without one)
- **Body:** None
- **Expected 200:**
  ```json
  { "success": true, "message": "Logged out successfully" }
  ```
- **Test cases:**
  1. Logged-in session → 200
  2. No session → 200 (session.destroy still runs)

#### GET /admin/me
- **Description:** Return current admin's profile
- **Auth:** Must have active session cookie
- **Expected 200:**
  ```json
  { "success": true, "data": { "_id": "...", "email": "admin@example.com" } }
  ```
  Note: `password` must NOT be in `data`.
- **Test cases:**
  1. Authenticated → 200, no `password` field in `data`
  2. No session → 401, `{ "success": false, "message": "Unauthorized" }`

---

### Group 5: Admin — Opportunity Management (Protected)

All routes require an active admin session cookie.

#### POST /admin/opportunities
- **Description:** Create a new opportunity listing
- **Auth:** Admin session
- **Body (JSON):**
  ```json
  {
    "title": "Frontend Engineer",
    "companyName": "Acme Corp",
    "type": "Job",
    "domain": "Web Development",
    "location": "Remote",
    "experience": "2+ years",
    "description": "Build great UIs.",
    "applicationLink": "https://acme.com/careers/123"
  }
  ```
- **Expected 201:**
  ```json
  { "success": true, "data": { "_id": "...", "title": "...", ... } }
  ```
- **Test cases:**
  1. All valid fields → 201
  2. Missing any required field → 400, `{ message: "All opportunity fields are required" }`
  3. Invalid `type` (not in enum) → 500 (Mongoose validation, **bug** — should be 400; see §2.1)
  4. Invalid `domain` (not in enum) → 500 (same issue)
  5. No session → 401

#### PUT /admin/opportunities/:id
- **Description:** Update one or more fields of an opportunity
- **Auth:** Admin session
- **Params:** `id` — 24-char hex ObjectId
- **Body:** Any subset of opportunity fields
- **Expected 200:**
  ```json
  { "success": true, "data": { "_id": "...", ... } }
  ```
- **Test cases:**
  1. Valid update → 200
  2. Invalid ID format → 400
  3. Valid format, non-existent ID → 404
  4. Empty body (no recognized fields) → 400, `{ message: "No valid fields to update" }`
  5. No session → 401

#### DELETE /admin/opportunities/:id
- **Description:** Delete an opportunity
- **Auth:** Admin session
- **Params:** `id` — 24-char hex ObjectId
- **Expected 200:**
  ```json
  { "success": true, "message": "Opportunity deleted successfully" }
  ```
- **Test cases:**
  1. Valid existing ID → 200
  2. Invalid ID format → 400
  3. Valid format, non-existent ID → 404
  4. No session → 401

---

### Group 6: Admin — Application Management (Protected)

#### GET /admin/applications
- **Description:** Retrieve all submitted applications (admin view)
- **Auth:** Admin session
- **Expected 200:**
  ```json
  {
    "success": true,
    "count": 10,
    "data": [
      {
        "_id": "...",
        "applicationId": "APP-A3K9Q7",
        "name": "Jane Doe",
        "email": "jane@example.com",
        "phone": "...",
        "opportunity": { "title": "Frontend Engineer", "companyName": "Acme Corp" },
        "createdAt": "..."
      }
    ]
  }
  ```
- **Test cases:**
  1. Authenticated → 200, array of applications with opportunity title + companyName populated
  2. No session → 401

---

## 5. API Documentation (README Section)

---

### API Reference

**Base URL:** `http://localhost:5000/api`

**Authentication:** Cookie-based sessions. Call `POST /admin/login` to receive a `connect.sid` session cookie. Pass this cookie on every subsequent protected request. Log out with `POST /admin/logout`.

---

#### Opportunities

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/opportunities` | Public | List all opportunities. Supports `?search=<text>` and `?domain=<value>` query filters. |
| GET | `/opportunities/:id` | Public | Get a single opportunity by its MongoDB ObjectId. |

**GET /opportunities — Query Parameters**

| Parameter | Type | Description |
|-----------|------|-------------|
| `search` | string | Case-insensitive substring match on the opportunity title |
| `domain` | string | Exact match; allowed values: `Web Development`, `Data & AI`, `UI/UX Design`, `Marketing`, `Other` |

---

#### Applications

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/applications` | Public | Submit a new application |
| GET | `/applications/:applicationId` | Public | Look up an application by its `APP-XXXXXX` ID |

**POST /applications — Request Body**

```json
{
  "name": "Jane Doe",           // required
  "phone": "+919876543210",     // required, 7–15 digits, optional leading +
  "email": "jane@example.com",  // required
  "opportunityId": "<ObjectId>",// required, 24-char hex
  "resumeLink": "https://...",  // optional
  "message": "Cover text"       // optional
}
```

**Response 201:**
```json
{ "success": true, "applicationId": "APP-A3K9Q7" }
```

---

#### Admin

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/admin/login` | Public | Authenticate and start a session |
| POST | `/admin/logout` | Public | Destroy the current session |
| GET | `/admin/me` | Admin | Get current admin profile |
| POST | `/admin/opportunities` | Admin | Create a new opportunity listing |
| PUT | `/admin/opportunities/:id` | Admin | Update an existing opportunity |
| DELETE | `/admin/opportunities/:id` | Admin | Delete an opportunity |
| GET | `/admin/applications` | Admin | List all submitted applications |

**POST /admin/login — Request Body**

```json
{ "email": "admin@example.com", "password": "yourpassword" }
```

**Response 200:**
```json
{ "success": true, "message": "Logged in successfully" }
```

**POST /admin/opportunities — Request Body**

```json
{
  "title": "Frontend Engineer",
  "companyName": "Acme Corp",
  "type": "Job",                         // "Job" | "Internship"
  "domain": "Web Development",           // see domain enum above
  "location": "Remote",
  "experience": "2+ years",
  "description": "Build great UIs.",
  "applicationLink": "https://acme.com/careers/123"
}
```

---

#### Error Responses

All errors follow this shape:

```json
{ "message": "<human-readable description>" }
```

Common status codes:

| Code | Meaning |
|------|---------|
| 400 | Bad request / validation failure |
| 401 | Unauthenticated |
| 404 | Resource not found |
| 409 | Conflict (duplicate application) |
| 500 | Internal server error |

> **Note:** 500 responses currently omit the `success` field (inconsistency — see §3.3 fix recommendation).

---

## 6. Summary of Recommended Fixes (Priority Order)

| Priority | Issue | File(s) | Fix |
|----------|-------|---------|-----|
| HIGH | No `helmet` | `app.js` | `npm install helmet` + `app.use(helmet())` |
| HIGH | `secure: false` hardcoded | `config/session.js` | `secure: process.env.NODE_ENV === 'production'` |
| HIGH | No rate limiting on login | `routes/admin.js` | Add `express-rate-limit` to `POST /admin/login` |
| MEDIUM | `opportunityValidator.js` is empty | `validators/opportunityValidator.js` | Implement enum + URL validation; use it in admin controller |
| MEDIUM | `resumeLink` not URL-validated | `validators/applicationValidator.js` | Validate with `new URL()` + protocol check |
| MEDIUM | Missing env var guards | `config/env.js` | Throw on missing `MONGO_URI`, `SESSION_SECRET`, `CLIENT_ORIGIN` |
| LOW | `applicationId` collision not fully handled | `services/applicationService.js` | Handle `keyPattern.applicationId` in error catch |
| LOW | `me` trusts raw session value | `controllers/adminController.js` | Validate ObjectId format before DB call |
| LOW | `console.log` in error handler | `middleware/errorHandler.js` | Use `console.error`; add `success: false` to 500 response |
| LOW | No max-length on free-text fields | models + validators | Add `maxlength` constraints |
| LOW | `search` parameter no length limit | `controllers/opportunityController.js` | Cap at 200 chars |
