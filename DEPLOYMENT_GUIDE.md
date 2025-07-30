# Agastya Hospital Management System - Deployment Guide

## Overview
This is a complete hospital management system built with Spring Boot that allows patients to book appointments and provides an admin dashboard to manage patient requests.

## Features
- **Patient Booking**: Patients can book appointments through a user-friendly web form
- **Admin Authentication**: Secure login system for hospital administrators
- **Admin Dashboard**: Comprehensive dashboard to view and manage patient appointments
- **Patient List Management**: View, filter, search, and update appointment statuses
- **Responsive Design**: Works on both desktop and mobile devices
- **Logout Functionality**: Secure logout that redirects to the login page

## Technology Stack
- **Backend**: Spring Boot 3.2.0, Spring Security, Spring Data JPA
- **Database**: H2 (in-memory for demo, easily configurable for production)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Build Tool**: Maven
- **Java Version**: 17

## Project Structure
```
agastya-hospital-springboot/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/agastya/hospital/
│   │   │       ├── HospitalApplication.java
│   │   │       ├── config/
│   │   │       │   └── SecurityConfig.java
│   │   │       ├── controller/
│   │   │       │   ├── AppointmentController.java
│   │   │       │   └── AuthController.java
│   │   │       ├── entity/
│   │   │       │   ├── Appointment.java
│   │   │       │   └── AppointmentStatus.java
│   │   │       ├── repository/
│   │   │       │   └── AppointmentRepository.java
│   │   │       └── service/
│   │   │           └── AppointmentService.java
│   │   └── resources/
│   │       ├── application.properties
│   │       └── static/
│   │           ├── css/style.css
│   │           ├── js/script.js
│   │           ├── images/
│   │           ├── index.html
│   │           ├── login.html
│   │           └── admin-dashboard.html
│   └── test/
└── pom.xml
```

## Prerequisites
- Java 17 or higher
- Maven 3.6 or higher
- Git (for cloning the repository)

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd agastya-hospital-springboot
```

### 2. Build the Application
```bash
mvn clean package -DskipTests
```

### 3. Run the Application
```bash
java -jar target/hospital-appointment-system-1.0.0.jar
```

The application will start on `http://localhost:8080`

## Admin Credentials
The system comes with pre-configured admin accounts:

**Primary Admin:**
- Username: `admin`
- Password: `admin123`

**Alternative Admin:**
- Username: `hospital_admin`
- Password: `agastya@2024`

## Application Flow

### 1. Patient Booking Process
1. Patient visits the main website (`/`)
2. Scrolls to the "Book an Appointment" section
3. Fills out the appointment form with:
   - Name
   - Email
   - Phone number
   - Service type (Ayurvedic Treatment, General Medicine, etc.)
   - Message (optional)
4. Submits the form
5. Receives confirmation with appointment ID

### 2. Admin Management Process
1. Admin clicks "Admin Login" from the main page
2. Enters credentials on the login page (`/login.html`)
3. Successfully logs in and is redirected to admin dashboard (`/admin-dashboard.html`)
4. Views patient appointment list with statistics
5. Can filter, search, and manage appointments
6. Can update appointment statuses (Confirm/Cancel)
7. Can export data to CSV
8. Logs out and is redirected back to login page

### 3. Navigation Flow
- **Home Page** → **Admin Login** → **Login Page** → **Admin Dashboard**
- **Admin Dashboard** → **Logout** → **Login Page**
- **Login Page** → **Back to Main Website** → **Home Page**

## API Endpoints

### Public Endpoints
- `GET /` - Main hospital website
- `GET /login.html` - Admin login page
- `POST /api/appointments/submit` - Submit new appointment
- `POST /perform_login` - Admin authentication

### Protected Endpoints (Require Authentication)
- `GET /admin-dashboard.html` - Admin dashboard
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/stats` - Get appointment statistics
- `PUT /api/appointments/{id}/status` - Update appointment status
- `POST /logout` - Admin logout

## Database Configuration

### Development (H2 In-Memory)
The application uses H2 in-memory database by default for easy setup and testing.

### Production Configuration
For production, update `application.properties`:

```properties
# MySQL Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/agastya_hospital
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect

# PostgreSQL Configuration
# spring.datasource.url=jdbc:postgresql://localhost:5432/agastya_hospital
# spring.datasource.username=your_username
# spring.datasource.password=your_password
# spring.datasource.driver-class-name=org.postgresql.Driver
# spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
```

## Security Features
- Spring Security integration
- Password encryption using BCrypt
- Session management
- CSRF protection (disabled for demo simplicity)
- Role-based access control
- Secure logout functionality

## Customization

### Adding New Services
1. Update the service dropdown in `index.html`
2. Modify the `AppointmentController` if needed
3. Update the admin dashboard filters

### Styling Changes
- Modify `static/css/style.css` for visual customization
- Update HTML templates for layout changes

### Database Schema Changes
- Modify the `Appointment` entity
- Update the repository and service layers accordingly

## Troubleshooting

### Common Issues
1. **Port 8080 already in use**: Change the port in `application.properties`
   ```properties
   server.port=8081
   ```

2. **Login not working**: Ensure CSRF is disabled in `SecurityConfig.java`

3. **Static files not loading**: Check the resource handler configuration

### Logs
Application logs are available in the console. For production, configure logging in `application.properties`:

```properties
logging.level.com.agastya.hospital=DEBUG
logging.file.name=hospital-app.log
```

## Production Deployment

### Using Docker
Create a `Dockerfile`:
```dockerfile
FROM openjdk:17-jre-slim
COPY target/hospital-appointment-system-1.0.0.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

Build and run:
```bash
docker build -t agastya-hospital .
docker run -p 8080:8080 agastya-hospital
```

### Using Cloud Platforms
- **Heroku**: Add `system.properties` with `java.runtime.version=17`
- **AWS**: Deploy using Elastic Beanstalk or EC2
- **Google Cloud**: Use App Engine or Compute Engine

## Support
For issues or questions, please refer to the Spring Boot documentation or contact the development team.

## License
This project is for educational and demonstration purposes.

