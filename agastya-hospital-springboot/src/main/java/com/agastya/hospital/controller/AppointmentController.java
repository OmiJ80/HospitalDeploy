package com.agastya.hospital.controller;

import com.agastya.hospital.entity.Appointment;
import com.agastya.hospital.entity.AppointmentStatus;
import com.agastya.hospital.service.AppointmentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "*")
public class AppointmentController {

    @Autowired
    private AppointmentService appointmentService;

    // Submit a new appointment
    @PostMapping("/submit")
    public ResponseEntity<?> submitAppointment(@Valid @RequestBody Appointment appointment) {
        try {
            Appointment savedAppointment = appointmentService.createAppointment(appointment);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Appointment submitted successfully!",
                "appointmentId", savedAppointment.getId(),
                "data", savedAppointment
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of(
                    "success", false,
                    "message", "Failed to submit appointment: " + e.getMessage()
                ));
        }
    }

    // Get all appointments
    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        List<Appointment> appointments = appointmentService.getAllAppointments();
        return ResponseEntity.ok(appointments);
    }

    // Get appointment by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getAppointmentById(@PathVariable Long id) {
        Optional<Appointment> appointment = appointmentService.getAppointmentById(id);
        if (appointment.isPresent()) {
            return ResponseEntity.ok(appointment.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("message", "Appointment not found"));
        }
    }

    // Get appointments by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Appointment>> getAppointmentsByStatus(@PathVariable String status) {
        try {
            AppointmentStatus appointmentStatus = AppointmentStatus.valueOf(status.toUpperCase());
            List<Appointment> appointments = appointmentService.getAppointmentsByStatus(appointmentStatus);
            return ResponseEntity.ok(appointments);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Update appointment (full update)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateAppointment(@PathVariable Long id, @Valid @RequestBody Appointment appointmentUpdate) {
        try {
            Appointment updatedAppointment = appointmentService.updateAppointment(id, appointmentUpdate);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Appointment updated successfully",
                "data", updatedAppointment
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    // Update appointment status
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateAppointmentStatus(
            @PathVariable Long id, 
            @RequestBody Map<String, String> statusUpdate) {
        try {
            String statusStr = statusUpdate.get("status");
            AppointmentStatus status = AppointmentStatus.valueOf(statusStr.toUpperCase());
            Appointment updatedAppointment = appointmentService.updateAppointmentStatus(id, status);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Appointment status updated successfully",
                "data", updatedAppointment
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                .body(Map.of("success", false, "message", "Invalid status"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    // Delete appointment
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable Long id) {
        try {
            appointmentService.deleteAppointment(id);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Appointment deleted successfully"
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    // Get appointment statistics
    @GetMapping("/stats")
    public ResponseEntity<AppointmentService.AppointmentStats> getAppointmentStats() {
        AppointmentService.AppointmentStats stats = appointmentService.getAppointmentStats();
        return ResponseEntity.ok(stats);
    }

    // Search appointments
    @GetMapping("/search")
    public ResponseEntity<List<Appointment>> searchAppointments(@RequestParam String q) {
        List<Appointment> appointments = appointmentService.searchAppointments(q);
        return ResponseEntity.ok(appointments);
    }

    // Get recent appointments
    @GetMapping("/recent")
    public ResponseEntity<List<Appointment>> getRecentAppointments() {
        List<Appointment> appointments = appointmentService.getRecentAppointments();
        return ResponseEntity.ok(appointments);
    }

    // Get appointments by service
    @GetMapping("/service/{service}")
    public ResponseEntity<List<Appointment>> getAppointmentsByService(@PathVariable String service) {
        List<Appointment> appointments = appointmentService.getAppointmentsByService(service);
        return ResponseEntity.ok(appointments);
    }

    // Confirm appointment (convenience endpoint)
    @PutMapping("/{id}/confirm")
    public ResponseEntity<?> confirmAppointment(@PathVariable Long id) {
        try {
            Appointment updatedAppointment = appointmentService.updateAppointmentStatus(id, AppointmentStatus.CONFIRMED);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Appointment confirmed successfully",
                "data", updatedAppointment
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("success", false, "message", e.getMessage()));
        }
    }

    // Cancel appointment (convenience endpoint)
    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelAppointment(@PathVariable Long id) {
        try {
            Appointment updatedAppointment = appointmentService.updateAppointmentStatus(id, AppointmentStatus.CANCELLED);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Appointment cancelled successfully",
                "data", updatedAppointment
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(Map.of("success", false, "message", e.getMessage()));
        }
    }
}

