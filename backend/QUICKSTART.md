# 🚀 Quick Start Guide

## Local Development Setup

### Prerequisites
- Node.js 18+ installed
- PostgreSQL 12+ installed
- Git

### Step 1: Install PostgreSQL (if not installed)

**Windows:**
```bash
# Using Chocolatey
choco install postgresql

# Or download from: https://www.postgresql.org/download/windows/
```

**Mac:**
```bash
brew install postgresql
brew services start postgresql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Step 2: Create Database

```bash
# Login to PostgreSQL (Windows/Linux)
psql -U postgres

# Create database
CREATE DATABASE healthvault;

# Exit
\q
```

Or simply:
```bash
createdb healthvault
```

### Step 3: Setup Project

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your PostgreSQL connection
# DATABASE_URL=postgresql://postgres:password@localhost:5432/healthvault
```

### Step 4: Initialize Database

```bash
npm run init-db
```

You should see:
```
✅ Tables created successfully!
✅ Sample data inserted!
🎉 Database initialization complete!
```

### Step 5: Start Development Server

```bash
npm run dev
```

Server will start on http://localhost:3000

### Step 6: Test API

Open browser or use curl:
```bash
curl http://localhost:3000/api/health
```

## 🌐 Deploy to Render (Free)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Migrate to PostgreSQL"
git push origin main
```

### Step 2: Create Render Account
- Go to https://render.com
- Sign up (free)

### Step 3: Create PostgreSQL Database

1. Click "New +" → "PostgreSQL"
2. Fill in:
   - Name: `healthvault-db`
   - Database: `healthvault`
   - Region: Choose closest
   - Plan: **Free**
3. Click "Create Database"
4. **Copy Internal Database URL** (starts with `postgresql://`)

### Step 4: Create Web Service

1. Click "New +" → "Web Service"
2. Connect your GitHub repo
3. Fill in:
   - Name: `healthvault-api`
   - Region: Same as database
   - Root Directory: `backend`
   - Runtime: **Node**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: **Free**

### Step 5: Set Environment Variables

Add these in Render dashboard:
```
NODE_ENV=production
DATABASE_URL=[Paste Internal Database URL from Step 3]
JWT_SECRET=your_super_secret_key_change_this_123456
UPLOAD_PATH=./uploads
```

### Step 6: Deploy

Click "Create Web Service" and wait for deployment (2-3 minutes)

### Step 7: Initialize Database

1. Go to your web service
2. Click "Shell" tab
3. Run: `npm run init-db`

### Step 8: Test Deployment

Your API will be at: `https://healthvault-api.onrender.com`

Test: `https://healthvault-api.onrender.com/api/health`

## 📱 Update Frontend

Replace all `http://localhost:3000` in frontend files with:
```
https://healthvault-api.onrender.com
```

## 🧪 Test Credentials

**Patient:**
- Health ID: `HV123456789`
- Password: `patient123`

**Hospital:**
- Hospital ID: `HOSP12345`
- Password: `hospital123`

**Doctor:**
- Doctor ID: `DOC999`
- Password: `doctor123`

## ⚡ Quick Commands

```bash
# Install dependencies
npm install

# Initialize database
npm run init-db

# Development server (with auto-reload)
npm run dev

# Production server
npm start
```

## 🐛 Common Issues

### Issue: "connect ECONNREFUSED"
**Solution:** PostgreSQL is not running
```bash
# Windows
net start postgresql-x64-14

# Mac
brew services start postgresql

# Linux
sudo systemctl start postgresql
```

### Issue: "database does not exist"
**Solution:** Create the database
```bash
createdb healthvault
```

### Issue: "password authentication failed"
**Solution:** Update DATABASE_URL in .env with correct credentials
```
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/healthvault
```

### Issue: Tables not created
**Solution:** Run init script
```bash
npm run init-db
```

## 📚 API Endpoints

### Health Check
```http
GET /api/health
```

### Authentication
```http
POST /api/auth/patient/login
POST /api/auth/hospital/login
POST /api/auth/doctor/login
```

### Patients
```http
GET    /api/patients/:healthId
PUT    /api/patients/:healthId
GET    /api/patients/:healthId/conditions
POST   /api/patients/:healthId/conditions
DELETE /api/patients/:healthId/conditions/:id
GET    /api/patients/:healthId/allergies
POST   /api/patients/:healthId/allergies
DELETE /api/patients/:healthId/allergies/:id
```

### Reports
```http
GET    /api/reports/patient/:healthId
POST   /api/reports (with file upload)
PUT    /api/reports/:reportId
DELETE /api/reports/:reportId
```

### Hospitals
```http
GET /api/hospitals
GET /api/hospitals/:hospitalId
```

## 🎯 Next Steps

1. ✅ Setup local development
2. ✅ Test API locally
3. ✅ Deploy to Render
4. ✅ Update frontend with API URL
5. ✅ Test deployed application
6. 🎉 Launch your app!

## 💡 Tips

- **Free Tier**: Render free tier spins down after 15 min of inactivity
- **First Request**: May take 30-60 seconds after spin-down
- **Database**: 1GB storage on free tier
- **Logs**: Check Render dashboard for errors
- **Files**: Uploaded files are ephemeral on free tier

## 🆘 Need Help?

- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed guide
- Check [README.md](./README.md) for full API documentation
- Check [MIGRATION-SUMMARY.md](./MIGRATION-SUMMARY.md) for technical details

Happy Coding! 🚀
