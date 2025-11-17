# 🔧 Troubleshooting Guide - HealthVault ID

## Issue: "Get Patient Details" Button Not Working

### What Was Fixed

1. **API Route Mismatch**: Updated `api-service.js` to match actual backend routes
   - Reports: `/reports/patient/:healthId` (was `/reports/:healthId`)
   - Conditions: `/patients/:healthId/conditions` (was `/conditions/:healthId`)
   - Allergies: `/patients/:healthId/allergies` (was `/allergies/:healthId`)

2. **Enhanced Error Handling**: Added comprehensive error messages in `view-login.html`
   - Network error detection
   - Health check before patient fetch
   - Detailed console logging

3. **Loading States**: Added proper loading/disabled states for buttons

### Testing Steps

#### Step 1: Test Backend Connection

Open `api-test.html` in your browser:
```
http://localhost:8080/api-test.html
```

Click **Test Health Endpoint** - should show:
```json
{
  "status": "OK",
  "message": "HealthVault API is running",
  "database": "PostgreSQL"
}
```

#### Step 2: Test Patient Retrieval

In `api-test.html`, click **Get Patient Data** (uses demo ID: HV123456789)

If it fails with 404, you need to create a test patient first.

#### Step 3: Create Test Patient

In `api-test.html`, click **Create Test Patient**

This will create a patient with a random Health ID. Note the ID returned.

#### Step 4: Test View Login

Go to `view-login.html` and enter the Health ID from Step 3.

Click **View Records** - you should be redirected to the dashboard.

### Common Issues & Solutions

#### Issue 1: "Failed to fetch" Error

**Cause**: Backend server not running or wrong URL

**Solution**:
```bash
cd backend
npm start
```

Check console for: `🚀 HealthVault API Server running on port 3000`

#### Issue 2: CORS Error

**Cause**: CORS not properly configured

**Solution**: Backend already has CORS enabled in `server.js`:
```javascript
app.use(cors());
```

If still issues, update to:
```javascript
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
```

#### Issue 3: Patient Not Found (404)

**Cause**: No patient exists with that Health ID

**Solution**:
1. Use API test page to create a patient
2. Or insert directly into database:

```sql
INSERT INTO patients (health_id, name, gender, age, phone, address)
VALUES ('HV123456789', 'John Doe', 'Male', 34, '+1234567890', '123 Main St');
```

#### Issue 4: Database Not Connected

**Cause**: PostgreSQL database not configured

**Check**: `backend/.env` should have:
```
DATABASE_URL=your_postgresql_connection_string
PORT=3000
```

**For Render deployment**:
- Database URL is automatically provided by Render
- Check Render dashboard for connection details

### API Endpoints Reference

#### Base URL
- **Local**: `http://localhost:3000/api`
- **Production**: `https://healthvault-api-f1d6.onrender.com/api`

#### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/patients/:healthId` | Get patient details |
| PUT | `/patients/:healthId` | Update patient |
| GET | `/patients/:healthId/conditions` | Get conditions |
| POST | `/patients/:healthId/conditions` | Add condition |
| DELETE | `/patients/:healthId/conditions/:id` | Delete condition |
| GET | `/patients/:healthId/allergies` | Get allergies |
| POST | `/patients/:healthId/allergies` | Add allergy |
| DELETE | `/patients/:healthId/allergies/:id` | Delete allergy |
| GET | `/reports/patient/:healthId` | Get all reports |
| POST | `/reports` | Create report (multipart) |
| PUT | `/reports/:reportId` | Update report |
| DELETE | `/reports/:reportId` | Delete report |

### Browser Console Debugging

Open browser DevTools (F12) and check Console tab for:

**Successful Request**:
```
Loading patient data for: HV123456789
Patient data: {success: true, data: {...}}
```

**Failed Request**:
```
API Error: HTTP error! status: 404
```

### Network Tab Debugging

1. Open DevTools → Network tab
2. Filter by "Fetch/XHR"
3. Try to login
4. Click on the request
5. Check:
   - **Request URL**: Should be `https://healthvault-api-f1d6.onrender.com/api/patients/HV123456789`
   - **Status**: Should be 200 (or 404 if not found)
   - **Response**: JSON data

### Database Query Test

Connect to your PostgreSQL database and run:

```sql
-- Check if patients table exists
SELECT * FROM patients;

-- Check specific patient
SELECT * FROM patients WHERE health_id = 'HV123456789';

-- Create a test patient
INSERT INTO patients (health_id, name, gender, age, phone, address, blood_group, height, weight)
VALUES 
('HV123456789', 'John Doe', 'Male', 34, '+1234567890', '123 Main St', 'O+', 175, 70);

-- Check all tables
\dt
```

### Files Modified

1. `view-login.html` - Enhanced with API integration and error handling
2. `dashboard.html` - Added API data loading
3. `api-service.js` - Fixed endpoint routes to match backend
4. `config.js` - Already correctly configured

### Next Steps If Still Not Working

1. **Check Backend Logs**: Look at Render logs or local terminal
2. **Verify Database**: Ensure PostgreSQL has data
3. **Test with Postman**: 
   ```
   GET https://healthvault-api-f1d6.onrender.com/api/health
   GET https://healthvault-api-f1d6.onrender.com/api/patients/HV123456789
   ```
4. **Check Browser Console**: Any red errors?
5. **Check Network Tab**: What's the actual request/response?

### Support

If issues persist, check:
- Browser console errors (F12)
- Network tab for failed requests
- Backend server logs
- Database connection

### Quick Test Command

```bash
# Test health endpoint
curl https://healthvault-api-f1d6.onrender.com/api/health

# Test get patient
curl https://healthvault-api-f1d6.onrender.com/api/patients/HV123456789
```

Expected response:
```json
{
  "health_id": "HV123456789",
  "name": "John Doe",
  "gender": "Male",
  "age": 34,
  "phone": "+1234567890",
  "address": "123 Main St"
}
```
