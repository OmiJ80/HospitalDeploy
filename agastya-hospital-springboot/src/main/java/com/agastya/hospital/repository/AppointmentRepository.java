package com.agastya.hospital.repository;

import com.agastya.hospital.entity.Appointment;
import com.agastya.hospital.entity.AppointmentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    // Find appointments by status
    List<Appointment> findByStatus(AppointmentStatus status);

    // Find appointments by email
    List<Appointment> findByEmail(String email);

    // Find appointments created between dates
    List<Appointment> findByCreatedAtBetween(LocalDateTime startDate, LocalDateTime endDate);

    // Find appointments by service type
    List<Appointment> findByService(String service);

    // Count appointments by status
    long countByStatus(AppointmentStatus status);

    // Find recent appointments (last 30 days)
    @Query("SELECT a FROM Appointment a WHERE a.createdAt >= :thirtyDaysAgo ORDER BY a.createdAt DESC")
    List<Appointment> findRecentAppointments(LocalDateTime thirtyDaysAgo);

    // Find all appointments ordered by creation date (newest first)
    List<Appointment> findAllByOrderByCreatedAtDesc();

    // Search appointments by name or email
    @Query("SELECT a FROM Appointment a WHERE LOWER(a.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(a.email) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Appointment> searchByNameOrEmail(String searchTerm);
}

