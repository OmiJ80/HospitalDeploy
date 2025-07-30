# 🏥 Agastya Hospital Management System

A complete hospital management system built with Spring Boot that enables patient appointment booking and provides a comprehensive admin dashboard for managing patient requests.

## 🌟 Features

### For Patients
- **Easy Appointment Booking**: User-friendly web form for booking appointments
- **Service Selection**: Choose from Ayurvedic Treatment, General Medicine, Health Consultation, and Wellness Therapy
- **Instant Confirmation**: Receive appointment ID and confirmation message
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### For Administrators
- **Secure Login System**: Protected admin access with Spring Security
- **Comprehensive Dashboard**: View all patient appointments with statistics
- **Advanced Management**: Filter, search, and bulk update appointment statuses
- **Real-time Statistics**: Track total, pending, confirmed, and cancelled appointments
- **Data Export**: Export appointment data to CSV format
- **Secure Logout**: Proper session management and logout functionality

## 🚀 Quick Start

### Prerequisites
- Java 17 or higher
- Maven 3.6 or higher

### Running the Application
1. **Extract the project files**
2. **Navigate to the project directory**
   ```bash
   cd agastya-hospital-springboot
   ```
3. **Build the application**
   ```bash
   mvn clean package -DskipTests
   ```
4. **Run the application**
   ```bash
   java -jar target/hospital-appointment-system-1.0.0.jar
   ```
5. **Access the application**
   - Open your browser and go to `http://localhost:8080`

## 🔐 Admin Access

### Login Credentials
- **Primary Admin**: Username: `admin`, Password: `admin123`
- **Alternative Admin**: Username: `hospital_admin`, Password: `agastya@2024`

### Admin Dashboard Features
- View all patient appointments in a table format
- Filter appointments by status (All, Pending, Confirmed, Cancelled)
- Search appointments by patient name, email, phone, or service
- Bulk confirm or cancel multiple appointments
- Export appointment data to CSV
- Real-time statistics dashboard

## 📱 Application Flow

### Patient Journey
1. Visit the main hospital website
2. Navigate to the "Book an Appointment" section
3. Fill out the appointment form with personal details and service preference
4. Submit the form and receive confirmation with appointment ID

### Admin Journey
1. Click "Admin Login" from the main page
2. Enter admin credentials on the login page
3. Access the admin dashboard to view and manage appointments
4. Use filtering, searching, and bulk operations to manage patient requests
5. Logout securely when done

## 🛠 Technology Stack

- **Backend**: Spring Boot 3.2.0, Spring Security, Spring Data JPA
- **Database**: H2 (in-memory for demo, configurable for production)
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Build Tool**: Maven
- **Java Version**: 17

## 📁 Project Structure

```
agastya-hospital-springboot/
├── src/main/java/com/agastya/hospital/
│   ├── HospitalApplication.java          # Main application class
│   ├── config/SecurityConfig.java        # Security configuration
│   ├── controller/                       # REST controllers
│   ├── entity/                          # JPA entities
│   ├── repository/                      # Data repositories
│   └── service/                         # Business logic
├── src/main/resources/
│   ├── application.properties           # Application configuration
│   └── static/                         # Frontend files
│       ├── index.html                  # Main hospital website
│       ├── login.html                  # Admin login page
│       ├── admin-dashboard.html        # Admin dashboard
│       ├── css/style.css              # Styling
│       ├── js/script.js               # JavaScript functionality
│       └── images/                    # Hospital images
└── target/                            # Built application
```

## 🔧 Configuration

### Database Configuration
The application uses H2 in-memory database by default. For production, update `application.properties`:

```properties
# For MySQL
spring.datasource.url=jdbc:mysql://localhost:3306/agastya_hospital
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect
```

### Port Configuration
To change the default port (8080), add to `application.properties`:
```properties
server.port=8081
```

## 🔒 Security Features

- **Spring Security Integration**: Comprehensive security framework
- **Password Encryption**: BCrypt password hashing
- **Session Management**: Secure session handling
- **Role-based Access Control**: Admin-only access to dashboard
- **CSRF Protection**: Configurable CSRF protection
- **Secure Logout**: Proper session invalidation

## 📊 API Endpoints

### Public Endpoints
- `GET /` - Main hospital website
- `POST /api/appointments/submit` - Submit new appointment
- `GET /login.html` - Admin login page

### Protected Endpoints (Admin Only)
- `GET /admin-dashboard.html` - Admin dashboard
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/stats` - Get appointment statistics
- `PUT /api/appointments/{id}/status` - Update appointment status

## 🚀 Deployment Options

### Local Development
```bash
mvn spring-boot:run
```

### Production JAR
```bash
mvn clean package -DskipTests
java -jar target/hospital-appointment-system-1.0.0.jar
```

### Docker Deployment
```dockerfile
FROM openjdk:17-jre-slim
COPY target/hospital-appointment-system-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## 📝 Customization

### Adding New Services
1. Update the service dropdown in `index.html`
2. Modify appointment form validation if needed
3. Update admin dashboard filters

### Styling Changes
- Modify `static/css/style.css` for visual customization
- Update HTML templates for layout changes

### Database Schema Changes
- Modify the `Appointment` entity
- Update repository and service layers accordingly

## 🐛 Troubleshooting

### Common Issues
1. **Port already in use**: Change port in `application.properties`
2. **Login issues**: Verify admin credentials
3. **Build failures**: Ensure Java 17 and Maven are properly installed

### Logs
Check console output for detailed error messages and application logs.

## 📄 License

This project is for educational and demonstration purposes.

## 🤝 Support

For questions or issues, refer to the included `DEPLOYMENT_GUIDE.md` for detailed instructions.

---

**Built with ❤️ for Agastya Hospital**

