# Agastya Hospital - Frontend

## 🏥 Overview

This is the complete frontend for the Agastya Hospital appointment management system. It includes the main website, admin login page, and admin dashboard.

## 📁 Files Included

### **Main Website**
- `index.html` - Main hospital website with appointment form
- `css/style.css` - Complete styling for the website
- `js/script.js` - JavaScript for interactivity and form submission
- `images/` - All images including Dr. Tejashree Jadhav's photo and medical symbols

### **Admin Interface**
- `login.html` - Admin login page with authentication form
- `admin-dashboard.html` - Complete admin dashboard for managing appointments

## 🔐 Admin Credentials

**Primary Admin:**
- Username: `admin`
- Password: `admin123`

**Alternative Admin:**
- Username: `hospital_admin`
- Password: `agastya@2024`

## 🌐 How to Use

### **Option 1: Static File Server (Simple)**
1. Open `index.html` in any web browser for the main website
2. Open `login.html` for admin login (requires backend for authentication)
3. Open `admin-dashboard.html` for admin dashboard (requires backend for data)

### **Option 2: Local Web Server (Recommended)**
```bash
# Using Python
python3 -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then access:
- Main Website: http://localhost:8000
- Admin Login: http://localhost:8000/login.html
- Admin Dashboard: http://localhost:8000/admin-dashboard.html

## 🔗 Backend Integration

This frontend is designed to work with the Spring Boot backend. The JavaScript makes API calls to:

### **Public Endpoints**
- `POST /api/appointments/submit` - Submit appointment form
- `GET /api/appointments/stats` - Get appointment statistics

### **Admin Endpoints (Requires Authentication)**
- `GET /api/appointments` - Get all appointments
- `PUT /api/appointments/{id}/status` - Update appointment status
- `PUT /api/appointments/{id}/confirm` - Confirm appointment
- `PUT /api/appointments/{id}/cancel` - Cancel appointment

## 📱 Features

### **Main Website**
- ✅ Professional hospital design
- ✅ Dr. Tejashree Jadhav's profile with actual photo
- ✅ BAMS MD Medicine qualifications
- ✅ OPD timings: 6:00 PM to 10:00 PM
- ✅ Medical symbols instead of hospital building
- ✅ Responsive design for all devices
- ✅ Interactive appointment form

### **Admin Login**
- ✅ Professional login interface
- ✅ Demo credentials displayed
- ✅ Error handling for invalid credentials
- ✅ Responsive design

### **Admin Dashboard**
- ✅ Real-time appointment statistics
- ✅ Filter appointments by status
- ✅ Confirm/Cancel appointments
- ✅ Auto-refresh every 30 seconds
- ✅ Professional admin interface
- ✅ Logout functionality

## 🎨 Customization

### **Colors and Branding**
- Primary color: `#2563eb` (Blue)
- Success color: `#10b981` (Green)
- Warning color: `#f59e0b` (Orange)
- Error color: `#ef4444` (Red)

### **Images**
- Replace images in the `images/` folder
- Update image paths in HTML files if needed

### **Content**
- Edit HTML files to update text content
- Modify CSS for styling changes
- Update JavaScript for functionality changes

## 🔧 Technical Details

### **Technologies Used**
- HTML5 for structure
- CSS3 for styling (with Flexbox and Grid)
- Vanilla JavaScript for interactivity
- Fetch API for backend communication
- Responsive design principles

### **Browser Compatibility**
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 📞 Support

For technical support:
1. Check browser console for JavaScript errors
2. Verify backend API endpoints are accessible
3. Ensure proper CORS configuration on backend

---

**🏥 Your Agastya Hospital frontend is ready to use!**

