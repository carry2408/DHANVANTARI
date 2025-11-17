# HealthVault Backend - PostgreSQL Migration

## 🚀 Migration Complete!

Your backend has been successfully migrated from SQLite (better-sqlite3) to PostgreSQL!

### Changes Made:

1. **Package.json**: Replaced `better-sqlite3` with `pg` (node-postgres)
2. **database.js**: Updated to use PostgreSQL connection pool
3. **init-database.js**: Converted to use async/await with PostgreSQL
4. **All Routes**: Updated to use async/await with PostgreSQL queries
   - auth.js
   - patients.js
   - hospitals.js
   - reports.js

### 📋 Deployment Guide for Render

#### Step 1: Create PostgreSQL Database on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "PostgreSQL"
3. Fill in:
   - Name: `healthvault-db`
   - Database: `healthvault`
   - User: (auto-generated)
   - Region: Choose closest to you
   - Plan: Free
4. Click "Create Database"
5. Copy the **Internal Database URL** (starts with `postgresql://`)

#### Step 2: Deploy Backend on Render

1. Go to Render Dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository or use "Public Git repository"
4. Fill in:
   - Name: `healthvault-api`
   - Region: Same as database
   - Branch: `main`
   - Root Directory: `backend`
   - Runtime: Node
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Plan: Free

5. Add Environment Variables:
   ```
   NODE_ENV=production
   DATABASE_URL=[Paste the Internal Database URL from Step 1]
   JWT_SECRET=your_super_secret_jwt_key_12345
   UPLOAD_PATH=./uploads
   ```

6. Click "Create Web Service"

#### Step 3: Initialize Database

After deployment, run the database initialization:

1. Go to your Render web service
2. Click "Shell" tab
3. Run: `npm run init-db`

This will create all tables and insert sample data.

### 🧪 Testing Your Deployment

1. Your API will be available at: `https://healthvault-api.onrender.com`
2. Test the health endpoint:
   ```
   GET https://healthvault-api.onrender.com/api/health
   ```

### 📱 Update Frontend

Update your frontend files to use the new API URL:

Replace `http://localhost:3000` with `https://healthvault-api.onrender.com`

### Sample Credentials

**Patient Login:**
- Health ID: `HV123456789`
- Password: `patient123`

**Hospital Login:**
- Hospital ID: `HOSP12345`
- Password: `hospital123`

**Doctor Login:**
- Doctor ID: `DOC999`
- Password: `doctor123`

### 🔧 Local Development

1. Install PostgreSQL locally
2. Create database: `createdb healthvault`
3. Copy `.env.example` to `.env`
4. Update `DATABASE_URL` in `.env`:
   ```
   DATABASE_URL=postgresql://localhost:5432/healthvault
   ```
5. Install dependencies: `npm install`
6. Initialize database: `npm run init-db`
7. Start server: `npm run dev`

### Important Notes

- **Free Tier Limitations**: 
  - Database: 1GB storage, 90 days of inactivity before deletion
  - Web Service: Spins down after 15 minutes of inactivity
  - First request after spin-down may take 30-60 seconds

- **File Uploads**: On Render free tier, uploaded files are ephemeral (deleted on restart). Consider using:
  - Cloudinary
  - AWS S3
  - Render Disk (paid)

### 🐛 Troubleshooting

**Database connection error:**
- Ensure DATABASE_URL is correct
- Check if database is in the same region as web service
- Use Internal Database URL, not External

**Tables not created:**
- Run `npm run init-db` from Render Shell

**CORS errors:**
- CORS is enabled for all origins in the code
- For production, update the CORS configuration in server.js

### Need Help?

Check Render logs for detailed error messages:
- Go to your web service
- Click "Logs" tab
