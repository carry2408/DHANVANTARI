# API Integration Guide

## Backend API URL

Your backend is deployed at:
```
https://healthvault-api-f1d6.onrender.com/api
```

## API Endpoints

### Health Check
```
GET /health
```
Returns server status.

### Patient Endpoints
```
GET /patients/:healthId       - Get patient details
POST /patients                - Create new patient
PUT /patients/:healthId       - Update patient details
```

### Report Endpoints
```
GET /reports/:healthId        - Get all reports for a patient
POST /reports                 - Create new report
PUT /reports/:reportId        - Update report
DELETE /reports/:reportId     - Delete report
```

### Medical Condition Endpoints
```
GET /conditions/:healthId     - Get all conditions for a patient
POST /conditions              - Add new condition
DELETE /conditions/:id        - Delete condition
```

### Allergy Endpoints
```
GET /allergies/:healthId      - Get all allergies for a patient
POST /allergies               - Add new allergy
DELETE /allergies/:id         - Delete allergy
```

## Frontend Integration

### Step 1: Include API Service in Your HTML

Add this script tag in your HTML files (before your main script):

```html
<script src="api-service.js"></script>
```

### Step 2: Use the API in Your Code

#### Example: Get Patient Data

```javascript
// In dashboard.html
async function loadPatientData() {
    const healthId = sessionStorage.getItem('healthId');
    
    // Call the API
    const result = await api.getPatient(healthId);
    
    if (result.success) {
        const patient = result.data;
        document.getElementById('patientName').textContent = patient.name;
        document.getElementById('patientAge').textContent = patient.age + ' years';
        document.getElementById('bloodGroup').textContent = patient.bloodGroup;
        // ... update other fields
    } else {
        console.error('Failed to load patient:', result.error);
        alert('Failed to load patient data');
    }
}

// Call when page loads
window.addEventListener('DOMContentLoaded', loadPatientData);
```

#### Example: Get Reports

```javascript
// In dashboard.html
async function loadReports() {
    const healthId = sessionStorage.getItem('healthId');
    
    const result = await api.getReports(healthId);
    
    if (result.success) {
        const reports = result.data;
        displayReports(reports);
    } else {
        console.error('Failed to load reports:', result.error);
    }
}

function displayReports(reports) {
    const reportsContainer = document.getElementById('reportsList');
    reportsContainer.innerHTML = '';
    
    reports.forEach(report => {
        // Create report card HTML
        const reportCard = createReportCard(report);
        reportsContainer.appendChild(reportCard);
    });
}
```

#### Example: Add Report

```javascript
// In add-report.html
async function addReport() {
    const healthId = sessionStorage.getItem('healthId');
    
    const reportData = {
        healthId: healthId,
        reportName: document.getElementById('reportName').value,
        hospitalName: document.getElementById('hospitalName').value,
        doctorName: document.getElementById('doctorName').value,
        reportDate: document.getElementById('reportDate').value,
        notes: document.getElementById('notes').value
    };
    
    const result = await api.createReport(reportData);
    
    if (result.success) {
        alert('Report added successfully!');
        window.location.href = 'dashboard.html';
    } else {
        alert('Failed to add report: ' + result.error);
    }
}

document.getElementById('addReportForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    await addReport();
});
```

#### Example: Upload File with Report

```javascript
async function uploadReportWithFile() {
    const formData = new FormData();
    const fileInput = document.getElementById('fileInput');
    
    formData.append('file', fileInput.files[0]);
    formData.append('healthId', sessionStorage.getItem('healthId'));
    formData.append('reportName', document.getElementById('reportName').value);
    formData.append('hospitalName', document.getElementById('hospitalName').value);
    formData.append('doctorName', document.getElementById('doctorName').value);
    formData.append('reportDate', document.getElementById('reportDate').value);
    
    const result = await api.uploadFile(formData);
    
    if (result.success) {
        alert('Report uploaded successfully!');
        window.location.href = 'dashboard.html';
    } else {
        alert('Failed to upload: ' + result.error);
    }
}
```

#### Example: Add Medical Condition

```javascript
// In hospital-add-report.html
async function addCondition() {
    const conditionData = {
        healthId: sessionStorage.getItem('healthId'),
        conditionName: document.getElementById('conditionName').value,
        severity: document.getElementById('conditionSeverity').value,
        diagnosedDate: document.getElementById('conditionDiagnosed').value,
        notes: document.getElementById('conditionNotes').value
    };
    
    const result = await api.addCondition(conditionData);
    
    if (result.success) {
        alert('Condition added successfully!');
    } else {
        alert('Failed to add condition: ' + result.error);
    }
}
```

#### Example: Add Allergy

```javascript
async function addAllergy() {
    const allergyData = {
        healthId: sessionStorage.getItem('healthId'),
        allergyName: document.getElementById('allergyName').value,
        allergyType: document.getElementById('allergyType').value,
        severity: document.getElementById('allergySeverity').value,
        reaction: document.getElementById('allergyReaction').value
    };
    
    const result = await api.addAllergy(allergyData);
    
    if (result.success) {
        alert('Allergy added successfully!');
    } else {
        alert('Failed to add allergy: ' + result.error);
    }
}
```

## Files to Update

You need to add API integration to these files:

1. **dashboard.html** - Load patient data, reports, conditions, allergies
2. **add-report.html** - Create new reports
3. **hospital-add-report.html** - Create reports, add conditions, add allergies
4. **view-login.html** - Validate patient exists
5. **edit-login.html** - Validate hospital credentials

## Quick Integration Steps

For each HTML file:

1. Add script tag: `<script src="api-service.js"></script>` before closing `</body>`

2. Replace dummy data with API calls:
   ```javascript
   // OLD (dummy data)
   const patientName = "John Doe";
   
   // NEW (from API)
   const result = await api.getPatient(healthId);
   const patientName = result.data.name;
   ```

3. Replace form submissions to call API:
   ```javascript
   // OLD
   alert('Report added!');
   
   // NEW
   const result = await api.createReport(reportData);
   if (result.success) {
       alert('Report added!');
   }
   ```

## Testing the API

You can test the API directly:

```javascript
// Open browser console on any page
// Test health check
api.checkHealth().then(result => console.log(result));

// Test get patient (replace with actual health ID)
api.getPatient('HV123456789').then(result => console.log(result));
```

## Error Handling

Always handle errors properly:

```javascript
const result = await api.getPatient(healthId);

if (result.success) {
    // Use the data
    console.log(result.data);
} else {
    // Handle the error
    console.error(result.error);
    alert('Failed to load patient data. Please try again.');
}
```

## CORS Note

If you get CORS errors, make sure your backend has CORS enabled:

```javascript
// In your backend server.js
const cors = require('cors');
app.use(cors());
```

## Complete Example: Dashboard Page

Here's how to fully integrate the dashboard:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
    <!-- ... other head content ... -->
</head>
<body>
    <!-- ... HTML content ... -->
    
    <!-- Include API service -->
    <script src="api-service.js"></script>
    
    <script>
        // Load all data when page loads
        window.addEventListener('DOMContentLoaded', async () => {
            const healthId = sessionStorage.getItem('healthId');
            
            if (!healthId) {
                window.location.href = 'index.html';
                return;
            }
            
            // Load patient data
            const patientResult = await api.getPatient(healthId);
            if (patientResult.success) {
                displayPatientInfo(patientResult.data);
            }
            
            // Load reports
            const reportsResult = await api.getReports(healthId);
            if (reportsResult.success) {
                displayReports(reportsResult.data);
            }
            
            // Load conditions
            const conditionsResult = await api.getConditions(healthId);
            if (conditionsResult.success) {
                displayConditions(conditionsResult.data);
            }
            
            // Load allergies
            const allergiesResult = await api.getAllergies(healthId);
            if (allergiesResult.success) {
                displayAllergies(allergiesResult.data);
            }
        });
        
        function displayPatientInfo(patient) {
            document.getElementById('patientName').textContent = patient.name;
            document.getElementById('patientAge').textContent = patient.age + ' years';
            document.getElementById('patientGender').textContent = patient.gender;
            document.getElementById('bloodGroup').textContent = patient.bloodGroup;
            // ... etc
        }
        
        function displayReports(reports) {
            const container = document.getElementById('reportsList');
            container.innerHTML = reports.map(report => `
                <div class="report-card">
                    <h3>${report.reportName}</h3>
                    <p>${report.hospitalName}</p>
                    <p>${report.doctorName}</p>
                    <p>${report.reportDate}</p>
                </div>
            `).join('');
        }
        
        // ... other functions
    </script>
</body>
</html>
```

## Need Help?

If you encounter issues:

1. Check browser console for errors
2. Verify the API URL is correct
3. Test API endpoints using Postman or curl
4. Check backend logs on Render dashboard
5. Ensure backend database is connected properly

---

**Current Status:**
- ✅ Backend deployed at: https://healthvault-api-f1d6.onrender.com
- ✅ API service file created: `api-service.js`
- ⏳ Frontend integration pending (need to add API calls to HTML files)
