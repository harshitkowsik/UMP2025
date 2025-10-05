# Secure & Share Govt Document with Family Members (MERN Stack)

## Description
This is a full-stack MERN (MongoDB, Express, React, Node.js) web application that allows citizens to **securely store and share important government documents** such as marksheets, PAN cards, passports linked uniquely to Aadhaar numbers. Users can upload, manage, and share documents with family members while ensuring privacy, security, and easy accessibility.

## Key Features
- User registration and login with JWT authentication
- Upload, update, view, and delete documents linked to Aadhaar
- Share documents securely with registered family members by email
- Manage user profiles including profile picture upload
- Audit and logging with Winston for critical backend actions
- Clean and modular codebase following best practices
- Responsive UI with React.js and Bootswatch themes 

## Technologies Used
- **Frontend:** React.js, Bootstrap, Bootswatch (Pulse themes)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **File Upload:** Multer (local storage)
- **Logging:** Winston
- **Deployment:** Node.js and React app (see instructions below)

## Application Features
- Secure user signup with strong password hashing and validation
- JWT-based authentication and authorization for API security
- Document upload and management linked to user Aadhaar number
- Share specific documents with other users securely by email
- Profile page with updatable personal info and profile picture
- Action logging for uploads, shares, updates, and deletions

---

## Usage

1. Clone repository and install dependencies for server and client.
2. Setup environment variables (`.env`) with MongoDB URI, JWT secret, etc.
3. Run backend server with `npm run dev` or `node app.js`.
4. Run React frontend with `npm start`.
5. Register a new user and log in.
6. Upload Aadhaar-linked documents securely.
7. Manage documents (edit, delete) or share with family members via email.
8. Update profile info and upload profile picture.

---

## Future Enhancements

### OTP-Based Verification
- Add OTP (One-Time Password) verification via email or SMS to enhance registration security.
- Implement OTP for two-factor authentication (2FA) during login for improved account safety.

### Forgot Password with OTP Verification
- Integrate OTP sent to the user’s registered email or phone for secure password reset flow.
- Ensure token expiry and rate limiting for password reset requests.

### Deployment Guide
- Provide detailed instructions on deploying both frontend and backend on popular platforms:
  - Frontend deployment on Vercel, Netlify, or similar
  - Backend deployment on Heroku, AWS EC2/DigitalOcean, or Azure
- Include environment config, SSL setup, domain mapping, and scaling considerations.

