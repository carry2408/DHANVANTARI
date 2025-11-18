# HealthVault ID - Complete API Integration Guide

## 🎯 Overview

All frontend pages are now fully connected to the backend API. This document explains how the integration works and what each page does.

---

## 📡 API Configuration

### Base URL
The API base URL is configured in two places:

1. **config.js**
```javascript
const API_CONFIG = {
    BASE_URL: 'https://healthvault-api-f1d6.onrender.com/api',
    ENDPOINTS: {
        HEALTH: '/health',
        PATIENTS: '/patients',
        REPORTS: '/reports',
        CONDITIONS: '/conditions',
        ALLERGIES: '/allergies'
    }
};
```

2. **api-service.js**
```javascript
const API_BASE_URL = 'https://healthvault-api-f1d6.onrender.com/api';
```

**To use local backend**, change both to:
```javascript
const API_BASE_URL = 'http://localhost:3000/api';
```

---

## 🔗 Page-by-Page Integration

### 1. Index Page (index.html)
**Status:** ✅ Fully Connected

**Features:**
- Home page with navigation
- Links to view-login.html and edit-login.html
- No API calls (static page)

**Navigation:**
- "View My Records" → `view-login.html`
- "Hospital/Doctor Login" → `edit-login.html`

---

### 2. View Login Page (view-login.html)
**Status:** ✅ Fully Connected

**Features:**
- Patient login by Health ID
- API health check
- Patient data validation

**API Calls:**
1. **Health Check**
   ```javascript
   api.checkHealth()
   ```
   - Verifies backend is running
   - Called before patient lookup

2. **Get Patient**
   ```javascript
   api.getPatient(healthId)
   ```
   - Fetches patient data by Health ID
   - Stores data in sessionStorage
   - Redirects to dashboard on success

**Session Storage:**
```javascript
sessionStorage.setItem('healthId', healthId);
sessionStorage.setItem('viewMode', 'true');
sessionStorage.setItem('patientData', JSON.stringify(result.data));
```

**Error Handling:**
- Network errors → Shows connection error
- Patient not found → Shows "not found" message
- Backend down → Shows server error

---

### 3. Edit Login Page (edit-login.html)
**Status:** ✅ Fully Connected

**Features:**
- Hospital/Doctor authentication
- Password OR OTP login
- Patient verification before access

**API Calls:**
1. **Get Patient** (for verification)
   ```javascript
   api.getPatient(healthId)
   ```
   - Verifies patient exists
   - Loads patient data for display

**Authentication Flow:**
1. Hospital enters credentials (Password or OTP)
2. System validates (demo mode accepts any valid format)
3. Hospital enters patient Health ID
4. API verifies patient exists
5. Redirects to hospital-add-report.html

**Session Storage:**
```javascript
sessionStorage.setItem('healthId', healthId);
sessionStorage.setItem('editMode', 'true');
sessionStorage.setItem('hospitalMode', 'true');
sessionStorage.setItem('patientData', JSON.stringify(result.data));
```

**Demo Credentials:**
- Password: Any non-empty password
- OTP: `123456` (hardcoded for demo)

---

### 4. Dashboard Page (dashboard.html)
**Status:** ✅ Fully Connected

**Features:**
- Displays patient information
- Shows medical reports
- Lists medical conditions
- Lists allergies
- Edit/Delete options (in edit mode)

**API Calls:**
1. **Get Patient Data**
   ```javascript
   api.getPatient(healthId)
   ```
   - Loads patient profile
   - Updates name, age, gender, blood group, etc.

2. **Get Reports**
   ```javascript
   api.getReports(healthId)
   ```
   - Fetches all medical reports
   - Displays in card grid
   - Shows report count

3. **Get Medical Conditions**
   ```javascript
   api.getConditions(healthId)
   ```
   - Loads chronic conditions
   - Displays as badges

4. **Get Allergies**
   ```javascript
   api.getAllergies(healthId)
   ```
   - Loads allergy list
   - Displays as warning badges

5. **Delete Report** (Edit mode only)
   ```javascript
   api.deleteReport(reportId)
   ```
   - Removes report from database
   - Reloads dashboard

**Data Display:**
- Profile Card: Name, Age, Gender, Health ID
- Vital Stats: Blood Group, Height, Weight, BMI
- Reports Grid: Dynamic cards with report details
- Medical Conditions: Badge list
- Allergies: Warning badge list

**Edit Mode Features:**
- Shows "Edit Profile" button
- Shows "Add Report" floating button
- Shows Edit/Delete buttons on each report
- Enabled when `sessionStorage.getItem('editMode') === 'true'`

---

### 5. Hospital Add Report Page (hospital-add-report.html)
**Status:** ✅ Fully Connected

**Features:**
- 3-step wizard (Auth → Patient ID → Add Records)
- Add medical reports
- Add medical conditions
- Add allergies

**API Calls:**

1. **Verify Patient Access**
   ```javascript
   api.getPatient(patientId)
   ```
   - Step 2: Verify patient exists before granting access

2. **Add Medical Report**
   ```javascript
   api.createReport({
     health_id: patientHealthId,
     report_name: '...',
     hospital_name: '...',
     doctor_name: '...',
     report_date: '...',
     status: '...',
     notes: '...'
   })
   ```
   - Adds new report to patient record
   - Returns created report ID

3. **Add Medical Condition**
   ```javascript
   api.addCondition(patientHealthId, {
     condition_name: '...',
     diagnosed_date: '...',
     severity: '...',
     notes: '...'
   })
   ```
   - Adds chronic condition to patient
   - Links to patient Health ID

4. **Add Allergy**
   ```javascript
   api.addAllergy(patientHealthId, {
     allergy_name: '...',
     allergy_type: '...',
     severity: '...',
     reaction: '...'
   })
   ```
   - Adds allergy to patient record
   - Includes severity and reaction details

**Workflow:**
1. **Step 1 - Hospital Authentication**
   - Hospital name and ID
   - Password or OTP verification
   - Skipped if coming from edit-login.html

2. **Step 2 - Patient ID Entry**
   - Enter patient Health ID
   - API verifies patient exists
   - Loads patient data for context

3. **Step 3 - Add Records**
   - Tab 1: Add Report (with file upload UI)
   - Tab 2: Add Condition (with severity)
   - Tab 3: Add Allergy (with type and reaction)

**Form Validation:**
- All required fields marked with *
- Date pickers limited to current/past dates
- Select dropdowns with predefined options
- Textarea for additional notes

---

### 6. API Test Page (api-test.html)
**Status:** ✅ Fully Functional

**Features:**
- Backend health check
- Test all API endpoints
- Create test patients
- View responses in real-time

**Test Functions:**
1. Check API Health
2. Get Patient Details
3. Create New Patient
4. Get Reports
5. Get Conditions
6. Get Allergies

**Usage:**
- Open `api-test.html` in browser
- Click test buttons
- View results in output box
- Useful for debugging API issues

---

## 🔄 Data Flow

### View Records Flow (Patient)
```
index.html 
  → view-login.html (Enter Health ID)
  → API: getPatient(healthId)
  → dashboard.html (View Records)
  → API: getReports(), getConditions(), getAllergies()
  → Display all data
```

### Hospital Flow (Add Records)
```
index.html
  → edit-login.html (Hospital Login)
  → API: getPatient(healthId) [verify]
  → hospital-add-report.html (Step 1: Auth)
  → Step 2: Enter Patient ID
  → API: getPatient(patientId) [verify access]
  → Step 3: Add Records
  → API: createReport() / addCondition() / addAllergy()
  → Success → Can add more records
```

---

## 💾 Session Storage

### Keys Used:
```javascript
{
  'healthId': 'HV123456789',           // Current patient ID
  'viewMode': 'true',                  // Patient view mode
  'editMode': 'true',                  // Edit/Hospital mode
  'hospitalMode': 'true',              // Hospital portal mode
  'patientData': '{...}'               // Cached patient data (JSON)
}
```

### When Data is Set:
- **view-login.html**: Sets healthId, viewMode, patientData
- **edit-login.html**: Sets healthId, editMode, hospitalMode, patientData
- **dashboard.html**: Reads all data, no writes

### When Data is Cleared:
- Logout button click
- Browser tab close
- `sessionStorage.clear()` called

---

## 🎨 UI States

### Loading States
All forms show loading spinners during API calls:
```html
<i class="ri-loader-4-line animate-spin mr-2"></i>Loading...
```

### Success States
Success messages with ✓ checkmark:
```javascript
alert('✓ Operation successful!\n\n' + details);
```

### Error States
Error alerts with details:
```javascript
alert('Error:\n\n' + error.message);
```

### Empty States
Dashboard shows placeholders when no data:
- "No reports available"
- "No conditions recorded"
- "No known allergies"

---

## 🔐 Security Notes

### Current Implementation:
- ⚠️ **Demo Mode**: No real authentication
- ⚠️ **No Encryption**: Data transmitted as-is
- ⚠️ **Session Only**: Data not persisted in browser
- ⚠️ **No Access Control**: Any Health ID can be accessed

### Production Requirements:
- ✅ Implement proper JWT authentication
- ✅ Hash passwords with bcrypt
- ✅ Use HTTPS for all API calls
- ✅ Implement rate limiting
- ✅ Add CSRF protection
- ✅ Validate all inputs on backend
- ✅ Implement role-based access control
- ✅ Add audit logging
- ✅ Encrypt sensitive data at rest

---

## 🧪 Testing Guide

### Test Patient Creation
```javascript
// Use api-test.html or browser console
const testPatient = {
  health_id: 'HV' + Date.now(),
  name: 'John Doe',
  age: 34,
  gender: 'Male',
  blood_group: 'O+',
  height: 175,
  weight: 70,
  phone: '1234567890',
  email: 'john@example.com'
};

api.createPatient(testPatient).then(result => {
  console.log('Created patient:', result);
  // Use this Health ID to login
});
```

### Test Report Creation
```javascript
api.createReport({
  health_id: 'HV123456789',
  report_name: 'Blood Test',
  hospital_name: 'City Hospital',
  doctor_name: 'Dr. Smith',
  report_date: '2024-01-15',
  status: 'normal'
}).then(console.log);
```

### Test Condition Creation
```javascript
api.addCondition('HV123456789', {
  condition_name: 'Hypertension',
  diagnosed_date: '2023-01-01',
  severity: 'moderate',
  notes: 'Blood pressure medication prescribed'
}).then(console.log);
```

### Test Allergy Creation
```javascript
api.addAllergy('HV123456789', {
  allergy_name: 'Penicillin',
  allergy_type: 'drug',
  severity: 'severe',
  reaction: 'Anaphylaxis risk'
}).then(console.log);
```

---

## 📱 Mobile Responsiveness

All pages are fully responsive with Tailwind CSS:
- Mobile: Single column layout
- Tablet: 2-column grids
- Desktop: 3-column grids (reports)
- Touch-friendly buttons
- Readable fonts on all screens

---

## 🚀 Deployment Checklist

### Frontend
- [ ] Update API_BASE_URL to production backend
- [ ] Test all pages in production environment
- [ ] Verify CORS is properly configured
- [ ] Check mobile responsiveness
- [ ] Test on multiple browsers

### Backend
- [ ] Ensure DATABASE_URL is set
- [ ] Verify all routes are working
- [ ] Check CORS configuration
- [ ] Test API endpoints
- [ ] Monitor error logs

### Database
- [ ] Tables created and migrated
- [ ] Sample data for testing
- [ ] Backup strategy in place
- [ ] Connection pooling configured

---

## 📞 API Endpoints Summary

### Patients
- `GET /api/patients/:healthId` - Get patient by Health ID
- `POST /api/patients` - Create new patient
- `PUT /api/patients/:healthId` - Update patient

### Reports
- `GET /api/reports/patient/:healthId` - Get all reports for patient
- `POST /api/reports` - Create new report
- `PUT /api/reports/:id` - Update report
- `DELETE /api/reports/:id` - Delete report

### Conditions
- `GET /api/patients/:healthId/conditions` - Get conditions
- `POST /api/patients/:healthId/conditions` - Add condition
- `DELETE /api/patients/:healthId/conditions/:id` - Delete condition

### Allergies
- `GET /api/patients/:healthId/allergies` - Get allergies
- `POST /api/patients/:healthId/allergies` - Add allergy
- `DELETE /api/patients/:healthId/allergies/:id` - Delete allergy

### Health
- `GET /api/health` - Check API status

---

## ✅ Integration Status

| Page | API Connected | Forms Working | Data Display | Notes |
|------|--------------|---------------|--------------|-------|
| index.html | ✅ N/A | ✅ N/A | ✅ | Static page |
| view-login.html | ✅ Yes | ✅ Yes | ✅ N/A | Patient login |
| edit-login.html | ✅ Yes | ✅ Yes | ✅ N/A | Hospital login |
| dashboard.html | ✅ Yes | ✅ N/A | ✅ Yes | View all data |
| hospital-add-report.html | ✅ Yes | ✅ Yes | ✅ Yes | Add records |
| api-test.html | ✅ Yes | ✅ Yes | ✅ Yes | Testing tool |

**All pages are fully functional and connected to the live backend API!**

---

**Last Updated:** January 2024
**Backend URL:** https://healthvault-api-f1d6.onrender.com/api
**Status:** ✅ Production Ready (Demo Mode)
