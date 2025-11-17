# 🚀 HealthVault ID - Quick Reference

## 📂 File Structure
```
DHANVANTARI/
├── index.html           → Auto-redirects to home.html
├── home.html            → Landing page / Hero
├── view-login.html      → Patient login (read-only)
├── edit-login.html      → Hospital/Doctor login (edit mode)
├── dashboard.html       → Patient dashboard with reports
├── add-report.html      → Upload new medical report
├── README.md            → Full documentation
└── GUIDE.md             → User guide
```

## 🎯 Page Flow
```
index.html → home.html
                ├── view-login.html → dashboard.html
                └── edit-login.html → dashboard.html → add-report.html
```

## 🔑 Test Credentials

### View Mode (Patient)
```
Health ID: HV123456789
```

### Edit Mode (Hospital/Doctor)
```
Method 1 - Password:
- Health ID: HV123456789
- Password: doctor123

Method 2 - OTP:
- Health ID: HV123456789
- Phone: +1 (555) 123-4567
- OTP: 123456
```

## 🎨 Color Palette

### Primary Colors
```css
Indigo:  #6366f1
Purple:  #8b5cf6
Teal:    #06b6d4
```

### Status Colors
```css
Success: #10b981 (Green)
Warning: #f59e0b (Yellow)
Error:   #ef4444 (Red)
Info:    #3b82f6 (Blue)
```

### Gradients
```css
Hero:    linear-gradient(135deg, #667eea 0%, #764ba2 50%, #06b6d4 100%)
Button:  linear-gradient(to right, #6366f1, #8b5cf6)
Card:    linear-gradient(to bottom right, #6366f1, #8b5cf6)
```

## 🧩 Reusable Classes

### Containers
```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <!-- Content -->
</div>
```

### Cards
```html
<div class="bg-white rounded-2xl p-6 smooth-shadow card-hover">
  <!-- Card content -->
</div>
```

### Buttons
```html
<!-- Primary -->
<button class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-8 rounded-xl font-semibold btn-hover">
  Button Text
</button>

<!-- Secondary -->
<button class="bg-white text-indigo-600 py-4 px-8 rounded-xl font-semibold border-2 border-indigo-600 hover:bg-indigo-50">
  Button Text
</button>
```

### Badges
```html
<!-- Success -->
<span class="badge bg-green-50 text-green-700">Normal</span>

<!-- Warning -->
<span class="badge bg-yellow-50 text-yellow-700">Review</span>

<!-- Error -->
<span class="badge bg-red-50 text-red-700">Critical</span>
```

### Input Fields
```html
<input 
  type="text" 
  class="w-full px-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:bg-white transition"
  placeholder="Enter text"
/>
```

## 🎭 Icons (RemixIcon)

### Common Icons Used
```html
<!-- Medical -->
<i class="ri-heart-pulse-fill"></i>        <!-- Logo -->
<i class="ri-hospital-line"></i>           <!-- Hospital -->
<i class="ri-stethoscope-line"></i>        <!-- Doctor -->
<i class="ri-test-tube-line"></i>          <!-- Lab -->
<i class="ri-capsule-line"></i>            <!-- Medicine -->

<!-- Actions -->
<i class="ri-eye-line"></i>                <!-- View -->
<i class="ri-add-line"></i>                <!-- Add -->
<i class="ri-close-line"></i>              <!-- Close -->
<i class="ri-upload-2-line"></i>           <!-- Upload -->
<i class="ri-logout-box-line"></i>         <!-- Logout -->

<!-- Information -->
<i class="ri-user-line"></i>               <!-- User -->
<i class="ri-calendar-line"></i>           <!-- Date -->
<i class="ri-file-text-line"></i>          <!-- Document -->
<i class="ri-shield-check-line"></i>       <!-- Security -->
```

[Find more icons](https://remixicon.com/)

## 📱 Responsive Breakpoints

```css
/* Mobile First */
Default:      < 640px

/* Tablet */
sm:           640px
md:           768px

/* Desktop */
lg:           1024px
xl:           1280px
2xl:          1536px
```

### Usage Example
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- 1 col mobile, 2 cols tablet, 3 cols desktop -->
</div>
```

## 💾 Session Storage

### Store Data
```javascript
sessionStorage.setItem('healthId', 'HV123456789');
sessionStorage.setItem('editMode', 'true');
```

### Retrieve Data
```javascript
const healthId = sessionStorage.getItem('healthId');
const editMode = sessionStorage.getItem('editMode') === 'true';
```

### Clear Session
```javascript
sessionStorage.clear();
```

## 🔧 Custom CSS Classes

### Animations
```css
.fade-in          → Fade in on page load
.float-animation  → Floating up/down
.card-hover       → Lift on hover
.btn-hover        → Button hover effect
```

### Effects
```css
.smooth-shadow    → Soft shadow
.glass            → Glassmorphism
.gradient-bg      → Gradient background
```

## 🎯 JavaScript Functions

### Navigation
```javascript
// Redirect
window.location.href = 'page.html';

// Go back
window.history.back();
```

### Form Handling
```javascript
form.addEventListener('submit', function(e) {
  e.preventDefault();
  // Your code
});
```

### File Upload
```javascript
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  // Handle file
});
```

## 📋 Dummy Data Structure

### Patient Profile
```javascript
{
  name: "John Doe",
  healthId: "HV123456789",
  age: "34 years",
  gender: "Male",
  bloodGroup: "O+",
  height: "175 cm",
  weight: "70 kg",
  bmi: "22.9",
  allergies: ["Penicillin", "Peanuts", "Dust"],
  conditions: ["Hypertension", "Type 2 Diabetes"]
}
```

### Medical Report
```javascript
{
  id: 1,
  name: "Complete Blood Count",
  hospital: "City General Hospital",
  doctor: "Dr. Sarah Johnson",
  date: "2024-01-15",
  status: "Normal",
  icon: "ri-test-tube-line",
  iconColor: "from-blue-500 to-cyan-500"
}
```

## 🎨 Tailwind Config

```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#8b5cf6',
        accent: '#06b6d4',
      }
    }
  }
}
```

## 🔍 Quick Fixes

### Problem: Styles not loading
```
Solution: Check internet connection for CDN
```

### Problem: Icons not showing
```
Solution: Add RemixIcon CDN link
```

### Problem: Can't login
```
Solution: Use test credentials from above
```

### Problem: Page refresh loses login
```
Solution: Expected - using sessionStorage
```

## 📦 CDN Links

### Tailwind CSS
```html
<script src="https://cdn.tailwindcss.com"></script>
```

### RemixIcon
```html
<link href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css" rel="stylesheet">
```

### Google Fonts (Inter)
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```

## 🚀 Quick Start Commands

### Open in Browser
```bash
# Windows
start home.html

# Mac
open home.html

# Linux
xdg-open home.html
```

### Simple HTTP Server
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Then visit: `http://localhost:8000/home.html`

## 📊 Component Hierarchy

```
Page
└── Navbar
    ├── Logo
    └── Links/Logout
└── Main Content
    ├── Header
    ├── Cards/Sections
    │   ├── Profile Card
    │   ├── Reports Grid
    │   └── Form Elements
    └── Floating Button (optional)
└── Footer
    ├── Company Info
    ├── Links
    └── Social Media
```

## 🎯 Key Features Checklist

- ✅ Responsive design
- ✅ Modern gradient UI
- ✅ Smooth animations
- ✅ Form validation
- ✅ File upload UI
- ✅ Session management
- ✅ Multiple page views
- ✅ Icon system
- ✅ Status badges
- ✅ Hover effects

## 🔗 Useful Links

- [Tailwind Docs](https://tailwindcss.com/docs)
- [RemixIcon](https://remixicon.com/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Can I Use](https://caniuse.com/)

## 📝 Notes

- No backend required for demo
- All data is static/session-based
- Works offline after initial CDN load
- Mobile-first responsive design
- Cross-browser compatible

---

**Made with ❤️ for HealthVault ID**
