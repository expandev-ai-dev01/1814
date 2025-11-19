# Catálogo de Carros - Backend API

## Description
Backend API for car catalog application with vehicle listing, details viewing, and contact form functionality.

## Features
- Vehicle listing with filtering and sorting
- Vehicle details viewing
- Contact form submission

## Technology Stack
- Node.js
- Express.js
- TypeScript
- In-memory data storage (no database)

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Start development server:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

## API Endpoints

### Health Check
- `GET /health` - Server health status

### API Version 1
Base URL: `/api/v1`

#### External Routes (Public)
- Available at `/api/v1/external/*`

#### Internal Routes (Authenticated)
- Available at `/api/v1/internal/*`

## Project Structure

```
src/
├── api/              # API controllers
├── routes/           # Route definitions
├── middleware/       # Express middleware
├── services/         # Business logic
├── utils/            # Utility functions
├── constants/        # Application constants
├── instances/        # Service instances
└── server.ts         # Application entry point
```

## Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 3000)
- `API_VERSION` - API version (default: v1)
- `CORS_ORIGINS` - Allowed CORS origins

## Development Notes

- This project uses in-memory storage (arrays/objects) for data
- No database persistence is implemented
- All data is reset when the server restarts
- Suitable for development and demonstration purposes

## License
ISC
