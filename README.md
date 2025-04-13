# 🧑‍💻 Social Media App – React Coding Challenge

This is a fully functional social media web application built as part of a coding challenge using **React JS**. The app showcases essential features such as authentication, routing, CRUD operations, pagination, state management using Context API, and a responsive UI/UX experience. Local storage and `json-server` are used to simulate backend APIs.

---
# Install Dependencies
npm install

# Start the React Application
npm start
App will run at: http://localhost:3000

# Install json-server (if not already installed)
npm install -g json-server

# Run JSON Server
npx json-server Database/db.json --watch --port 1000
API will be available at: http://localhost:1000

## 🚀 Objective

Build a frontend social media platform demonstrating core concepts in:

- 🔒 Authentication & Authorization  
- 🔁 Routing & Protected Routes  
- 📄 CRUD Functionality (Posts, Comments, Profiles)  
- 🧠 State Management (Local Storage)  
- 📑 Pagination  
- 📱 Responsive UI/UX Design

---

## 🧩 Features

- **User Authentication** with email/password (mocked)
- **Protected Routes** for feed, profile, and post creation
- **Create, Read, Update, Delete (CRUD)** for:
  - Posts with text & images
  - Comments 
  - Profile and profile pictures
- **Pagination** (e.g., 10 posts per page)
- **Authorization Checks** to ensure users only edit/delete their own content
- **State Persistence**   localStorage

---

## 🛠 Tech Stack

- **React JS**
- **React Router DOM** (routing & protected routes)
- **Context API** (state management)
- **json-server** (mock backend with `db.json`)
- **Styled Components** for styling
- **Local Storage** for persistence

---
