package com.agastya.hospital.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/", "/index.html", "/css/**", "/js/**", "/images/**", "/api/appointments/submit").permitAll()
                .requestMatchers("/admin-dashboard.html", "/api/appointments", "/api/appointments/**").authenticated()
                .anyRequest().permitAll()
            )
            .formLogin(form -> form
                .loginPage("/login.html")
                .loginProcessingUrl("/perform_login")
                .defaultSuccessUrl("/admin-dashboard.html", true)
                .failureUrl("/login.html?error=true")
                .permitAll()
            )
            .logout(logout -> logout
                .logoutUrl("/logout")
                .logoutSuccessUrl("/login.html?logout=true")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .permitAll()
            )
            .csrf(csrf -> csrf.disable()); // Disable CSRF for simplicity in this demo

        return http.build();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        // Get credentials from environment variables or use secure defaults
        String adminUsername = System.getenv("ADMIN_USERNAME") != null ? 
                              System.getenv("ADMIN_USERNAME") : "admin";
        String adminPassword = System.getenv("ADMIN_PASSWORD") != null ? 
                              System.getenv("ADMIN_PASSWORD") : "securePassword1";
                              
        String hospitalAdminUsername = System.getenv("HOSPITAL_ADMIN_USERNAME") != null ? 
                                     System.getenv("HOSPITAL_ADMIN_USERNAME") : "hospital_admin";
        String hospitalAdminPassword = System.getenv("HOSPITAL_ADMIN_PASSWORD") != null ? 
                                     System.getenv("HOSPITAL_ADMIN_PASSWORD") : "securePassword2";
        
        UserDetails admin = User.builder()
                .username(adminUsername)
                .password(passwordEncoder().encode(adminPassword))
                .roles("ADMIN")
                .build();
                
        UserDetails hospitalAdmin = User.builder()
                .username(hospitalAdminUsername)
                .password(passwordEncoder().encode(hospitalAdminPassword))
                .roles("ADMIN")
                .build();

        return new InMemoryUserDetailsManager(admin, hospitalAdmin);
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

