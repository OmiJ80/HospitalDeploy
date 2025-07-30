# Agastya Hospital Appointment System - Spring Boot Backend

## 🏥 Overview

This is a complete Spring Boot backend application for the Agastya Hospital appointment management system. It provides REST APIs for appointment submission, management, and an admin dashboard for hospital staff.

## 🔐 **Authentication & Security**

### **Admin Dashboard Access**
The admin dashboard is now **protected with authentication**. You must log in to access appointment management features.

### **Authentication Configuration**
Admin credentials are now managed securely using environment variables:

**Environment Variables:**
- `ADMIN_USERNAME` - Username for primary admin (defaults to "admin" if not set)
- `ADMIN_PASSWORD` - Password for primary admin (defaults to a secure password if not set)
- `HOSPITAL_ADMIN_USERNAME` - Username for hospital admin (defaults to "hospital_admin" if not set)
- `HOSPITAL_ADMIN_PASSWORD` - Password for hospital admin (defaults to a secure password if not set)

**Important:** For production use, always set these environment variables with secure values.

### **Access URLs**
- **Login Page**: http://localhost:8080/login
- **Admin Dashboard**: http://localhost:8080/admin (requires login)
- **Main Website**: http://localhost:8080 (public access)

### **Security Features**
- ✅ **Form-based authentication** with custom login page
- ✅ **Session management** with 30-minute timeout
- ✅ **Protected admin routes** - requires ADMIN role
- ✅ **Public API endpoints** for appointment submission
- ✅ **Logout functionality** with session invalidation
- ✅ **CSRF protection** for forms
- ✅ **Password encryption** using BCrypt

## 🚀 Features

### **Backend Features**
- ✅ **Spring Boot 3.2.0** with Java 17
- ✅ **REST API** endpoints for appointment management
- ✅ **JPA/Hibernate** for database operations
- ✅ **H2 Database** (in-memory for development)
- ✅ **Input Validation** with Bean Validation
- ✅ **CORS Support** for frontend integration
- ✅ **Admin Dashboard** with Thymeleaf templates

### **API Endpoints**
- `POST /api/appointments/submit` - Submit new appointment
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/{id}` - Get appointment by ID
- `GET /api/appointments/status/{status}` - Get appointments by status
- `PUT /api/appointments/{id}/status` - Update appointment status
- `PUT /api/appointments/{id}/confirm` - Confirm appointment
- `PUT /api/appointments/{id}/cancel` - Cancel appointment
- `GET /api/appointments/stats` - Get appointment statistics
- `GET /admin` - Admin dashboard

## 📋 Prerequisites

- **Java 17** or higher
- **Maven 3.6+** (or use the included Maven wrapper)
- **Web browser** for testing

## 🛠️ Installation & Setup

### **1. Navigate to Project Directory**
```bash
cd agastya-hospital-springboot
```

### **2. Build the Project**
```bash
./mvnw clean install
```
*Or if you have Maven installed:*
```bash
mvn clean install
```

### **3. Run the Application**
```bash
./mvnw spring-boot:run
```
*Or:*
```bash
mvn spring-boot:run
```

### **4. Access the Application**
- **Main Website**: http://localhost:8080
- **Admin Dashboard**: http://localhost:8080/admin
- **H2 Database Console**: http://localhost:8080/h2-console
- **API Documentation**: http://localhost:8080/api/appointments

## 🌐 Usage

### **For Patients (Main Website)**
1. Visit http://localhost:8080
2. Fill out the appointment form
3. Submit the form to receive an appointment ID
4. Form data is automatically saved to the database

### **For Hospital Staff (Admin Dashboard)**
1. Visit http://localhost:8080/admin
2. **You will be redirected to the login page**
3. **Enter your admin credentials**
4. **After successful login**, you'll be redirected to the admin dashboard
5. View real-time appointment statistics
6. Filter appointments by status (All, Pending, Confirmed, Cancelled)
7. Confirm or cancel appointment requests
8. Dashboard auto-refreshes every 30 seconds
9. **Click "Logout" to end your session**

### **Authentication Flow**
1. **Unauthenticated users** trying to access `/admin` are redirected to `/login`
2. **Login form** validates credentials against server-side authentication
3. **Successful login** creates a session and redirects to admin dashboard
4. **Session expires** after 30 minutes of inactivity
5. **Logout** invalidates the session and redirects to login page

## 📊 Database

### **H2 Database Console**
- **URL**: http://localhost:8080/h2-console
- **JDBC URL**: `jdbc:h2:mem:hospitaldb`
- **Username**: `sa`
- **Password**: `password`

### **Database Schema**
```sql
CREATE TABLE appointments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    service VARCHAR(50) NOT NULL,
    message TEXT,
    status VARCHAR(20) DEFAULT 'PENDING',
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

## 🔧 Configuration

### **Application Properties**
The application can be configured via `src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080

# Database Configuration
spring.datasource.url=jdbc:h2:mem:hospitaldb
spring.datasource.username=sa
spring.datasource.password=password

# JPA Configuration
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
```

### **Production Database**
To use MySQL in production, update the properties:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hospital_db
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
```

## 📱 API Testing

### **Submit Appointment (POST)**
```bash
curl -X POST http://localhost:8080/api/appointments/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "service": "General Medicine",
    "message": "Need consultation"
  }'
```

### **Get All Appointments (GET)**
```bash
curl http://localhost:8080/api/appointments
```

### **Get Appointment Statistics (GET)**
```bash
curl http://localhost:8080/api/appointments/stats
```

### **Update Appointment Status (PUT)**
```bash
curl -X PUT http://localhost:8080/api/appointments/1/status \
  -H "Content-Type: application/json" \
  -d '{"status": "CONFIRMED"}'
```

## 🏗️ Project Structure

```
src/
├── main/
│   ├── java/com/agastya/hospital/
│   │   ├── HospitalApplication.java          # Main Spring Boot class
│   │   ├── controller/
│   │   │   ├── AppointmentController.java    # REST API endpoints
│   │   │   └── AdminController.java          # Admin dashboard
│   │   ├── entity/
│   │   │   ├── Appointment.java              # JPA entity
│   │   │   └── AppointmentStatus.java        # Status enum
│   │   ├── repository/
│   │   │   └── AppointmentRepository.java    # Data access layer
│   │   └── service/
│   │       └── AppointmentService.java       # Business logic
│   ├── resources/
│   │   ├── application.properties            # Configuration
│   │   ├── static/                          # Frontend files
│   │   │   ├── index.html
│   │   │   ├── css/style.css
│   │   │   ├── js/script.js
│   │   │   └── images/
│   │   └── templates/
│   │       └── admin-dashboard.html          # Admin dashboard
│   └── test/                                # Unit tests
└── pom.xml                                  # Maven dependencies
```

## 🔒 Security Features

- **Input Validation**: All appointment fields are validated
- **CORS Configuration**: Properly configured for frontend access
- **SQL Injection Prevention**: JPA/Hibernate protects against SQL injection
- **XSS Protection**: Input sanitization and validation

## 📈 Monitoring

The application includes Spring Boot Actuator endpoints:
- **Health Check**: http://localhost:8080/actuator/health
- **Application Info**: http://localhost:8080/actuator/info
- **Metrics**: http://localhost:8080/actuator/metrics

## 🚀 Deployment

### **JAR Deployment**
```bash
./mvnw clean package
java -jar target/hospital-appointment-system-1.0.0.jar
```

### **Docker Deployment**
```dockerfile
FROM openjdk:17-jdk-slim
COPY target/hospital-appointment-system-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## 🆘 Troubleshooting

### **Common Issues**

1. **Port 8080 already in use**
   - Change port in `application.properties`: `server.port=8081`

2. **Database connection issues**
   - Check H2 console at http://localhost:8080/h2-console
   - Verify JDBC URL: `jdbc:h2:mem:hospitaldb`

3. **CORS errors**
   - CORS is configured in `HospitalApplication.java`
   - Check browser console for specific errors

## 📞 Support

For technical support or questions about the Spring Boot backend:
- Check the application logs for error details
- Use H2 console to inspect database state
- Test API endpoints with curl or Postman

---

**🏥 Your Agastya Hospital Spring Boot backend is ready for production use!**

