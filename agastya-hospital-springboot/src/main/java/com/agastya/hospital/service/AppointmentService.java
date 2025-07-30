package com.agastya.hospital.service;

import com.agastya.hospital.entity.Appointment;
import com.agastya.hospital.entity.AppointmentStatus;
import com.agastya.hospital.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    // Create a new appointment
    public Appointment createAppointment(Appointment appointment) {
        appointment.setStatus(AppointmentStatus.PENDING);
        appointment.setCreatedAt(LocalDateTime.now());
        return appointmentRepository.save(appointment);
    }

    // Get all appointments
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAllByOrderByCreatedAtDesc();
    }

    // Get appointment by ID
    public Optional<Appointment> getAppointmentById(Long id) {
        return appointmentRepository.findById(id);
    }

    // Get appointments by status
    public List<Appointment> getAppointmentsByStatus(AppointmentStatus status) {
        return appointmentRepository.findByStatus(status);
    }

    // Update appointment status
    public Appointment updateAppointmentStatus(Long id, AppointmentStatus status) {
        Optional<Appointment> appointmentOpt = appointmentRepository.findById(id);
        if (appointmentOpt.isPresent()) {
            Appointment appointment = appointmentOpt.get();
            appointment.setStatus(status);
            appointment.setUpdatedAt(LocalDateTime.now());
            return appointmentRepository.save(appointment);
        }
        throw new RuntimeException("Appointment not found with id: " + id);
    }

    // Update appointment (full update)
    public Appointment updateAppointment(Long id, Appointment appointmentUpdate) {
        Optional<Appointment> appointmentOpt = appointmentRepository.findById(id);
        if (appointmentOpt.isPresent()) {
            Appointment appointment = appointmentOpt.get();
            appointment.setName(appointmentUpdate.getName());
            appointment.setEmail(appointmentUpdate.getEmail());
            appointment.setPhone(appointmentUpdate.getPhone());
            appointment.setService(appointmentUpdate.getService());
            appointment.setMessage(appointmentUpdate.getMessage());
            appointment.setStatus(appointmentUpdate.getStatus());
            appointment.setUpdatedAt(LocalDateTime.now());
            return appointmentRepository.save(appointment);
        }
        throw new RuntimeException("Appointment not found with id: " + id);
    }

    // Delete appointment
    public void deleteAppointment(Long id) {
        if (appointmentRepository.existsById(id)) {
            appointmentRepository.deleteById(id);
        } else {
            throw new RuntimeException("Appointment not found with id: " + id);
        }
    }

    // Get appointment statistics
    public AppointmentStats getAppointmentStats() {
        long total = appointmentRepository.count();
        long pending = appointmentRepository.countByStatus(AppointmentStatus.PENDING);
        long confirmed = appointmentRepository.countByStatus(AppointmentStatus.CONFIRMED);
        long cancelled = appointmentRepository.countByStatus(AppointmentStatus.CANCELLED);
        
        return new AppointmentStats(total, pending, confirmed, cancelled);
    }

    // Search appointments
    public List<Appointment> searchAppointments(String searchTerm) {
        return appointmentRepository.searchByNameOrEmail(searchTerm);
    }

    // Get recent appointments (last 30 days)
    public List<Appointment> getRecentAppointments() {
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        return appointmentRepository.findRecentAppointments(thirtyDaysAgo);
    }

    // Get appointments by service
    public List<Appointment> getAppointmentsByService(String service) {
        return appointmentRepository.findByService(service);
    }

    // Inner class for appointment statistics
    public static class AppointmentStats {
        private long total;
        private long pending;
        private long confirmed;
        private long cancelled;

        public AppointmentStats(long total, long pending, long confirmed, long cancelled) {
            this.total = total;
            this.pending = pending;
            this.confirmed = confirmed;
            this.cancelled = cancelled;
        }

        // Getters
        public long getTotal() { return total; }
        public long getPending() { return pending; }
        public long getConfirmed() { return confirmed; }
        public long getCancelled() { return cancelled; }

        // Setters
        public void setTotal(long total) { this.total = total; }
        public void setPending(long pending) { this.pending = pending; }
        public void setConfirmed(long confirmed) { this.confirmed = confirmed; }
        public void setCancelled(long cancelled) { this.cancelled = cancelled; }
    }
}

