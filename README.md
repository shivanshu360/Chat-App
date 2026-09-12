# 💬 Real-Time Chat Application (MERN + Socket.io)

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![React Version](https://img.shields.io/badge/react-19.0.0-blue.svg)](https://react.dev/)
[![Socket.io](https://img.shields.io/badge/socket.io-4.8.3-black.svg)](https://socket.io/)
[![MongoDB](https://img.shields.io/badge/database-MongoDB-green.svg)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)

> A feature-packed, production-ready **Real-Time Web Chat Application** built using the **MERN Stack** (MongoDB, Express.js, React 19, Node.js) and **Socket.io**. Features end-to-end real-time messaging, live user presence tracking, media attachment sharing via Cloudinary, rate-limiting & bot protection via Arcjet, automated welcome emails via Resend, and robust state management powered by Zustand.

---

## 🌟 Key Features

- **⚡ Real-Time Instant Messaging**: Low-latency bidirectional communication powered by Socket.io web sockets.
- **🟢 Live User Presence System**: Real-time online/offline user status broadcast to all connected clients.
- **🔐 Secure Authentication**: JWT (JSON Web Tokens) stored safely in `HTTP-Only` cookies to prevent XSS attacks, paired with `bcryptjs` password hashing.
- **🛡️ Enterprise Security & Rate Limiting**: Arcjet integration providing bot detection, rate limiting, and protection against common attack vectors.
- **🖼️ Image & Media Sharing**: Upload and send images seamlessly in chat threads with Cloudinary cloud storage integration.
- **👤 Dynamic Profile Management**: User avatar customization, bio updates, and profile configuration with live backend persistence.
- **📧 Automated Welcome Emails**: Instant transactional email notifications on new user registration powered by Resend.
- **🎨 Glassmorphism & Modern UI/UX**: Crafted with Tailwind CSS, DaisyUI, Lucide icons, responsive layout, smooth animated borders, and zero layout shifting across mobile & desktop displays.
- **⚡ Global State Management**: Centralized, decoupled state using Zustand for fast reactive updates without prop drilling.

---

## 🏗️ Tech Stack & Architecture

### **Frontend**
- **Framework**: React 19 (Vite build toolchain)
- **State Management**: Zustand
- **Styling & UI**: Tailwind CSS, DaisyUI, Lucide React Icons
- **Routing & Notifications**: React Router v8, React Hot Toast
- **Network & Sockets**: Axios, Socket.io-client

### **Backend**
- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js
- **Real-Time Engine**: Socket.io Server
- **Database & ODM**: MongoDB with Mongoose
- **Authentication**: JSON Web Token (`jsonwebtoken`), Cookie-Parser, `bcryptjs`

### **Third-Party Services & Cloud Infrastructure**
- **Cloudinary**: Cloud image media management & optimization
- **Arcjet**: Bot security, rate limiting, and shield protection
- **Resend**: Transactional email infrastructure

---

## 📐 System Architecture

```
                       +-----------------------+
                       |    React 19 Client    |
                       |  (Zustand + Tailwind) |
                       +-----------+-----------+
                                   |
                         HTTP      |     WebSockets
                     REST APIs     |    (Socket.io)
                                   v
                       +-----------+-----------+
                       |   Node.js / Express   |
                       |    Backend Server     |
                       +-----+-----+-----+-----+
                             |     |     |
            +----------------+     |     +------------------+
            |                      |                        |
            v                      v                        v
    +---------------+      +---------------+      +-------------------+
    |    MongoDB    |      |  Cloudinary   |      |  Arcjet & Resend  |
    | (Database ODM)|      | (Media Cloud) |      | (Security & Email)|
    +---------------+      +---------------+      +-------------------+
```

---

## 📡 API Reference

### 🔐 Auth Endpoints (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/api/auth/signup` | Register a new user account & send welcome email | ❌ |
| `POST` | `/api/auth/login` | Authenticate user & issue HTTP-Only JWT cookie | ❌ |
| `POST` | `/api/auth/logout` | Invalidate user session & clear cookies | ❌ |
| `GET`  | `/api/auth/check` | Verify current user session & return user profile | 🔑 |
| `PUT`  | `/api/auth/update-profile` | Update profile avatar via Cloudinary | 🔑 |

### 💬 Messaging Endpoints (`/api/messages`)

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET`  | `/api/messages/contacts` | Fetch all registered contacts for chat discovery | 🔑 |
| `GET`  | `/api/messages/chats` | Retrieve active conversation partner list | 🔑 |
| `GET`  | `/api/messages/:id` | Fetch chat message history with a specific user | 🔑 |
| `POST` | `/api/messages/send/:id` | Send a text or image message & emit socket event | 🔑 |

---

## 🛠️ Environment Variables

Create a `.env` file inside the `backend/` directory with the following configuration:

```env
# Server Configuration
PORT=5001
NODE_ENV=development
CLIENT_URL=http://localhost:5173

# Database & Auth
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key

# Cloudinary Setup
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Arcjet Security
ARCJET_KEY=your_arcjet_api_key
ARCJET_ENV=development

# Resend Email Integration
RESEND_API_KEY=your_resend_api_key
EMAIL_FROM=your_verified_sender_email
```

---

## ⚡ Quick Start & Installation

### Prerequisites
- **Node.js**: `>= 20.0.0`
- **npm**: `>= 10.0.0`
- **MongoDB**: Local instance or MongoDB Atlas cluster

### 1. Clone the Repository
```bash
git clone https://github.com/shivanshu360/Chat-App.git
cd Chat-App
```

### 2. Install Dependencies
Install dependencies for both root, backend, and frontend:
```bash
npm run build
```
*Or manually:*
```bash
# Backend dependencies
cd backend && npm install

# Frontend dependencies
cd ../frontend && npm install
```

### 3. Run in Development Mode
To start the backend server with live reload:
```bash
cd backend
npm run dev
```

To start the Vite frontend dev server:
```bash
cd frontend
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build & Run for Production
```bash
# From root directory
npm run build
npm start
```
The application will build the Vite frontend assets and serve them directly via Express on `http://localhost:5001`.

---

## 📁 Project Directory Structure

```
Chat-App/
├── backend/
│   ├── src/
│   │   ├── controllers/         # Request handling logic (auth, messages)
│   │   ├── emails/              # Resend email templates & handlers
│   │   ├── lib/                 # DB connection, Socket.io init, Env specs
│   │   ├── middleware/          # JWT Auth, Socket Auth & Arcjet Security
│   │   ├── models/              # Mongoose schemas (User, Message)
│   │   ├── routes/              # Express route definitions
│   │   └── server.js            # Express app entry point
│   ├── .env                     # Backend environment variables
│   └── package.json
├── frontend/
│   ├── public/                  # Static assets & illustrations
│   ├── src/
│   │   ├── components/          # Reusable UI elements & skeletons
│   │   ├── hooks/               # Custom React hooks
│   │   ├── lib/                 # Axios & helper utilities
│   │   ├── pages/               # Page views (ChatPage, LoginPage, SignUpPage)
│   │   ├── store/               # Zustand global state (useAuthStore, useChatStore)
│   │   ├── App.jsx              # App component & routing
│   │   ├── index.css            # Tailwind & custom CSS utility layers
│   │   └── main.jsx             # React DOM entry point
│   ├── package.json
│   └── vite.config.js
├── package.json                 # Monorepo build & start scripts
└── README.md
```

---

## 🧠 Key Technical Challenges Solved (Placement / Interview Q&A)

1. **Socket Handshake Authentication**:
   - *Challenge*: Protecting WebSockets against unauthorized connections without transmitting raw tokens in plaintext URL parameters.
   - *Solution*: Implemented custom `socketAuthMiddleware` that parses HTTP cookies on the WebSocket initial HTTP handshake, validates the JWT, and attaches the authenticated user payload to the socket instance.

2. **Real-Time Presence Tracking**:
   - *Challenge*: Keeping track of connected users across page refreshes and socket reconnects.
   - *Solution*: Implemented an in-memory socket map (`userSocketMap`) mapping `userId` to active `socket.id`, emitting live `getOnlineUsers` updates to all clients on connection/disconnection events.

3. **Optimized Layout & Zero Layout Shift**:
   - *Challenge*: Content overflow and vertical clipping on smaller screen viewports during login/signup switches.
   - *Solution*: Architected a flexible flexbox layout using `my-auto` centering, responsive Tailwind sizing utilities, and standard container bounds ensuring zero layout shift and 0 scrollbar clutter across displays.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!  
Feel free to check out the [Issues Page](https://github.com/shivanshu360/Chat-App/issues).

---

## 📜 License

This project is licensed under the **ISC License**.

---

⭐ **If you found this project helpful for your placements or learning, give it a star on GitHub!**
