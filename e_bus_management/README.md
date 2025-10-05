# Ebus Management System

This project is a full-stack web application for managing bus operations including driver registrations, bus details, live location tracking, and admin dashboard control.

## Features

- Driver Dashboard: Enter and update bus details, view current location.
- Admin Dashboard: Manage drivers and bus details.
- User Dashboard: Search buses by source and destination.
- Real-time location tracking with geolocation and reverse geocoding.
- Role-based authentication and authorization.

## Technology Stack

- Frontend: React.js, Bootstrap 5 for styling, Axios for API calls.
- Backend: Node.js, Express.js, MongoDB (Mongoose).
- Authentication: JWT based secure login.
- Location: Browser geolocation and OpenStreetMap Nominatim API for reverse geocoding.

## Setup Instructions

### Backend

1. Navigate to backend directory:

`cd backend`


2. Install dependencies:

`npm install`


3. Create a `.env` file with:

`MONGODB_URI=<your_mongodb_connection_string>`
`JWT_SECRET=<your_jwt_secret>`
`PORT=5000`


4. Run the server:

`npm run server`


### Frontend

1. Navigate to frontend directory:

`cd frontend`


2. Install dependencies:

`npm install`


3. Run the React development server:

`npm start`


## Usage

- Register or login as Driver, Admin, or User.
- Drivers can add and edit their bus details and share location.
- Admins can view, edit, and remove driver and bus records.
- Users can search for buses based on source and destination.
