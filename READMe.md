# Auth Blog API 🔐

A production-ready RESTful Blog API built with Node.js, Express, and MongoDB, featuring JWT authentication with refresh tokens, input validation, pagination, and structured middleware architecture.

🌍 **Live API:** https://auth-blog-api-4pow.onrender.com

---

## 🧠 Overview

This project demonstrates real-world backend development practices, including secure authentication, protected routes, database relationships, and scalable API design.

The API allows authenticated users to create, read, update, delete, and search blog posts, with pagination support and token-based access control.

---

## 🛠 Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- JSON Web Token (JWT)
- Joi (Input Validation)
- bcrypt
- dotenv
- Multer
- Cloudinary
- Hosted on Render

---

## ✨ Features

- User registration and login
- Password hashing with bcrypt
- JWT-based authentication
  - Access tokens
  - Refresh tokens
- Protected routes via authentication middleware
- Blog post CRUD operations
- Pagination for fetching posts
- Keyword-based full-text search
- MongoDB document population
- Joi-based request validation
- Request logging middleware
- Centralized error handling
- Modular and maintainable architecture
- Image upload support using Multer and Cloudinary
- Optional profile picture during user signup

---

## 📂 Project Structure

```
auth-blog-api/
├── src/
│    ├── config/
│    │   ├── cloudinary.js
│    │   ├── config.js
│    │   └── connectDb.js
│    ├── controllers/
│    │   ├── postController.js
│    │   └── userController.js
│    ├── middleware/
│    │   ├── errorHandler.js
│    │   ├── reqLogger.js
│    │   ├── requireAuth.js
│    │   └── upload.js
│    ├── models/
│    │   ├── postModel.js
│    │   └── userModel.js
│    ├── routes/
│    │   ├── postRoutes.js
│    │   └── userRoutes.js
│    ├── utils/
│    │   ├── bcrypt.js
│    │   └── jwt.js
│    ├── validations/
│    │   ├── postValidation.js
│    │   └── userValidation.js
│    └── app.js
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
└── server.js
```

---

## 🔐 Authentication Flow

1. User signs up → password is hashed before storage.
2. User logs in → credentials validated.
3. Server issues:
   - **Access Token** (short-lived)
   - **Refresh Token** (long-lived)
4. Protected routes require the access token in the header:

```
Authorization: Bearer <access_token>
```

5. Refresh token endpoint issues a new access token when expired.

---

## 📌 API Endpoints

### Authentication

POST `/api/auth/signup`  
POST `/api/auth/login`  
POST `/api/auth/refresh-token`

---

### Blog Posts (Protected)

POST `/api/articles`  
GET `/api/articles`  
GET `/api/articles/:id`  
PUT `/api/articles/:id`  
DELETE `/api/articles/:id`

---

### Search & Pagination

GET `/api/articles/search?q=keyword`  

GET `/api/articles?page=1&limit=10`

- Pagination uses `page` and `limit` query parameters
- Results are sorted by creation date
- Author details are populated in responses

---

## ⚙ Environment Variables

Create a `.env` file with the following:

```
PORT=5008
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_access_token_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API=your_cloud_api_key
CLOUDINARY_SECRET=your_cloud_api_secret
```

---

## 📖 API Documentation

Postman Documentation: [View Collection](https://documenter.getpostman.com/view/50145243/2sBXcEkg8w)

---

## 🔮 Future Improvements

- Role-based access control
- Token blacklisting
- API rate limiting
- Automated testing
- Advanced logging and monitoring