# Wiiz Dev - Full Stack Application

This is a full-stack application with a React frontend and Node.js/Express backend connected to MongoDB.

## Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- MongoDB (running locally or connection string)

## Installation

To install all dependencies for both frontend and backend with a single command:

```bash
npm run install:all
```

This will install:
- Root dependencies (concurrently)
- Backend dependencies
- Frontend dependencies

## Configuration

1. Create a `.env` file in the backend directory based on `.env.example`:
```bash
cd backend
cp .env.example .env
```

2. Update the `.env` file with your MongoDB connection string and other configurations.

## Running the Application

To start both frontend and backend servers with a single command:

```bash
npm start
```

Or:

```bash
npm run dev
```

This will run:
- Backend server on http://localhost:5000
- Frontend server on http://localhost:5173

## Individual Commands

If you need to run services individually:

### Backend only:
```bash
npm run start:backend
```

### Frontend only:
```bash
npm run start:frontend
```

### Install backend dependencies only:
```bash
npm run install:backend
```

### Install frontend dependencies only:
```bash
npm run install:frontend
```

## Building for Production

To build both frontend and backend:

```bash
npm run build
```

## API Integration

The frontend is connected to the backend using Axios. The following APIs are integrated:

- **Contact Form**: Submissions are stored in MongoDB
- **Projects**: Dynamic project data from database
- **Tech Stack**: Technology information from database
- **Authentication**: Admin panel with JWT authentication

## Features

- ✅ Unified command for installing dependencies
- ✅ Unified command for starting both servers
- ✅ MongoDB integration
- ✅ Axios for API calls
- ✅ Contact form data stored in database
- ✅ Dynamic content management through admin panel
- ✅ JWT authentication for admin routes

## Troubleshooting

If you encounter TypeScript errors in the backend, try:
1. Delete `node_modules` and `package-lock.json` in the backend folder
2. Run `npm install` again in the backend folder
3. If issues persist, run the backend in development mode which bypasses TypeScript compilation