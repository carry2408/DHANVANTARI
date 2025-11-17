# HealthVault Backend API

A RESTful API backend for the HealthVault Personal Health Record system, built with Node.js, Express, and PostgreSQL.

## 🚀 Features

- Patient authentication and management
- Hospital/Doctor login system
- Medical records upload and management
- Medical conditions and allergies tracking
- Secure file uploads
- JWT-based authentication
- PostgreSQL database

## 📦 Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Database**: PostgreSQL
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcrypt
- **File Upload**: Multer
- **Database Client**: node-postgres (pg)

## 🛠️ Installation

### Prerequisites

- Node.js 18 or higher
- PostgreSQL 12 or higher

### Local Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup PostgreSQL**
   ```bash
   # Create database
   createdb healthvault
   ```

4. **Configure environment**
   ```bash
   # Copy example env file
   cp .env.example .env
   
   # Edit .env with your settings
   DATABASE_URL=postgresql://localhost:5432/healthvault
   JWT_SECRET=your_secret_key_here
   ```

5. **Initialize database**
   ```bash
   npm run init-db
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

### Health Check
```http
GET /api/health
```

### Authentication

#### Patient Login
```http
POST /api/auth/patient/login
Content-Type: application/json

{
  "healthId": "HV123456789",
  "password": "patient123"
}
```

#### Hospital Login
```http
POST /api/auth/hospital/login
Content-Type: application/json

{
  "hospitalId": "HOSP12345",
  "password": "hospital123"
}
```

#### Doctor Login
```http
POST /api/auth/doctor/login
Content-Type: application/json

{
  "doctorId": "DOC999",
  "password": "doctor123"
}
```

### Patients

#### Get Patient Info
```http
GET /api/patients/:healthId
```

#### Update Patient Info
```http
PUT /api/patients/:healthId
Content-Type: application/json

{
  "name": "John Doe",
  "gender": "Male",
  "age": 34,
  "phone": "1234567890",
  "address": "123 Main St"
}
```

#### Get Medical Conditions
```http
GET /api/patients/:healthId/conditions
```

#### Add Medical Condition
```http
POST /api/patients/:healthId/conditions
Content-Type: application/json

{
  "condition": "Diabetes"
}
```

#### Delete Medical Condition
```http
DELETE /api/patients/:healthId/conditions/:id
```

#### Get Allergies
```http
GET /api/patients/:healthId/allergies
```

#### Add Allergy
```http
POST /api/patients/:healthId/allergies
Content-Type: application/json

{
  "allergy": "Penicillin"
}
```

#### Delete Allergy
```http
DELETE /api/patients/:healthId/allergies/:id
```

### Medical Reports

#### Get Patient Reports
```http
GET /api/reports/patient/:healthId
```

#### Add New Report
```http
POST /api/reports
Content-Type: multipart/form-data

Fields:
- file: [PDF/Image file]
- healthId: "HV123456789"
- name: "Blood Test"
- hospital: "City Hospital"
- doctor: "Dr. Smith"
- date: "2024-01-15"
```

#### Update Report
```http
PUT /api/reports/:reportId
Content-Type: application/json

{
  "name": "Updated Report Name",
  "hospital": "New Hospital",
  "doctor": "Dr. Jones",
  "date": "2024-01-20"
}
```

#### Delete Report
```http
DELETE /api/reports/:reportId
```

### Hospitals

#### Get All Hospitals
```http
GET /api/hospitals
```

#### Get Hospital Info
```http
GET /api/hospitals/:hospitalId
```

## 🗄️ Database Schema

### Tables

- **patients**: Patient information and credentials
- **medical_conditions**: Patient medical conditions
- **allergies**: Patient allergies
- **hospitals**: Hospital information and credentials
- **doctor_logins**: Doctor credentials
- **medical_reports**: Medical reports metadata and file references

## 🔐 Sample Credentials

For testing purposes:

**Patient:**
- Health ID: `HV123456789`
- Password: `patient123`

**Hospital:**
- Hospital ID: `HOSP12345`
- Password: `hospital123`

**Doctor:**
- Doctor ID: `DOC999`
- Password: `doctor123`

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions for Render.

### Quick Deploy to Render

1. Push your code to GitHub
2. Create PostgreSQL database on Render
3. Create Web Service on Render
4. Set environment variables
5. Run `npm run init-db` in Render Shell

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `NODE_ENV` | Environment | development |
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `JWT_SECRET` | Secret for JWT signing | Required |
| `UPLOAD_PATH` | Path for file uploads | ./uploads |

## 🧪 Testing

```bash
# Test health endpoint
curl http://localhost:3000/api/health

# Test patient login
curl -X POST http://localhost:3000/api/auth/patient/login \
  -H "Content-Type: application/json" \
  -d '{"healthId":"HV123456789","password":"patient123"}'
```

## 🔧 Development

### Project Structure
```
backend/
├── routes/           # API routes
│   ├── auth.js       # Authentication routes
│   ├── patients.js   # Patient routes
│   ├── hospitals.js  # Hospital routes
│   └── reports.js    # Report routes
├── uploads/          # Uploaded files
├── database.js       # Database connection
├── init-database.js  # Database initialization
├── server.js         # Express server
├── package.json      # Dependencies
└── .env             # Environment variables
```

### Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run init-db` - Initialize database with tables and sample data

## ⚠️ Important Notes

- **File Uploads**: In production on Render free tier, uploaded files are ephemeral. Consider using cloud storage (S3, Cloudinary) for production.
- **Database**: Free PostgreSQL on Render has 1GB limit and 90-day inactivity deletion policy.
- **Cold Starts**: Free tier web services spin down after 15 minutes of inactivity.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🐛 Known Issues

- File uploads are not persistent on Render free tier
- Cold starts may take 30-60 seconds on first request

## 📞 Support

For issues and questions, please open an issue on GitHub.
