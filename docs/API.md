# API

- `GET /api/health` - service health.
- `POST /api/auth/register` - create a user.
- `POST /api/auth/login` - authenticate and receive a JWT.
- `GET /api/schemes` - list schemes.
- `POST /api/eligibility/check` - return eligible schemes for submitted answers.
- `POST /api/chat` - ask the scheme assistant.
- `GET /api/admin/analytics` - admin analytics, requires admin JWT.
