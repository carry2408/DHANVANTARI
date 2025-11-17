# HealthVault ID - Personal Health Record System

A modern, responsive, and beautifully designed Personal Health Record (PHR) system with a soothing medical-grade UI.

![HealthVault ID](https://img.shields.io/badge/HealthVault-ID-6366f1?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

## 🎨 Design Features

- **Modern & Clean UI**: Soothing gradient backgrounds (blue, teal, purple tones)
- **Glassmorphism Effects**: Subtle shadows and backdrop blur effects
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Smooth Animations**: Hover effects, transitions, and fade-in animations
- **Medical-Grade Aesthetics**: Professional color palette suitable for healthcare
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **RemixIcons**: Beautiful icon set for consistent visual language

## 📁 Project Structure

```
DHANVANTARI/
│
├── home.html              # Landing page with hero section
├── view-login.html        # Patient login (view mode)
├── edit-login.html        # Hospital/Doctor login (edit mode)
├── dashboard.html         # Patient dashboard with records
├── add-report.html        # Add new medical report
├── index.html             # (Your existing file)
└── README.md              # This file
```

## 📄 Pages Overview

### 1️⃣ Home Page (`home.html`)
- **Hero Section**: Large title with gradient text and call-to-action buttons
- **Features Section**: Three feature cards showcasing key benefits
- **Navigation**: Clean navbar with logo
- **Footer**: Contact information and links
- **Buttons**: 
  - "View My Records" → Links to `view-login.html`
  - "Hospital/Doctor Login" → Links to `edit-login.html`

### 2️⃣ View Login Page (`view-login.html`)
- **Simple Card UI**: Centered login card with smooth shadows
- **Single Input**: Health ID field
- **Validation**: Client-side form validation
- **Responsive**: Mobile-friendly layout
- **Navigation**: Link to Hospital/Doctor login

### 3️⃣ Edit Login Page (`edit-login.html`)
- **Two Login Methods**: 
  - Password authentication
  - OTP authentication (with tab switching)
- **Form Fields**:
  - Patient Health ID
  - Password / Phone Number
  - OTP input (6-digit)
- **Features**:
  - Password visibility toggle
  - Remember me checkbox
  - Forgot password link
- **Security**: Visual indicators for secure access

### 4️⃣ Patient Dashboard (`dashboard.html`)
- **Profile Card**: 
  - Patient name and Health ID
  - Age, gender, blood group
  - Height, weight, BMI
- **Medical Information**:
  - Allergies list with badges
  - Medical conditions with badges
- **Reports Section**:
  - Grid layout of report cards
  - Each card shows:
    - Report type icon
    - Report name
    - Hospital name
    - Doctor name
    - Date
    - Status badge (Normal/Review)
    - View button
- **Features**:
  - Floating "Add Report" button (only in edit mode)
  - Smooth card hover effects
  - Color-coded report categories
  - Logout functionality

### 5️⃣ Add Report Page (`add-report.html`)
- **File Upload**:
  - Drag & drop area
  - Click to browse
  - File preview with remove option
  - Accepts PDF, JPG, PNG (max 10MB)
- **Form Fields**:
  - Report Name
  - Report Date (with date picker)
  - Hospital/Clinic Name
  - Doctor Name
  - Additional Notes (optional)
- **AI Summary Section**:
  - Visual indicator for AI-powered analysis
  - Informational card about feature
- **Validation**: Required field validation
- **Buttons**: Upload & Cancel options

## 🎯 Component Breakdown

### Reusable Components

#### Navbar
```html
<nav class="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50">
  <!-- Logo and navigation links -->
</nav>
```

#### Footer
```html
<footer class="bg-white/80 backdrop-blur-md mt-32 py-12">
  <!-- Links, contact info, social media -->
</footer>
```

#### Card Component
```html
<div class="bg-white rounded-2xl p-6 smooth-shadow card-hover">
  <!-- Card content -->
</div>
```

#### Button Styles
- Primary: `bg-gradient-to-r from-indigo-600 to-purple-600`
- Secondary: `bg-white border-2 border-indigo-600`
- Hover: `btn-hover` class with transform and shadow

#### Badge Styles
- Success: `bg-green-50 text-green-700`
- Warning: `bg-yellow-50 text-yellow-700`
- Info: `bg-blue-50 text-blue-700`
- Danger: `bg-red-50 text-red-700`

## 🚀 How to Run

### Option 1: Direct Browser Opening
1. Navigate to the project folder
2. Double-click `home.html` to open in your default browser
3. Or right-click → Open with → Choose your browser

### Option 2: Live Server (Recommended)
1. Install a local server:
   - **VS Code**: Install "Live Server" extension
   - **Python**: Run `python -m http.server 8000`
   - **Node.js**: Run `npx http-server`
2. Open `home.html` in your browser via the server

### Option 3: GitHub Pages
1. Push the project to GitHub
2. Go to repository Settings → Pages
3. Select branch and root directory
4. Access via the generated URL

## 💾 Dummy Data

### Test Credentials

**View Mode (Read-only):**
- Health ID: `HV123456789`

**Edit Mode (Hospital/Doctor):**
- Health ID: `HV123456789`
- Password: `doctor123`
- Phone: `+1 (555) 123-4567`
- OTP: `123456`

### Sample Patient Data
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

### Sample Reports
1. Complete Blood Count - City General Hospital
2. ECG Report - Heart Care Center
3. Liver Function Test - Metro Diagnostics
4. Chest X-Ray - Radiology Center
5. Thyroid Function Test - Wellness Lab

## 🎨 Color Palette

```css
Primary Colors:
- Indigo: #6366f1
- Purple: #8b5cf6
- Teal: #06b6d4

Gradients:
- Hero: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #06b6d4 100%)
- Primary Button: linear-gradient(to right, #6366f1, #8b5cf6)
- Secondary Button: linear-gradient(to right, #8b5cf6, #ec4899)

Background:
- Base: gradient-to-br from-blue-50 via-purple-50 to-teal-50

Status Colors:
- Success: #10b981
- Warning: #f59e0b
- Error: #ef4444
- Info: #3b82f6
```

## 🔧 Customization

### Change Color Scheme
Edit the Tailwind config in each HTML file:
```javascript
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color',
        accent: '#your-color',
      }
    }
  }
}
```

### Modify Gradients
Update CSS variables in the `<style>` section:
```css
.hero-gradient {
  background: linear-gradient(135deg, #your-start 0%, #your-end 100%);
}
```

### Change Icons
Icons are from RemixIcons. To change:
1. Visit [RemixIcon.com](https://remixicon.com/)
2. Find your icon
3. Replace class name: `ri-icon-name`

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All pages use Tailwind's responsive utilities:
- `sm:` - Small screens (640px+)
- `md:` - Medium screens (768px+)
- `lg:` - Large screens (1024px+)

## ⚡ Features & Functionality

### Session Management
- Uses `sessionStorage` for user authentication
- Stores `healthId`, `viewMode`, and `editMode`
- Automatic logout on session end
- Redirect to home if not authenticated

### Form Validation
- Required field validation
- File type and size validation
- Date validation (no future dates)
- Phone number format
- Password strength indicators

### Interactive Elements
- Drag & drop file upload
- Tab switching (Password/OTP)
- Password visibility toggle
- Floating action button
- Smooth scroll navigation
- Hover animations

### Accessibility
- Semantic HTML5 elements
- ARIA labels where needed
- Keyboard navigation support
- High contrast ratios
- Focus indicators

## 🔒 Security Notes

⚠️ **Important**: This is a frontend-only prototype. For production:

1. **Backend Integration**: Implement proper API endpoints
2. **Authentication**: Use JWT tokens or OAuth
3. **Encryption**: Encrypt sensitive data in transit and at rest
4. **Validation**: Server-side validation required
5. **File Upload**: Implement virus scanning and secure storage
6. **HTTPS**: Use SSL/TLS certificates
7. **CORS**: Configure proper CORS policies
8. **Rate Limiting**: Prevent brute force attacks
9. **Input Sanitization**: Prevent XSS and SQL injection

## 🎯 Browser Compatibility

Tested and working on:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📚 Dependencies

### CDN Links Used:
- **Tailwind CSS**: `https://cdn.tailwindcss.com`
- **RemixIcons**: `https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css`
- **Google Fonts**: Inter font family

### No Build Tools Required!
This project runs entirely in the browser without any build process.

## 🎓 Learning Resources

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [RemixIcon](https://remixicon.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

## 📝 Future Enhancements

- [ ] Backend API integration
- [ ] Real authentication system
- [ ] Database for storing records
- [ ] AI-powered report summarization
- [ ] Multi-language support
- [ ] Dark mode toggle
- [ ] Print/Export functionality
- [ ] Advanced search and filters
- [ ] Email notifications
- [ ] Two-factor authentication

## 👨‍💻 Development

### Code Style
- Indentation: 4 spaces
- Comments: Added where necessary
- Class naming: Tailwind utility classes
- JavaScript: ES6+ syntax

### Best Practices Followed
- Mobile-first responsive design
- Progressive enhancement
- Semantic HTML5
- Clean and readable code
- Consistent naming conventions
- Modular structure

## 📄 License

This project is created for educational purposes. Feel free to use and modify as needed.

## 🤝 Contributing

This is a prototype project. Suggestions and improvements are welcome!

## 📧 Contact

For questions or support, refer to the footer section of the website.

---

**Built with ❤️ for better healthcare management**

© 2024 HealthVault ID. All rights reserved.
