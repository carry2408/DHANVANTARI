# HealthVault ID - User Guide

## 🎯 Complete Walkthrough

This guide explains how to use the HealthVault ID system from start to finish.

---

## 🏠 Getting Started

### 1. Open the Application
1. Open `index.html` in your browser
2. You'll see the HealthVault ID homepage
3. Two main options available:
   - **View My Records** (For Patients)
   - **Hospital/Doctor Login** (For Healthcare Providers)

---

## 👤 For Patients: Viewing Your Records

### Step 1: Login with Your Health ID

1. Click **"View My Records"** button on homepage
2. You'll be redirected to the login page
3. Enter your Health ID (example: `HV123456789`)
4. Click **"View Records"** button

**What happens:**
- System checks if backend is online
- Verifies your Health ID exists in database
- Loads your patient data
- Redirects you to your dashboard

### Step 2: View Your Dashboard

Once logged in, you'll see:

**Profile Card (Top)**
- Your name
- Health ID
- Age and Gender
- Blood Group, Height, Weight, BMI
- Quick stats displayed in colorful gradient card

**Medical Information**
- **Allergies Section** (left): Lists all your known allergies in red badges
- **Medical Conditions Section** (right): Shows chronic conditions in blue badges

**Medical Reports Section (Bottom)**
- Grid of all your medical reports
- Each report card shows:
  - Report name (e.g., "Blood Test Report")
  - Hospital name
  - Doctor name
  - Report date
  - Status badge (Normal/Review/Critical)
  - "View Report" button

### Step 3: Logout
- Click "Logout" button in top-right corner
- Confirms before logging out
- Clears your session
- Returns to homepage

---

## 🏥 For Hospitals: Adding Records

### Step 1: Hospital Login

1. Click **"Hospital/Doctor Login"** on homepage
2. You'll see authentication page with two options:

**Option A: Password Login**
- Enter Hospital/Scanning Center Name
- Enter Hospital ID
- Enter Access Password
- Click "Login as Healthcare Provider"

**Option B: OTP Login**
- Click "OTP" tab
- Enter Hospital Name
- Enter Hospital ID
- Enter Registered Phone Number
- Click "Send OTP"
- Enter the 6-digit OTP (Demo: `123456`)
- Click "Verify & Login"

**What happens:**
- System validates your credentials (demo mode)
- Verifies the patient exists in system
- Redirects to Hospital Portal

### Step 2: Hospital Portal - Three Steps

**Step 1: Hospital Authentication** (May be skipped if coming from login page)
- Verify your hospital credentials
- System logs your access attempt

**Step 2: Enter Patient Health ID**
- Enter the patient's Health ID you want to access
- Example: `HV123456789`
- Click "Access Patient Records"
- System verifies patient exists
- Shows confirmation with patient name

**Step 3: Add Medical Records**

You now have three options (tabs):

### 📄 **Add Report Tab** (Default)

Fill in the report form:
1. **Upload Document** (Optional)
   - Click or drag & drop to upload PDF/Image
   - Max 10MB

2. **Report Information:**
   - **Report Name*** (Required): e.g., "Blood Test Report"
   - **Report Date*** (Required): Select date from calendar
   - **Doctor Name*** (Required): e.g., "Dr. John Smith"
   - **Report Status*** (Required): Choose from:
     - Normal
     - Needs Review
     - Critical

3. **Additional Notes** (Optional)
   - Add any extra information
   - Treatment recommendations
   - Follow-up instructions

4. Click **"Upload Report"** button

**Success:**
- Shows confirmation message
- Report added to patient's record
- Visible immediately on patient dashboard
- Form resets for next entry

### 🏥 **Add Condition Tab**

Add chronic medical conditions:
1. **Medical Condition*** (Required)
   - e.g., "Hypertension", "Type 2 Diabetes", "Asthma"

2. **Date Diagnosed*** (Required)
   - When was it diagnosed?

3. **Severity*** (Required)
   - Mild
   - Moderate  
   - Severe

4. **Additional Notes** (Optional)
   - Treatment plan
   - Current medications
   - Management strategy

5. Click **"Add Medical Condition"** button

**Success:**
- Condition added to patient record
- Appears in "Medical Conditions" section on dashboard
- Form resets

### ⚠️ **Add Allergy Tab**

Add allergies to patient record:
1. **Allergy / Allergen*** (Required)
   - e.g., "Penicillin", "Peanuts", "Latex", "Dust"

2. **Allergy Type*** (Required)
   - Food Allergy
   - Drug Allergy
   - Environmental
   - Other

3. **Severity*** (Required)
   - Mild
   - Moderate
   - Severe (Life-threatening)

4. **Reaction / Symptoms** (Optional)
   - Describe what happens
   - e.g., "Skin rash", "Difficulty breathing", "Anaphylaxis"

5. Click **"Add Allergy to Record"** button

**Success:**
- Allergy added with red alert status
- Shows in "Allergies" section on dashboard
- Critical for medical safety

### Step 3: Add More Records or Finish
- Use tabs to add multiple reports, conditions, or allergies
- All changes save immediately
- Click "Back to Dashboard" to view patient records
- Or logout when done

---

## 🧪 Testing the System

### Create a Test Patient

**Method 1: Using API Test Page**
1. Open `api-test.html` in browser
2. Scroll to "Create New Patient" section
3. Edit the JSON data if needed
4. Click "Create Patient" button
5. Copy the Health ID shown in response
6. Use this ID to login

**Method 2: Using Browser Console**
1. Open any page
2. Press F12 to open console
3. Run this code:
```javascript
api.createPatient({
  health_id: 'HV' + Date.now(),
  name: 'Test Patient',
  age: 30,
  gender: 'Male',
  blood_group: 'O+',
  height: 175,
  weight: 70,
  phone: '1234567890',
  email: 'test@example.com'
}).then(result => {
  console.log('Created patient:', result);
  alert('Health ID: ' + result.data.health_id);
});
```

### Test the Complete Flow

1. **Create Test Patient** (see above)
2. **Login as Patient**
   - Go to view-login.html
   - Enter the test Health ID
   - View empty dashboard

3. **Login as Hospital**
   - Go to edit-login.html
   - Use demo credentials
   - Enter test patient's Health ID

4. **Add Test Data**
   - Add a medical report
   - Add a condition (e.g., "Hypertension")
   - Add an allergy (e.g., "Penicillin")

5. **View as Patient Again**
   - Logout from hospital portal
   - Login as patient with same Health ID
   - See all the data you just added!

---

## 🎨 Understanding the UI

### Color Coding

**Profile Card**
- Purple/Indigo gradient = Patient information
- Clean, modern, soothing colors

**Status Badges**
- 🟢 Green = Normal / Healthy
- 🟡 Yellow = Needs Review / Warning
- 🔴 Red = Critical / Allergy

**Report Cards**
- Each report has unique icon color
- Hover effect for interactivity
- Shadow effects for depth

**Buttons**
- Primary (Indigo): Main actions
- Secondary (Purple): Alternative actions
- Danger (Red): Delete/Alert actions
- Success (Green): Confirmations

### Icons Meaning

- 🏥 Hospital/Medical Facility
- 🩺 Doctor/Healthcare Provider
- 📋 Medical Report
- ❤️ Health/Vitals
- ⚠️ Allergy/Warning
- ✓ Success/Confirmed
- ℹ️ Information
- 🔒 Security/Login
- 👤 User/Patient
- 📅 Date/Calendar
- 📄 Document/File
- ➕ Add New
- ✏️ Edit
- 🗑️ Delete

---

## 📱 Mobile Experience

The system is fully responsive:

**Mobile (< 768px)**
- Single column layout
- Stacked cards
- Full-width buttons
- Touch-friendly targets
- Simplified navigation

**Tablet (768px - 1024px)**
- 2-column grid for reports
- Side-by-side cards
- Optimized spacing

**Desktop (> 1024px)**
- 3-column grid for reports
- Maximum information density
- Sidebar potential
- Wide profile cards

---

## 🔐 Security & Privacy

### Current Demo Mode
- ⚠️ **For demonstration only**
- No real authentication
- No data encryption
- Session-based only
- No password requirements

### What's Stored
- **Session Storage** (temporary):
  - Health ID
  - Mode flags (view/edit/hospital)
  - Cached patient data

- **Backend Database** (persistent):
  - Patient records
  - Medical reports
  - Conditions
  - Allergies

### Data Access
- Patient view: Read-only access
- Hospital view: Can add records
- No edit/update of existing records (except delete)

---

## ❓ FAQ

### How do I get a Health ID?
- In production: Assigned by healthcare system
- For testing: Create via api-test.html or console

### Can I update my profile information?
- Currently: View-only for patients
- Future: Edit profile feature planned
- Hospital: Can only add new records

### Can I delete records?
- Patients: No (view-only)
- Hospitals: Yes (in edit mode)
- Requires confirmation

### What file types can I upload?
- PDF documents
- JPG/JPEG images
- PNG images
- Maximum 10MB per file

### Is my data secure?
- Demo mode: Not encrypted
- Production needs: HTTPS, encryption, auth

### Can multiple hospitals add to my record?
- Yes! Any authenticated hospital can add records
- All records are linked to your Health ID
- Audit trail maintained

### What if I forget my Health ID?
- Contact healthcare provider
- Check medical documents
- Patient ID recovery feature (future)

---

## 🚀 Next Steps

### For Developers
- Review API-INTEGRATION-COMPLETE.md
- Check TROUBLESHOOTING.md if issues
- Test with api-test.html
- Monitor browser console for errors

### For Users
- Request your Health ID from hospital
- Bookmark the application URL
- Keep Health ID confidential
- Check records regularly

### For Hospitals
- Get hospital credentials
- Train staff on portal usage
- Ensure patient consent before access
- Maintain accurate records

---

## 📞 Support

### Common Issues
See `TROUBLESHOOTING.md` for detailed solutions

### Quick Fixes
- **Can't login**: Check Health ID format
- **No data showing**: Check backend connection
- **Forms not working**: Check browser console
- **Page not loading**: Clear cache and retry

### Resources
- `README.md` - Project overview
- `START-HERE-API.md` - API documentation
- `API-INTEGRATION-COMPLETE.md` - Technical details
- `TROUBLESHOOTING.md` - Problem solving

---

**Welcome to HealthVault ID - Your Digital Medical Vault! 🏥💙**

---

**Version:** 1.0.0  
**Last Updated:** January 2024  
**Status:** ✅ Fully Functional (Demo Mode)
