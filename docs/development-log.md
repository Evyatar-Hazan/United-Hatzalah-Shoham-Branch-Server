# Backend Development Log

## Project Overview
REST API for United Hatzalah Shoham Branch landing page - handling donations, statistics, and contact forms.

## Architecture & Technologies
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Validation**: Zod
- **CORS**: Enabled for frontend communication
- **Environment**: .env configuration

## Project Structure
```
backend/
├── src/
│   ├── app.ts              - Express app setup & middleware
│   ├── index.ts            - Server entry point
│   ├── controllers/        - Request handlers
│   ├── services/           - Business logic
│   ├── routes/             - API routes
│   ├── models/             - Data models (future: DB)
│   ├── utils/              - Helper utilities
│   ├── middleware/         - Custom middleware
│   └── types/              - TypeScript types
├── dist/                   - Compiled JavaScript
├── docs/                   - Documentation
├── .env                    - Environment variables
├── .env.example            - Example env file
├── tsconfig.json           - TypeScript configuration
└── package.json            - Dependencies & scripts
```

## Development Progress

### Phase 1: Project Setup ✅
- [x] Initialize Node.js + npm
- [x] Install Express, TypeScript, Zod, CORS dependencies
- [x] Configure TypeScript with strict mode
- [x] Create folder structure
- [x] Setup environment configuration

### Phase 2: Core Infrastructure ✅
- [x] Define TypeScript types and interfaces
- [x] Create Zod validation schemas
- [x] Setup Express app with middleware
- [x] Configure CORS for frontend communication
- [x] Create error handling middleware

### Phase 3: API Implementation ✅
- [x] Donations Service & Controller
  - POST /api/donations - Create donation
  - GET /api/donations - List all donations
  - GET /api/donations/stats - Donation statistics
- [x] Statistics Service & Controller
  - GET /api/statistics - Get branch stats
  - PUT /api/statistics - Update stats (admin)
- [x] Health check endpoint - GET /api/health

### Phase 4: Build & Configuration ✅
- [x] TypeScript compilation (tsc)
- [x] Build output to dist/
- [x] npm scripts for dev, build, start
- [x] Environment variables setup

## API Endpoints

### Health Check
- `GET /api/health` - Server status

### Donations
- `POST /api/donations` - Create a donation
  - Body: `{ amount, donorName, donorEmail, message? }`
- `GET /api/donations` - List all donations
- `GET /api/donations/stats` - Get donation statistics

### Statistics
- `GET /api/statistics` - Get branch statistics
- `PUT /api/statistics` - Update branch statistics

## Response Format
```json
{
  "success": boolean,
  "data": any,
  "error": string,
  "message": string,
  "timestamp": ISO 8601 datetime
}
```

## Data Storage
- **Current**: In-memory (JavaScript arrays)
- **Future**: PostgreSQL/MongoDB integration

## Validation
All inputs validated using Zod schemas:
- Donation: amount, email, name, optional message
- Contact: name, email, message

## Error Handling
- Custom error middleware
- 404 route handler
- Validation error responses
- Type-safe error logging

## Environment Variables
```
PORT=5000
HOST=localhost
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

## Scripts
- `npm run dev` - Start dev server with ts-node
- `npm run build` - Compile TypeScript
- `npm start` - Run production build
- `npm test` - Run tests (placeholder)
- `npm run lint` - Lint code (placeholder)

## Next Steps
1. Add database integration (PostgreSQL/Prisma)
2. Implement email notifications for donations
3. Add payment gateway integration (Stripe)
4. Create admin dashboard API
5. Add authentication & authorization
6. Setup CI/CD pipeline
7. Add API documentation (Swagger)

## Known Issues & Notes
- In-memory storage lost on restart (migrate to DB)
- Email notifications not yet implemented
- Payment processing mocked (integrate Stripe)

---
*Last Updated: January 15, 2026*
