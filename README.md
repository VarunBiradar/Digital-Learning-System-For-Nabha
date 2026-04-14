# Digital Learning Platform (EcoLearn)

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=json-web-tokens&logoColor=white)

A comprehensive, dynamic E-Learning platform designed specifically for Computer Science and Engineering (CSE) students. Built to transition from traditional static content to a dynamic, interactive full-stack web application that organizes curriculum by semesters.

## 🚀 Features

- **Specialized Curriculum**: Semester-wise structured repository specifically tailored for engineering and computer science students.
- **Secure Access**: Robust stateless authentication using JSON Web Tokens (JWT) and BCrypt for password hashing.
- **Progress Tracking**: Real-time analytical graphical results for user progression and learning metrics, powered by Chart.js.
- **Premium UI/UX**: An engaging, modern "Glassmorphism" aesthetic built with pure Vanilla CSS and React, creating a visually rich learning environment.
- **Dynamic Content**: Comprehensive Role-based dashboard (e.g., student and teacher boards) with scalable Mongoose models for Users, Lessons, and Announcements.
- **Blazing Fast**: Engineered as a Single Page Application (SPA) using React and Vite, supported by a specialized RESTful API backend.

## 🛠️ Technology Stack

### Frontend (Client)
- **React.js** (Bootstrapped with Vite)
- **Vanilla CSS** (Glassmorphism design)
- **Chart.js** (Data visualization)
- **Axios** (API communication)
- **React Router** (Navigation)

### Backend (Server)
- **Node.js & Express.js** (REST API)
- **MongoDB** (NoSQL Database)
- **Mongoose** (Object Data Modeling)
- **JSON Web Tokens (JWT)** (Authentication) 

## 📁 Project Structure

```text
Digital-Learning-Platform/
├── client/           # React + Vite frontend application
├── server/           # Node.js + Express backend API
└── project_report.md # Comprehensive project synopsis and report
```

## ⚙️ Local Development Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (Local server or MongoDB Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/Digital-Learning-System-For-Nabha.git
cd Digital-Learning-System-For-Nabha
```

### 2. Backend Setup (`server`)
Navigate to the `server` directory and install dependencies:
```bash
cd server
npm install
```
Configure your environment variables by creating a `.env` file in the `server` folder:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```
Start the backend development server:
```bash
npm run dev
```

### 3. Frontend Setup (`client`)
Open a new terminal, navigate to the `client` directory, and install dependencies:
```bash
cd client
npm install
```
Start the frontend Vite development server:
```bash
npm run dev
```

## 🚀 Uploading to GitHub

If you haven't uploaded this project to GitHub yet, follow these terminal commands from the root directory (`d:\8th`):

1. **Initialize Git**:
   ```bash
   git init
   ```
2. **Add all files**:
   ```bash
   git add .
   ```
3. **Commit your changes**:
   ```bash
   git commit -m "Initial commit: Digital Learning Platform MERN stack"
   ```
4. **Connect to your repository and push**:
   ```bash
   git branch -M main
   git remote add origin https://github.com/VarunBiradar/Digital-Learning-System-For-Nabha.git
   git push -u origin main
   ```

## 📝 License

This project is open-source and available under the MIT License.
