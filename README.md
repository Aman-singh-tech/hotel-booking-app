# Hotel Booking App

A full-stack production-ready web application for booking hotels.

## Tech Stack
- **Frontend**: React, React Router, Tailwind CSS, Axios, Context API
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT

## Quick Start

### 1. Setup Environment
Ensure you have MongoDB running locally or a MongoDB Atlas URI.
The backend `.env` is already configured for a local database:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hotel-booking
JWT_SECRET=supersecretjwtkey12345
NODE_ENV=development
```

### 2. Run the Backend
Open a terminal and navigate to the `backend` folder:
```bash
cd backend
npm install
npm run seed  # To populate database with sample data
npm run dev
```
The backend server will start on http://localhost:5000.

### 3. Run the Frontend
Open a new terminal and navigate to the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```
The frontend server will start on http://localhost:5173.

### Admin Credentials (from seeding)
- **Email**: admin@example.com
- **Password**: admin123

### User Credentials
- **Email**: user@example.com
- **Password**: user123
