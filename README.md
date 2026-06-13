# 🚀 SchemeSathi

> AI-Powered Multilingual Welfare Scheme Discovery Platform

SchemeSathi is an intelligent welfare assistance platform that helps citizens discover, understand, and access government welfare schemes through a multilingual AI chatbot, eligibility checker, and personalized recommendations.

Built for the **NSS Open Projects 2026 – AI & Intelligent Systems Track**, SchemeSathi bridges the awareness gap between citizens and government welfare programs using AI, multilingual support, and simplified eligibility assessment.

---

## 🌟 Problem Statement

Millions of citizens remain unaware of welfare schemes they are eligible for due to:

* Language barriers
* Complex eligibility criteria
* Lack of digital literacy
* Fragmented information sources
* Difficult application processes

SchemeSathi addresses these challenges through an accessible and intelligent digital assistant.

---

## ✨ Key Features

### 🤖 AI-Powered Scheme Assistant

* Conversational chatbot interface
* Context-aware scheme recommendations
* Multilingual responses
* Welfare-focused knowledge retrieval

### 📋 Eligibility Checker

* Guided questionnaire
* Personalized scheme matching
* Priority-based recommendations
* Benefit estimation

### 🔎 Scheme Explorer

* Search welfare schemes
* Filter by category and state
* View eligibility requirements
* Access official resources

### 🌍 Multilingual Support

* English
* Hindi
* Marathi
* Bengali
* Easily extensible to additional Indian languages

### 📊 Impact Dashboard

* User analytics
* Scheme popularity insights
* Awareness impact estimation
* Potential benefit projections

### 📄 Document Checklist Generator

* Scheme-specific document requirements
* Downloadable checklists
* Application preparation assistance

---

## 🏗️ System Architecture

Frontend (React + Vite)

⬇

Backend API (Node.js + Express)

⬇

Prisma ORM

⬇

PostgreSQL Database

⬇

AI Recommendation & RAG Engine

⬇

Gemini API

---

## 🛠️ Tech Stack

### Frontend

* React 19
* Vite
* TypeScript
* React Router
* React Query
* Tailwind CSS
* Recharts

### Backend

* Node.js
* Express.js
* TypeScript
* Prisma ORM
* JWT Authentication
* Zod Validation

### Database

* PostgreSQL
* Prisma

### AI & Intelligence

* Gemini API
* Retrieval-Augmented Generation (RAG)
* Multilingual Response Generation

### DevOps

* Docker
* Docker Compose
* Nginx
* GitHub

---

## 📁 Project Structure

```text
frontend/     React application
backend/      Express API server
prisma/       Database schema and migrations
docker/       Docker configuration
docs/         Project documentation
tests/        Automated testing
public/       Static assets
scripts/      Utility scripts
```

---

## 🚀 Quick Start

### 1. Clone Repository

```bash
git clone https://github.com/PrakharGola/Scheme-Sathi-Project.git
cd Scheme-Sathi-Project
```

### 2. Install Dependencies

```bash
npm run install:all
```

### 3. Configure Environment

Create:

```bash
backend/.env
```

Example:

```env
DATABASE_URL=postgres://schemesathi:schemesathi@localhost:5432/schemesathi
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:5173
GEMINI_API_KEY=your-gemini-api-key
```

### 4. Start PostgreSQL

Using Docker:

```bash
npm run docker:up
```

Or start PostgreSQL locally.

### 5. Generate Prisma Client

```bash
npm run prisma:generate
```

### 6. Run Database Migrations

```bash
npm run prisma:migrate
```

### 7. Seed Sample Data

```bash
npm run seed
```

### 8. Start Development Server

```bash
npm run dev
```

---

## 🌐 Application URLs

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:4000
```

Health Check:

```text
http://localhost:4000/api/health
```

---

## 📈 Core Modules

* Authentication & User Management
* Scheme Management System
* Eligibility Recommendation Engine
* AI Chat Assistant
* Analytics Dashboard
* Impact Projection Module
* Multilingual Translation Layer
* Document Checklist Generator

---

## 🔒 Security Features

* JWT Authentication
* Password Hashing (bcrypt)
* Input Validation
* API Rate Limiting
* Helmet Security Middleware
* Secure CORS Configuration
* Role-Based Access Control

---

## 🎯 Future Roadmap

* WhatsApp Integration
* Voice-Based Assistant
* IVR Support
* OCR Document Verification
* Mobile Application
* Government API Integrations
* Regional Language Expansion

---

## 👨‍💻 Team

Developed as part of the NSS Open Projects 2026 initiative.

Project Lead:
**Prakhar Gola**
**Prateek Kumar Patel**

---

## 📄 License

This project is developed for educational, research, and social-impact purposes.

---

## ❤️ Vision

Empowering every citizen with easy access to government welfare benefits through AI, multilingual communication, and inclusive digital technology.
