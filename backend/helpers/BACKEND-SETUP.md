# HealthVault ID - Backend Setup Guide

## 📦 Complete Backend with Database

This backend provides a **full REST API** with SQLite database for the HealthVault ID system.

---

## 🚀 Quick Start

### Step 1: Create Folder Structure

```bash
# In your DHANVANTARI folder, create:
mkdir backend
cd backend
mkdir routes database uploads
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Initialize Database

```bash
npm run init-db
```

This will create the SQLite database with sample data.

### Step 4: Start the Server

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The API will run on **http://localhost:3000**

---

## 📁 File Structure

```
backend/
├── package.json          # Dependencies
├── .env                  # Environment variables
├── server.js             # Main Express server
├── database.js           # Database connection
├── init-database.js      # Database schema & seed data
├── routes/
│   ├── auth.js          # Authentication endpoints
│   ├── patients.js      # Patient data endpoints
│   ├── hospitals.js     # Hospital endpoints
│   └── reports.js       # Medical reports endpoints
├── database/
│   └── healthvault.db   # SQLite database (auto-created)
└── uploads/             # Uploaded files storage
```

---

## 🔐 Demo Credentials

**Patient Login:**
- Health ID: `HV123456789`
- Password: `patient123`

**Doctor/Hospital Login:**
- Health ID: `HV123456789`
- Password: `doctor123`

**Hospital Portal:**
- Hospital ID: `HOSP12345`
- Password: `hospital123`

---

## 📡 API Endpoints

### Authentication

#### Patient Login (View Mode)
```
POST /api/auth/patient/login
Body: { "healthId": "HV123456789" }
```

#### Doctor Login (Edit Mode)
```
POST /api/auth/doctor/login
Body: {
  "healthId": "HV123456789",
  "password": "doctor123"
}
```

#### Hospital Authentication
```
POST /api/auth/hospital/login
Body: {
  "hospitalId": "HOSP12345",
  "password": "hospital123",
  "hospitalName": "City General Hospital"
}
```

#### Verify Patient
```
POST /api/auth/verify-patient
Body: { "patientHealthId": "HV123456789" }
```

---

### Patient Data

#### Get Patient Profile
```
GET /api/patients/:healthId
```

#### Update Patient Profile
```
PUT /api/patients/:healthId
Body: {
  "name": "John Doe",
  "age": 35,
  "gender": "Male",
  "blood_group": "O+",
  "height": 175,
  "weight": 75
}
```

#### Get Medical Conditions
```
GET /api/patients/:healthId/conditions
```

#### Add Medical Condition
```
POST /api/patients/:healthId/conditions
Body: {
  "condition_name": "Hypertension",
  "severity": "moderate",
  "diagnosed_date": "2024-01-15",
  "notes": "Controlled with medication"
}
```

#### Delete Medical Condition
```
DELETE /api/patients/:healthId/conditions/:conditionId
```

#### Get Allergies
```
GET /api/patients/:healthId/allergies
```

#### Add Allergy
```
POST /api/patients/:healthId/allergies
Body: {
  "allergen": "Penicillin",
  "allergy_type": "drug",
  "severity": "severe",
  "reaction": "Anaphylaxis"
}
```

#### Delete Allergy
```
DELETE /api/patients/:healthId/allergies/:allergyId
```

---

### Medical Reports

#### Get All Reports for Patient
```
GET /api/reports/patient/:healthId
```

#### Get Single Report
```
GET /api/reports/:reportId
```

#### Add New Report (with file upload)
```
POST /api/reports
Content-Type: multipart/form-data
Body: {
  "patientHealthId": "HV123456789",
  "hospitalId": "HOSP12345",
  "reportName": "Blood Test",
  "doctorName": "Dr. Smith",
  "reportDate": "2024-01-15",
  "status": "normal",
  "notes": "All parameters normal",
  "file": <file>
}
```

#### Update Report
```
PUT /api/reports/:reportId
Body: {
  "reportName": "Updated Name",
  "doctorName": "Dr. Johnson",
  "status": "review"
}
```

#### Delete Report
```
DELETE /api/reports/:reportId
```

---

### Hospitals

#### Get All Hospitals
```
GET /api/hospitals
```

#### Get Hospital by ID
```
GET /api/hospitals/:hospitalId
```

---

## 🗄️ Database Schema

### Tables:

1. **patients** - Patient profiles
2. **medical_conditions** - Medical conditions/diagnoses
3. **allergies** - Patient allergies
4. **hospitals** - Hospital information
5. **medical_reports** - Medical test reports
6. **doctor_logins** - Doctor/Hospital access credentials

---

## 🔧 Environment Variables (.env)

```env
PORT=3000
JWT_SECRET=your_super_secret_jwt_key_change_in_production
NODE_ENV=development
DATABASE_PATH=./database/healthvault.db
UPLOAD_PATH=./uploads
```

---

## 🧪 Testing the API

### Using cURL:

**Patient Login:**
```bash
curl -X POST http://localhost:3000/api/auth/patient/login \
  -H "Content-Type: application/json" \
  -d '{"healthId":"HV123456789"}'
```

**Get Patient Data:**
```bash
curl http://localhost:3000/api/patients/HV123456789
```

**Get Reports:**
```bash
curl http://localhost:3000/api/reports/patient/HV123456789
```

### Using Postman or Thunder Client:

Import the endpoints and test directly!

---

## 📝 Sample Data Included

The database initialization includes:

✅ 1 Sample Patient (John Doe - HV123456789)
✅ 1 Medical Condition (Hypertension)
✅ 1 Allergy (Penicillin)
✅ 1 Hospital (City General Hospital)
✅ 5 Medical Reports
✅ Login credentials for testing

---

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ CORS enabled
- ✅ File upload validation
- ✅ SQL injection protection (parameterized queries)
- ✅ File size limits (10MB max)

---

## 📱 Connecting Frontend

The frontend HTML files are already configured to work with this API. Just:

1. Start the backend server
2. Open any HTML file in your browser
3. The frontend will automatically connect to http://localhost:3000

---

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Change PORT in .env file or kill the process
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Database locked:**
```bash
# Stop the server and restart
# Or delete database/healthvault.db and run init-db again
```

**CORS errors:**
- Make sure backend is running on port 3000
- Check browser console for exact error

---

## 🎓 Next Steps

1. **Add more patients** - Use the API to register new patients
2. **Add hospitals** - Register more healthcare facilities
3. **Upload files** - Test report uploads
4. **Secure production** - Change JWT_SECRET before deployment
5. **Add authentication middleware** - Protect sensitive routes

---

## 📚 Technologies Used

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **SQLite3** - Database
- **bcrypt** - Password hashing
- **JWT** - Token authentication
- **Multer** - File uploads
- **CORS** - Cross-origin support

---

## 🎉 You're All Set!

Your HealthVault ID system now has a **fully functional backend** with:
- ✅ User authentication
- ✅ Patient data management
- ✅ Medical reports storage
- ✅ Hospital portal
- ✅ File uploads
- ✅ Complete CRUD operations

**Start building! 🚀**
