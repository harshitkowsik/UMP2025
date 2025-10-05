# Bridge Between Investors and Business People

## Overview

This MERN stack application bridges the gap between investors and businesses seeking funding. It connects diverse users, including general users, business owners, investors, bankers, and business advisors with tailored dashboards and workflows.

## Features

- User Roles: General User, Business, Investor, Banker, Advisor
- Business users can post and manage business ideas and queries
- Investors can post investment proposals and view business ideas
- Bankers post loan details and financial advice, manage queries from businesses
- Advisors provide solutions to business queries, facilitate decision making
- Role-based dashboards and authentication 
- Real-time query and solution interaction

## Tech Stack

- Frontend: React, Bootstrap 5, Bootswatch Morph theme
- Backend: Express.js, Node.js
- Database: MongoDB with Mongoose ODM
- Authentication: JWT
- Deployment: TBD

## Setup

1. Clone the repository:
`git clone <repo-url>`
`cd <repo-folder>`

2. Backend:
- Install dependencies:
  ```
  npm install
  ```
- Setup `.env` file with your environment variables (MongoDB URI, JWT secret)
- Run backend server:
  ```
  npm start
  ```

3. Frontend:
- Navigate to client folder:
  ```
  cd client
  ```
- Install dependencies:
  ```
  npm install
  ```
- Start React development server:
  ```
  npm start
  ```

## Future Enhancements

- OTP verification and password reset flows
- Deployment scripts with environment-based configs
- Real-time updates via WebSockets
- Enhanced analytics and reporting


