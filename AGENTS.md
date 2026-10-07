# Project rules

- Stack: React (Vite) + Express + MongoDB (Mongoose), JavaScript, ES Modules.
- Server flow: route, middleware, validator, controller, service, model. Controllers only handle req/res. Services hold business logic.
- Client flow: page, component, hook, api function, axios instance. Pages never call axios directly.
- All API errors use the shape `{ "message": "..." }`.
- Styling: CSS Modules, one `.module.css` per page or component.
- Do not add files or folders outside the agreed structure without asking.
- Never commit `.env`. Never log or return password hashes.
- The source documents are in `docs/` (PRD and TSD). Follow them.
