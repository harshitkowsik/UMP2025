# Digital E-Gram Panchayat

A full-stack MERN web application to streamline Gram Panchayat service requests, document management, and staff/admin workflows.

## Features

- **User Dashboard:** Apply for village services, track request status, view certificates.
- **Staff Panel:** View profile, manage all applications and update status, browse services.
- **Admin Panel:** Add/edit services, manage applications, onboard staff users.
- **Dynamic Service Forms:** Services have custom required fields.
- **Blinking Application Status:** Pending, Approved, and Rejected with visual status cues.
- **Secure Document Storage:** For certificates and uploads (future enhancement).
- **Role-Based Access:** Separate flows for users, staff, and admin.

## Tech Stack

- **Frontend:** React, Axios, Bootswatch, custom CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT Auth
- **Other Tools:** VS Code, GitHub, React Developer Tools

## Getting Started

### Prerequisites

- Node.js v14+
- npm or yarn
- MongoDB (local/cloud)

### Setup

1. **Clone the repository:**

2. **Configure environment:**
- Create `.env` files in both `/backend` and `/frontend` as needed.

3. **Install dependencies:**
- Backend:  
  ```
  cd backend
  npm install
  ```
- Frontend:  
  ```
  cd frontend
  npm install
  ```
4. **Start backend server:**
`npm start`

5. **Start frontend dev server:**
`npm start`

Frontend will be available at `http://localhost:3000`, backend at `http://localhost:5000`.

## Future Enhancements

- OTP user verification
- Forgot password flow
- Certificate/document upload and sharing
- Improved analytics for admins
