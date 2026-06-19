# Complete Deployment Guide

## Table of Contents
1. [Local MySQL Setup](#local-mysql-setup)
2. [PlanetScale Setup (Free Cloud MySQL)](#planetscale-setup)
3. [Netlify Frontend Deployment](#netlify-frontend-deployment)
4. [Backend Deployment (Railway/Render)](#backend-deployment)

---

## Local MySQL Setup

### Option A: Docker Compose (Recommended for Local Dev)

#### Prerequisites
- Docker Desktop installed ([Download](https://www.docker.com/products/docker-desktop))

#### Steps

1. **Copy environment file:**
```bash
copy .env.local .env
```

2. **Start MySQL with Docker Compose:**
```bash
docker-compose up mysql
```

3. **Verify connection:**
```bash
docker-compose exec mysql mysql -uroot -ppms_root_password -e "SHOW DATABASES;"
```

4. **The database will auto-initialize** from `database/schema.sql`

5. **Stop MySQL:**
```bash
docker-compose down
```

---

### Option B: Manual MySQL Installation (Windows)

1. **Download MySQL** from [mysql.com](https://dev.mysql.com/downloads/mysql/)
2. **Run installer** and set:
   - Root password: `pms_root_password` (or your choice)
   - Port: `3306`
3. **Create database:**
```bash
mysql -u root -p
```
Then paste contents of `database/schema.sql`

---

## PlanetScale Setup (Free Cloud MySQL)

### Why PlanetScale?
- ✅ MySQL 8.0 compatible
- ✅ Free tier: 5GB storage
- ✅ No credit card required for free tier
- ✅ Perfect for deployment

### Steps

#### 1. Create PlanetScale Account
- Go to [planetscale.com](https://planetscale.com)
- Sign up (free tier available)
- Create organization

#### 2. Create Database
- Click **"New database"**
- Name: `project_management`
- Region: Choose closest to your users
- Click **"Create database"**

#### 3. Initialize Schema
- Go to your database **"Console"** tab
- Paste entire contents of `database/schema.sql`
- Execute

#### 4. Get Connection String
- Go to **"Connect"** tab
- Select **"Node.js"** driver
- Copy the connection string

#### 5. Update .env
```env
DB_HOST=aws.connect.psdb.cloud  # from connection string
DB_USER=username                # from connection string
DB_PASSWORD=password            # from connection string
DB_NAME=project_management
DB_PORT=3306
```

#### 6. Test Connection
```bash
npm install
node -e "require('./config/database')"
```

---

## Netlify Frontend Deployment

### Prerequisites
- GitHub account
- Netlify account (free)

### Steps

#### 1. Build Frontend Locally
```bash
cd frontend
npm install
npm run build
```

#### 2. Prepare for Deployment
Create `netlify.toml` in root directory:

```toml
[build]
  command = "cd frontend && npm run build"
  publish = "frontend/dist"

[build.environment]
  VITE_API_URL = "https://your-backend-url.com"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### 3. Deploy to Netlify

**Method A: Using Netlify CLI**
```bash
npm install -g netlify-cli
netlify login
cd frontend
netlify deploy --prod
```

**Method B: GitHub Integration (Recommended)**
1. Push code to GitHub
2. Log in to [netlify.com](https://app.netlify.com)
3. Click **"New site from Git"**
4. Connect GitHub repo
5. Set build command: `cd frontend && npm run build`
6. Set publish directory: `frontend/dist`
7. Click **"Deploy"**

#### 4. Update Environment Variables
- Go to Netlify **Site settings → Environment**
- Add: `VITE_API_URL=https://your-backend-url.com`
- Trigger redeploy

---

## Backend Deployment

### Option A: Railway (Recommended)

#### 1. Prepare Backend
```bash
cd backend
npm install
```

#### 2. Create Railway Account
- Go to [railway.app](https://railway.app)
- Sign up with GitHub

#### 3. Create New Project
- Click **"New Project"**
- Select **"Deploy from GitHub"**
- Connect your GitHub repo

#### 4. Add MySQL Service
- Click **"Add"**
- Select **"MySQL"**
- Railway will set `DB_HOST`, `DB_USER`, `DB_PASSWORD` automatically

#### 5. Configure Environment Variables
Go to **Variables** tab and add:
```env
NODE_ENV=production
PORT=5000
JWT_SECRET=generate_strong_random_string
CORS_ORIGIN=https://your-netlify-frontend.netlify.app
```

#### 6. Deploy
- Push to GitHub
- Railway auto-deploys

#### 7. Get Backend URL
- Go to **"Settings"**
- Copy public URL (e.g., `https://pms-backend-prod.up.railway.app`)

---

### Option B: Render

#### 1. Create Render Account
- Go to [render.com](https://render.com)
- Sign up

#### 2. Create Web Service
- Click **"New +"**
- Select **"Web Service"**
- Connect GitHub repo

#### 3. Configure Service
- **Name:** `pms-backend`
- **Environment:** `Node`
- **Build command:** `npm install`
- **Start command:** `node server.js`
- **Instance type:** Free (or paid)

#### 4. Add Environment Variables
```env
NODE_ENV=production
PORT=5000
JWT_SECRET=generate_strong_random_string
CORS_ORIGIN=https://your-netlify-frontend.netlify.app
```

#### 5. Add MySQL Database
- Go to **"Databases"**
- Click **"New PostgreSQL"** (or use external MySQL like PlanetScale)
- For PlanetScale, add connection string in environment variables

#### 6. Deploy
Push to GitHub → Render auto-deploys

---

## Final Checklist

- [ ] MySQL database created (local or PlanetScale)
- [ ] `.env` file configured with database credentials
- [ ] Backend deployed (Railway/Render)
- [ ] Backend URL copied
- [ ] Frontend `netlify.toml` created with backend URL
- [ ] Frontend deployed to Netlify
- [ ] CORS_ORIGIN updated in backend .env
- [ ] Test backend health: `curl https://your-backend-url.com/health`
- [ ] Test frontend → API connection

---

## Quick Start Commands

### Local Development (All Services)
```bash
docker-compose up
# Frontend: http://localhost:5173
# Backend API: http://localhost:5000
# API Docs: http://localhost:5000/api/docs
```

### Production Deployment Summary
```
Frontend → Netlify
Backend → Railway/Render
Database → PlanetScale
```

---

## Troubleshooting

### "Database connection failed"
- Verify `DB_HOST`, `DB_USER`, `DB_PASSWORD` in `.env`
- Test: `mysql -h $DB_HOST -u $DB_USER -p$DB_PASSWORD`

### "CORS error in browser"
- Update `CORS_ORIGIN` in backend `.env` to match frontend URL
- Restart backend

### "Frontend API calls timeout"
- Verify backend is running
- Check `VITE_API_URL` in frontend matches backend URL
- Check network connectivity

---

## Additional Resources
- [PlanetScale Docs](https://planetscale.com/docs)
- [Railway Docs](https://docs.railway.app)
- [Render Docs](https://render.com/docs)
- [Netlify Docs](https://docs.netlify.com)
