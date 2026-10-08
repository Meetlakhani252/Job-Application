# API Contract

## Base Configuration
- Base URL: `/api`
- Auth: Session cookie (`connect.sid`)
- CORS: Credentials must be `true`

## Public Endpoints

### GET /api/health
- Auth: No
- Query: None
- Response: `{ status: 'ok' }`

### GET /api/opportunities
- Auth: No
- Query: `search` (string, optional), `domain` (string, optional)
- Response: `{ success: true, message: 'Success', data: Opportunity[] }`
- Error: `{ success: false, message: string }` (400)

### GET /api/opportunities/:id
- Auth: No
- Params: `id` (ObjectId)
- Response: `{ success: true, message: 'Success', data: Opportunity }`
- Error: `{ success: false, message: string }` (400/404)

### POST /api/applications
- Auth: No
- Body: `{ name, phone, email, opportunityId, resumeLink?, message? }`
- Response: `{ success: true, message: 'Application submitted', data: { applicationId: string } }` (201)
- Error: `{ success: false, message: string, errors?: string[] }` (422/400)

### GET /api/applications/:applicationId
- Auth: No
- Params: `applicationId` (APP_ID format)
- Response: `{ success: true, message: 'Success', data: Application }`
- Error: `{ success: false, message: string }` (400/404)

## Admin Endpoints

### POST /api/admin/login
- Auth: No
- Body: `{ email, password }`
- Response: `{ success: true, message: 'Logged in successfully', data: null }`
- Error: `{ success: false, message: string }` (400/401)
- Rate limit: 10 requests per 15 minutes

### POST /api/admin/logout
- Auth: No
- Response: `{ success: true, message: 'Logged out successfully', data: null }`
- Error: `{ success: false, message: string }` (500)

### GET /api/admin/me
- Auth: Yes
- Response: `{ success: true, message: 'Success', data: Admin }`
- Error: `{ success: false, message: 'Unauthorized' }` (401)

### POST /api/admin/opportunities
- Auth: Yes
- Body: `{ title, companyName, type, domain, location, experience, description, applicationLink }`
- Response: `{ success: true, message: 'Success', data: Opportunity }` (201)
- Error: `{ success: false, message: string }` (400/401)

### PUT /api/admin/opportunities/:id
- Auth: Yes
- Params: `id` (ObjectId)
- Body: Partial `{ title?, companyName?, type?, domain?, location?, experience?, description?, applicationLink? }`
- Response: `{ success: true, message: 'Success', data: Opportunity }`
- Error: `{ success: false, message: string }` (400/401/404)

### DELETE /api/admin/opportunities/:id
- Auth: Yes
- Params: `id` (ObjectId)
- Response: `{ success: true, message: 'Opportunity deleted successfully', data: null }`
- Error: `{ success: false, message: string }` (400/401/404)

### GET /api/admin/applications
- Auth: Yes
- Response: `{ success: true, message: 'Success', data: Application[] }`
- Error: `{ success: false, message: 'Unauthorized' }` (401)

## Data Models

### Opportunity
```
_id: ObjectId
title: string
companyName: string
type: 'Job' | 'Internship'
domain: 'Web Development' | 'Data & AI' | 'UI/UX Design' | 'Marketing' | 'Other'
location: string
experience: string
description: string
applicationLink: string
createdAt: Date
updatedAt: Date
```

### Application
```
_id: ObjectId
applicationId: string (unique, e.g., APP-XXXXXX)
name: string
phone: string (7-15 digits, optional +)
email: string
resumeLink?: string
message?: string
opportunity: ObjectId (ref Opportunity)
createdAt: Date
updatedAt: Date
```

### Admin
```
_id: ObjectId
email: string
password: string (hashed)
createdAt: Date
updatedAt: Date
```

## Enums
- Type: `["Job", "Internship"]`
- Domain: `["Web Development", "Data & AI", "UI/UX Design", "Marketing", "Other"]`

## Validation Rules
- Phone: 7-15 digits, optional leading +
- Email: Valid email format
- opportunityId: 24-char hex (ObjectId)
- applicationId: Matches APP_ID_REGEX pattern

## Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 422: Validation Error
- 500: Server Error
