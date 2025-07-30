// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header Background on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// Fade In Animation on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.service-card, .feature, .contact-item, .doctor-card, .about-content');
    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Form Submission Handler - REMOVED to prevent duplicate submissions
// This form is now handled by the event listener for #appointmentForm below

// Typing Effect for Hero Title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Counter Animation for Statistics (if needed)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    updateCounter();
}

// Add hover effects for service cards
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Preloader (if needed)
document.addEventListener('DOMContentLoaded', function() {
    // Hide preloader after page load
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    });
});

// Add scroll-to-top button functionality
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
    `;
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top when clicked
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize scroll-to-top button
document.addEventListener('DOMContentLoaded', createScrollToTopButton);



// Admin Login Modal Functions
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    document.getElementById('adminUsername').focus();
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
    document.getElementById('adminLoginForm').reset();
    document.getElementById('loginError').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        closeLoginModal();
    }
}

// Hardcoded credentials
const adminCredentials = {
    'admin': 'admin123',
    'hospital_admin': 'agastya@2024'
};

// Admin Login Form Handler
document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    const errorDiv = document.getElementById('loginError');
    const loginBtn = this.querySelector('.login-btn');
    
    // Reset error message
    errorDiv.style.display = 'none';
    
    // Show loading state
    const originalText = loginBtn.textContent;
    loginBtn.textContent = '🔄 Logging in...';
    loginBtn.disabled = true;
    
    // Simulate authentication delay
    setTimeout(() => {
        // Check credentials
        if (adminCredentials[username] && adminCredentials[username] === password) {
            // Successful login
            localStorage.setItem('adminLoggedIn', 'true');
            localStorage.setItem('adminUsername', username);
            
            // Show success message
            loginBtn.textContent = '✅ Login Successful!';
            loginBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            // Redirect to admin dashboard after short delay
            setTimeout(() => {
                window.location.href = 'admin-dashboard.html';
            }, 1000);
        } else {
            // Failed login
            errorDiv.textContent = 'Invalid username or password. Please try again.';
            errorDiv.style.display = 'block';
            
            // Reset button
            loginBtn.textContent = originalText;
            loginBtn.disabled = false;
            
            // Clear password field
            document.getElementById('adminPassword').value = '';
            document.getElementById('adminPassword').focus();
        }
    }, 1500); // Simulate network delay
});

// Check if admin is already logged in (for admin dashboard)
function checkAdminAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    const currentPage = window.location.pathname;
    
    if (currentPage.includes('admin-dashboard.html') && !isLoggedIn) {
        // Redirect to main page if not logged in
        alert('Please log in to access the admin dashboard.');
        window.location.href = 'index.html';
    }
}

// Admin logout function
function adminLogout() {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUsername');
    alert('You have been logged out successfully.');
    window.location.href = 'index.html';
}

// Check authentication on page load
document.addEventListener('DOMContentLoaded', function() {
    checkAdminAuth();
    
    // Update admin dashboard with username if logged in
    const adminUsername = localStorage.getItem('adminUsername');
    if (adminUsername && window.location.pathname.includes('admin-dashboard.html')) {
        const welcomeSpan = document.querySelector('.header span');
        if (welcomeSpan && welcomeSpan.textContent.includes('Welcome')) {
            welcomeSpan.textContent = `Welcome, ${adminUsername}`;
        }
    }
});



// Appointment Form Submission
document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const appointmentData = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                service: formData.get('service'),
                message: formData.get('message')
            };
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            const messageDiv = document.getElementById('appointmentMessage');
            
            try {
                submitButton.textContent = 'Booking...';
                submitButton.disabled = true;
                
                const response = await fetch('/api/appointments/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(appointmentData)
                });
                
                const result = await response.json();
                
                if (result.success) {
                    messageDiv.innerHTML = `
                        <div style="background: #d1fae5; color: #065f46; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                            ✅ Appointment booked successfully! Your appointment ID is #${result.appointmentId}. We will contact you soon.
                        </div>
                    `;
                    messageDiv.style.display = 'block';
                    this.reset();
                } else {
                    throw new Error(result.message || 'Failed to book appointment');
                }
            } catch (error) {
                console.error('Error booking appointment:', error);
                messageDiv.innerHTML = `
                    <div style="background: #fee2e2; color: #991b1b; padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                        ❌ Error booking appointment: ${error.message}
                    </div>
                `;
                messageDiv.style.display = 'block';
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    messageDiv.style.display = 'none';
                }, 5000);
            }
        });
    }
});

// Login Modal Functions
function openLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
}

function closeLoginModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('loginModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}



// New Admin Dashboard JavaScript

// Global variables
let allAppointments = [];
let filteredAppointments = [];
let selectedAppointments = new Set();
let appointmentsTrendChart = null;
let statusDistributionChart = null;

// Initialize dashboard
document.addEventListener("DOMContentLoaded", function() {
    initializeDashboard();
    setupEventListeners();
    loadAppointments();
});

function initializeDashboard() {
    // Set default date filters to current week
    const today = new Date();
    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    document.getElementById("dateFromFilter").value = weekAgo.toISOString().split("T")[0];
    document.getElementById("dateToFilter").value = today.toISOString().split("T")[0];
}

function setupEventListeners() {
    // Search and filter event listeners
    document.getElementById("searchInput").addEventListener("input", debounce(applyFilters, 300));
    document.getElementById("statusFilter").addEventListener("change", applyFilters);
    document.getElementById("serviceFilter").addEventListener("change", applyFilters);
    document.getElementById("dateFromFilter").addEventListener("change", applyFilters);
    document.getElementById("dateToFilter").addEventListener("change", applyFilters);

    // Edit form submission
    document.getElementById("editForm").addEventListener("submit", handleEditSubmit);

    // Auto-refresh every 30 seconds
    setInterval(loadAppointments, 30000);
}

async function loadAppointments() {
    try {
        const response = await fetch("/api/appointments");
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        allAppointments = await response.json();
        
        // Populate service filter options
        populateServiceFilter();
        
        // Apply current filters
        applyFilters();
        
        // Update statistics and charts
        updateStatistics();
        updateCharts();
        
    } catch (error) {
        console.error("Error loading appointments:", error);
        showNotification("Error loading appointments: " + error.message, "error");
        document.getElementById("appointmentsTableBody").innerHTML = 
            "<tr><td colspan=\"10\" class=\"error-message\">Error loading appointments. Please try again.</td></tr>";
    }
}

function populateServiceFilter() {
    const serviceFilter = document.getElementById("serviceFilter");
    const services = [...new Set(allAppointments.map(apt => apt.service))].sort();
    
    // Clear existing options except "All Services"
    serviceFilter.innerHTML = "<option value=\"\">All Services</option>";
    
    services.forEach(service => {
        const option = document.createElement("option");
        option.value = service;
        option.textContent = service;
        serviceFilter.appendChild(option);
    });
}

function applyFilters() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const statusFilter = document.getElementById("statusFilter").value;
    const serviceFilter = document.getElementById("serviceFilter").value;
    const dateFromFilter = document.getElementById("dateFromFilter").value;
    const dateToFilter = document.getElementById("dateToFilter").value;

    filteredAppointments = allAppointments.filter(appointment => {
        // Search filter
        const searchMatch = !searchTerm || 
            appointment.name.toLowerCase().includes(searchTerm) ||
            appointment.email.toLowerCase().includes(searchTerm) ||
            appointment.phone.includes(searchTerm) ||
            appointment.service.toLowerCase().includes(searchTerm);

        // Status filter
        const statusMatch = !statusFilter || appointment.status === statusFilter;

        // Service filter
        const serviceMatch = !serviceFilter || appointment.service === serviceFilter;

        // Date filter
        let dateMatch = true;
        if (dateFromFilter || dateToFilter) {
            const appointmentDate = new Date(appointment.createdAt).toISOString().split("T")[0];
            if (dateFromFilter && appointmentDate < dateFromFilter) dateMatch = false;
            if (dateToFilter && appointmentDate > dateToFilter) dateMatch = false;
        }

        return searchMatch && statusMatch && serviceMatch && dateMatch;
    });

    displayAppointments();
    updateFilteredStatistics();
}

function displayAppointments() {
    const tbody = document.getElementById("appointmentsTableBody");
    
    if (filteredAppointments.length === 0) {
        tbody.innerHTML = "<tr><td colspan=\"10\" class=\"loading\">No appointments found matching the current filters.</td></tr>";
        return;
    }

    tbody.innerHTML = filteredAppointments.map(appointment => `
        <tr>
            <td class=\"checkbox-cell\">
                <input type=\"checkbox\" class=\"appointment-checkbox\" 
                       value=\"${appointment.id}\" 
                       onchange=\"toggleAppointmentSelection(${appointment.id})\">
            </td>
            <td>${appointment.id}</td>
            <td><strong>${appointment.name}</strong></td>
            <td>${appointment.email}</td>
            <td>${appointment.phone}</td>
            <td>${appointment.service}</td>
            <td>${formatDate(appointment.createdAt)}</td>
            <td>
                <span class=\"status-badge status-${appointment.status.toLowerCase()}\">
                    ${appointment.status}
                </span>
            </td>
            <td>${appointment.message || "-"}</td>
            <td>
                <div class=\"action-buttons\">
                    <button class=\"action-btn edit-btn\" onclick=\"editAppointment(${appointment.id})\" title=\"Edit\">
                        ✏️
                    </button>
                    ${appointment.status === "PENDING" ? `
                        <button class=\"action-btn confirm-btn\" onclick=\"confirmAppointment(${appointment.id})\" title=\"Confirm\">
                            ✅
                        </button>
                        <button class=\"action-btn cancel-btn\" onclick=\"cancelAppointment(${appointment.id})\" title=\"Cancel\">
                            ❌
                        </button>
                    ` : ""}
                </div>
            </td>
        </tr>
    `).join("");
}

function updateStatistics() {
    const total = allAppointments.length;
    const pending = allAppointments.filter(apt => apt.status === "PENDING").length;
    const confirmed = allAppointments.filter(apt => apt.status === "CONFIRMED").length;
    const cancelled = allAppointments.filter(apt => apt.status === "CANCELLED").length;

    document.getElementById("totalAppointments").textContent = total;
    document.getElementById("pendingAppointments").textContent = pending;
    document.getElementById("confirmedAppointments").textContent = confirmed;
    document.getElementById("cancelledAppointments").textContent = cancelled;

    // Calculate percentage changes (mock data for demo)
    const totalChange = Math.floor(Math.random() * 20) - 10;
    const pendingChange = Math.floor(Math.random() * 30) - 15;
    const confirmedChange = Math.floor(Math.random() * 25) - 5;
    const cancelledChange = Math.floor(Math.random() * 15) - 10;

    updateChangeIndicator("totalChange", totalChange);
    updateChangeIndicator("pendingChange", pendingChange);
    updateChangeIndicator("confirmedChange", confirmedChange);
    updateChangeIndicator("cancelledChange", cancelledChange);
}

function updateChangeIndicator(elementId, change) {
    const element = document.getElementById(elementId);
    const isPositive = change >= 0;
    
    element.className = `stat-change ${isPositive ? "positive" : "negative"}`;
    element.innerHTML = `
        <span>${isPositive ? "↗️" : "↘️"}</span>
        <span>${isPositive ? "+" : ""}${change}% from last week</span>
    `;
}

function updateFilteredStatistics() {
    // Update display to show filtered results count
    const filteredCount = filteredAppointments.length;
    const totalCount = allAppointments.length;
    
    if (filteredCount !== totalCount) {
        showNotification(`Showing ${filteredCount} of ${totalCount} appointments`, "info");
    }
}

function updateCharts() {
    updateAppointmentsTrendChart();
    updateStatusDistributionChart();
}

function updateAppointmentsTrendChart() {
    const ctx = document.getElementById("appointmentsTrendChart").getContext("2d");
    
    // Generate last 7 days data
    const last7Days = [];
    const appointmentCounts = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        last7Days.push(date.toLocaleDateString("en-US", { month: "short", day: "numeric" }));
        
        // Count appointments for this day
        const dayAppointments = allAppointments.filter(apt => {
            const aptDate = new Date(apt.createdAt);
            return aptDate.toDateString() === date.toDateString();
        });
        appointmentCounts.push(dayAppointments.length);
    }

    if (appointmentsTrendChart) {
        appointmentsTrendChart.destroy();
    }

    appointmentsTrendChart = new Chart(ctx, {
        type: "line",
        data: {
            labels: last7Days,
            datasets: [{
                label: "Appointments",
                data: appointmentCounts,
                borderColor: "#4CAF50",
                backgroundColor: "rgba(76, 175, 80, 0.1)",
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: "#4CAF50",
                pointBorderColor: "#ffffff",
                pointBorderWidth: 2,
                pointRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
}

function updateStatusDistributionChart() {
    const ctx = document.getElementById("statusDistributionChart").getContext("2d");
    
    const pending = allAppointments.filter(apt => apt.status === "PENDING").length;
    const confirmed = allAppointments.filter(apt => apt.status === "CONFIRMED").length;
    const cancelled = allAppointments.filter(apt => apt.status === "CANCELLED").length;

    if (statusDistributionChart) {
        statusDistributionChart.destroy();
    }

    statusDistributionChart = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["Pending", "Confirmed", "Cancelled"],
            datasets: [{
                data: [pending, confirmed, cancelled],
                backgroundColor: ["#FF9800", "#4CAF50", "#f44336"],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: "bottom",
                    labels: {
                        padding: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });
}

// Appointment management functions
async function confirmAppointment(id) {
    await updateAppointmentStatus(id, "CONFIRMED");
}

async function cancelAppointment(id) {
    await updateAppointmentStatus(id, "CANCELLED");
}

async function updateAppointmentStatus(id, status) {
    try {
        const response = await fetch(`/api/appointments/${id}/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status: status })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        showNotification(`Appointment ${status.toLowerCase()} successfully!`, "success");
        loadAppointments(); // Refresh data
        
    } catch (error) {
        console.error("Error updating appointment status:", error);
        showNotification("Error updating appointment status: " + error.message, "error");
    }
}

function editAppointment(id) {
    const appointment = allAppointments.find(apt => apt.id === id);
    if (!appointment) return;

    // Populate edit form
    document.getElementById("editAppointmentId").value = appointment.id;
    document.getElementById("editName").value = appointment.name;
    document.getElementById("editEmail").value = appointment.email;
    document.getElementById("editPhone").value = appointment.phone;
    document.getElementById("editService").value = appointment.service;
    document.getElementById("editStatus").value = appointment.status;
    document.getElementById("editMessage").value = appointment.message || "";

    // Show modal
    document.getElementById("editModal").style.display = "block";
}

function closeEditModal() {
    document.getElementById("editModal").style.display = "none";
}

async function handleEditSubmit(e) {
    e.preventDefault();
    
    const id = document.getElementById("editAppointmentId").value;
    const updatedData = {
        name: document.getElementById("editName").value,
        email: document.getElementById("editEmail").value,
        phone: document.getElementById("editPhone").value,
        service: document.getElementById("editService").value,
        status: document.getElementById("editStatus").value,
        message: document.getElementById("editMessage").value
    };

    try {
        const response = await fetch(`/api/appointments/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        showNotification("Appointment updated successfully!", "success");
        closeEditModal();
        loadAppointments(); // Refresh data
        
    } catch (error) {
        console.error("Error updating appointment:", error);
        showNotification("Error updating appointment: " + error.message, "error");
    }
}

// Bulk operations
function toggleSelectAll() {
    const selectAll = document.getElementById("selectAll");
    const checkboxes = document.querySelectorAll(".appointment-checkbox[value]");
    
    checkboxes.forEach(checkbox => {
        checkbox.checked = selectAll.checked;
        const id = parseInt(checkbox.value);
        if (selectAll.checked) {
            selectedAppointments.add(id);
        } else {
            selectedAppointments.delete(id);
        }
    });
}

function toggleAppointmentSelection(id) {
    if (selectedAppointments.has(id)) {
        selectedAppointments.delete(id);
    } else {
        selectedAppointments.add(id);
    }

    // Update select all checkbox
    const totalCheckboxes = document.querySelectorAll(".appointment-checkbox[value]").length;
    const selectAll = document.getElementById("selectAll");
    selectAll.checked = selectedAppointments.size === totalCheckboxes;
    selectAll.indeterminate = selectedAppointments.size > 0 && selectedAppointments.size < totalCheckboxes;
}

async function bulkConfirm() {
    if (selectedAppointments.size === 0) {
        showNotification("Please select appointments to confirm", "error");
        return;
    }

    const confirmCount = selectedAppointments.size;
    if (!confirm(`Confirm ${confirmCount} selected appointment(s)?`)) return;

    for (const id of selectedAppointments) {
        await updateAppointmentStatus(id, "CONFIRMED");
    }
    
    selectedAppointments.clear();
    document.getElementById("selectAll").checked = false;
}

async function bulkCancel() {
    if (selectedAppointments.size === 0) {
        showNotification("Please select appointments to cancel", "error");
        return;
    }

    const cancelCount = selectedAppointments.size;
    if (!confirm(`Cancel ${cancelCount} selected appointment(s)?`)) return;

    for (const id of selectedAppointments) {
        await updateAppointmentStatus(id, "CANCELLED");
    }
    
    selectedAppointments.clear();
    document.getElementById("selectAll").checked = false;
}

// Utility functions
function refreshData() {
    showNotification("Refreshing data...", "info");
    loadAppointments();
}

function clearFilters() {
    document.getElementById("searchInput").value = "";
    document.getElementById("statusFilter").value = "";
    document.getElementById("serviceFilter").value = "";
    document.getElementById("dateFromFilter").value = "";
    document.getElementById("dateToFilter").value = "";
    applyFilters();
    showNotification("Filters cleared", "info");
}

function exportCSV() {
    const csvContent = generateCSV(filteredAppointments);
    downloadCSV(csvContent, "appointments.csv");
    showNotification("CSV exported successfully!", "success");
}

function generateCSV(appointments) {
    const headers = ["ID", "Name", "Email", "Phone", "Service", "Date", "Status", "Message"];
    const csvRows = [headers.join(",")];

    appointments.forEach(appointment => {
        const row = [
            appointment.id,
            `"${appointment.name}"`,
            appointment.email,
            appointment.phone,
            `"${appointment.service}"`,
            formatDate(appointment.createdAt),
            appointment.status,
            `"${appointment.message || ""}"`
        ];
        csvRows.push(row.join(","));
    });

    return csvRows.join("\n");
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
}

function showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add("show"), 100);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function logout() {
    if (confirm("Are you sure you want to logout?")) {
        // Show logout message
        showNotification("Logging out...", "info");
        
        // Redirect to logout endpoint which will redirect to index.html
        setTimeout(() => {
            window.location.href = "/logout";
        }, 1000);
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById("editModal");
    if (event.target === modal) {
        closeEditModal();
    }
}


