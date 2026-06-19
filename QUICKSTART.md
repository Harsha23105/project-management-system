# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1️⃣ Local Development with Docker (Easiest)

**Prerequisites:** Docker Desktop installed

```bash
# Start all services
docker-compose up

# Open in browser
Frontend: http://localhost:5173
Backend:  http://localhost:5000
API Docs: http://localhost:5000/api/docs

# Stop services
docker-compose down
```

---

### 2️⃣ Manual Setup (No Docker)

#### Backend
```bash
cd backend
npm install
npm run dev
```

#### Frontend (in new terminal)
```bash
cd frontend
npm install
npm run dev
```

#### Database
```bash
# Install MySQL locally if not done
# Create database by running:
mysql -u root -p < database/schema.sql

# Or use the init script:
node scripts/init-db.js
```

---

### 3️⃣ Environment Variables

Copy `.env.local` to `.env`:
```bash
copy .env.local .env
```

Update with your values:
```env
DB_HOST=localhost        # or your MySQL host
DB_PORT=3306
DB_USER=root
DB_PASSWORD=pms_root_password
JWT_SECRET=your_secret
```

---

### 4️⃣ Verify Setup

- ✅ Frontend loads: http://localhost:5173
- ✅ Backend health: http://localhost:5000/health
- ✅ API docs: http://localhost:5000/api/docs
- ✅ Database connected (check console logs)

---

## 📦 Deployment Checklist

### Option A: Full Cloud Deployment (Recommended)

1. **Database:** PlanetScale (MySQL cloud)
   - Sign up: [planetscale.com](https://planetscale.com)
   - Create database
   - Run schema from console
   - Get connection string

2. **Backend:** Railway or Render
   - Connect GitHub repo
   - Add MySQL service
   - Add environment variables
   - Deploy

3. **Frontend:** Netlify
   - Connect GitHub repo
   - Set build: `npm run build` (in frontend folder)
   - Deploy
   - Add VITE_API_URL to env vars

### Option B: Docker Everything

```bash
docker-compose up --build
```

---

## 🔗 Useful Links

| Service | URL |
|---------|-----|
| Frontend Dev | http://localhost:5173 |
| Backend API | http://localhost:5000 |
| API Documentation | http://localhost:5000/api/docs |
| Health Check | http://localhost:5000/health |

---

## 🆘 Troubleshooting

### Port already in use
```bash
# Kill process on port 5000 (backend)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Kill process on port 3306 (MySQL)
netstat -ano | findstr :3306
taskkill /PID <PID> /F
```

### Database connection failed
```bash
# Test connection
mysql -h localhost -u root -ppms_root_password

# Check schema
mysql -u root -ppms_root_password project_management -e "SHOW TABLES;"
```

### Frontend can't reach backend
- Check backend is running: `curl http://localhost:5000/health`
- Check CORS_ORIGIN in backend .env
- Update `VITE_API_URL` in frontend `.env`

---

## 📖 Full Documentation

See `DEPLOYMENT_GUIDE.md` for:
- ✅ Complete PlanetScale setup
- ✅ Railway/Render deployment
- ✅ Netlify frontend deployment
- ✅ Production configuration
- ✅ Troubleshooting guide

---

## 💡 Quick Commands

```bash
# Run setup wizard
node scripts/setup.js

# Initialize database
node scripts/init-db.js

# Run tests (backend)
cd backend && npm test

# Build for production
cd frontend && npm run build
cd backend && npm install --production

# Start production server
cd backend && npm start
```

---

## ⚙️ System Requirements

- Node.js 18+ (or use Docker)
- MySQL 8.0+ (or PlanetScale)
- npm 9+
- Git
- Docker (optional, for local dev)

---

Need help? Check `DEPLOYMENT_GUIDE.md` for detailed instructions!
