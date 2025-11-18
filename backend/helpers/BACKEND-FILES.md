# HealthVault ID - Complete Backend Files

## 📦 File 1: package.json

Create `backend/package.json`:

```json
{
  "name": "healthvault-backend",
  "version": "1.0.0",
  "description": "Backend API for HealthVault ID - Personal Health Record System",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "init-db": "node init-database.js"
  },
  "keywords": ["health", "medical", "records", "phr"],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "sqlite3": "^5.1.6",
    "bcrypt": "^5.1.1",
    "jsonwebtoken": "^9.0.2",
    "multer": "^1.4.5-lts.1",
    "dotenv": "^16.3.1",
    "body-parser": "^1.20.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

---

## 📦 File 2: .env

Create `backend/.env`:

```env
PORT=3000
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
DATABASE_PATH=./database/healthvault.db
UPLOAD_PATH=./uploads
```

---

## 📦 File 3: server.js

Create `backend/server.js` - See attached code in BACKEND-CODE-server.txt

---

## 📦 File 4: database.js

Create `backend/database.js` - See attached code in BACKEND-CODE-database.txt

---

## 📦 File 5: init-database.js

Create `backend/init-database.js` - See attached code in BACKEND-CODE-init.txt

---

## 📦 File 6-9: Route Files

Create these files in `backend/routes/`:

1. **auth.js** - See BACKEND-CODE-routes-auth.txt
2. **patients.js** - See BACKEND-CODE-routes-patients.txt  
3. **hospitals.js** - See BACKEND-CODE-routes-hospitals.txt
4. **reports.js** - See BACKEND-CODE-routes-reports.txt

---

## 🚀 Installation Steps

### 1. Create Folder Structure

```bash
cd "C:\Coding learning\DHANVANTARI"
mkdir backend
cd backend
mkdir routes database uploads
```

### 2. Create All Files

Copy all the code files mentioned above into their respective locations.

### 3. Install Node.js Packages

```bash
npm install
```

This will install all required dependencies:
- express (web framework)
- sqlite3 (database)
- bcrypt (password hashing)
- jsonwebtoken (authentication)
- multer (file uploads)
- cors (cross-origin support)
- dotenv (environment variables)
- body-parser (request parsing)

### 4. Initialize Database

```bash
npm run init-db
```

You should see:
```
🔄 Initializing database schema...

✓ Patients table created
✓ Medical Conditions table created
✓ Allergies table created
✓ Hospitals table created
✓ Medical Reports table created
✓ Doctor Logins table created

🔄 Inserting sample data...

✓ Sample patient added (ID: HV123456789, Password: patient123)
✓ Sample medical condition added
✓ Sample allergy added
✓ Sample hospital added (ID: HOSP12345, Password: hospital123)
✓ Doctor login added (ID: HV123456789, Password: doctor123)
✓ Sample medical reports added

✅ Database initialization complete!

📋 Login Credentials:
   Patient: HV123456789 / patient123
   Doctor:  HV123456789 / doctor123
   Hospital: HOSP12345 / hospital123
```

### 5. Start the Server

```bash
npm start
```

You should see:
```
🚀 HealthVault API Server running on port 3000
📍 API Base URL: http://localhost:3000/api
🏥 Health Check: http://localhost:3000/api/health
```

### 6. Test the API

Open browser and visit:
```
http://localhost:3000/api/health
```

You should see:
```json
{
  "status": "OK",
  "message": "HealthVault API is running",
  "timestamp": "2024-01-17T14:30:00.000Z"
}
```

---

## ✅ Verification

### Test Patient Login:

```bash
curl -X POST http://localhost:3000/api/auth/patient/login -H "Content-Type: application/json" -d "{\"healthId\":\"HV123456789\"}"
```

### Test Get Patient Data:

```bash
curl http://localhost:3000/api/patients/HV123456789
```

### Test Get Reports:

```bash
curl http://localhost:3000/api/reports/patient/HV123456789
```

---

## 📂 Final Folder Structure

```
DHANVANTARI/
├── index.html
├── dashboard.html
├── (other HTML files)
├── BACKEND-SETUP.md
├── BACKEND-FILES.md (this file)
└── backend/
    ├── package.json
    ├── .env
    ├── server.js
    ├── database.js
    ├── init-database.js
    ├── routes/
    │   ├── auth.js
    │   ├── patients.js
    │   ├── hospitals.js
    │   └── reports.js
    ├── database/
    │   └── healthvault.db (auto-created)
    ├── uploads/ (auto-created)
    └── node_modules/ (after npm install)
```

---

## 🎯 What's Next?

1. ✅ Backend is ready
2. ✅ Database is initialized  
3. ✅ Sample data loaded
4. 🔄 **Connect frontend to backend** (next step)
5. 🔄 Test all features end-to-end

---

## 📝 Notes

- The database file (`healthvault.db`) is created automatically
- All passwords are hashed with bcrypt
- JWT tokens expire after 24 hours
- File uploads are limited to 10MB
- Supported file types: PDF, JPG, JPEG, PNG

---

## 🐛 Common Issues

**"Cannot find module 'express'"**
- Run: `npm install`

**"Port 3000 is already in use"**
- Change PORT in .env file or kill the process

**"Database is locked"**
- Stop the server and restart

**"ENOENT: no such file or directory"**
- Make sure you created all folders: routes, database, uploads

---

Your backend is now complete! 🎉
