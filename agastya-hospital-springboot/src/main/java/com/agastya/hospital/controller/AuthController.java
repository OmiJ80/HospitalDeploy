package com.agastya.hospital.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class AuthController {

    @GetMapping("/login")
    public String loginPage() {
        return "redirect:/login.html";
    }

    @PostMapping("/logout")
    public String logout() {
        return "redirect:/index.html";
    }

    @GetMapping("/logout")
    public String logoutGet() {
        return "redirect:/index.html";
    }

    @GetMapping("/admin-dashboard")
    public String adminDashboard() {
        return "redirect:/admin-dashboard.html";
    }
}

