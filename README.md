
# Node.js Authentication with Express and MongoDB

This project demonstrates user authentication using Node.js, Express, and MongoDB. The application includes features like user registration, login, and secure access to protected routes. 

## Table of Contents
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/shamel-rai/Authentication-learning
   cd your-repo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the root directory and add your environment variables. Example:

   ```env
   PORT=5000
   MONGO_URI= 
   JWT_SECRET=


## Usage

1. Run the application:

   ```bash
   npm start
   ```

2. The server will start on `http://localhost:4000` (or your configured port).

## Features

- User Registration: Users can create an account.
- User Login: Authenticates users using JWT tokens.
- Protected Routes: Access to specific routes requires authentication.
- Password Encryption: Uses bcrypt to hash user passwords.

## Folder Structure

```
project-root
│
├── config
│   └── config.js          # Configuration for environment variables
│
├── models
│   └── User.js            # Mongoose schema for user
│
├── routes
│   └── authRoutes.js      # Routes for authentication (register, login, etc.)
│
├── middleware
│   └── authMiddleware.js  # Middleware for protecting routes
│
├── controllers
│   └── authController.js  # Authentication logic
│
├── .env                   # Environment variables
├── server.js              # Main entry point
└── README.md              # Project documentation
```

## Technologies Used

- **Node.js**: JavaScript runtime for the backend.
- **Express**: Framework for building web applications.
- **MongoDB**: NoSQL database for storing user data.
- **Mongoose**: ODM for MongoDB to interact with the database.
- **JWT (JSON Web Tokens)**: For secure authentication and authorization.
- **bcrypt**: For password hashing.

## Contributing

Feel free to contribute to this project by submitting pull requests or suggesting new features. 
