package com.cyberhub_backend.config;

import com.cyberhub_backend.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.firewall.HttpFirewall;
import org.springframework.security.web.firewall.StrictHttpFirewall;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter; // Inject JwtAuthenticationFilter

    @Bean
public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    http
        .cors()  // Enable CORS in Spring Security
        .and()
        .csrf().disable()  // Disable CSRF for REST APIs
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        .and()
        .authorizeRequests()
        .antMatchers("/products/**", "/users/login", "/users/register", "/keyboards/**", "/mice/**", "/laptops/**", "/productsnew/**", "/products/create","/products/search","/orders/lookup","/users/forgot-password","/users/reset-password").permitAll()
        .antMatchers("/myprofile").authenticated()
        .antMatchers(
            "/users/**", 
            "/orders", 
            "/orderDetails/**", 
            "/invoiceSequence/**", 
            "/shippingConfirmations/**", 
            "/shippers/**",
            "/deliveryAssignments/**",
            "/orders/assign"
        ).hasAuthority("ROLE_admin")
        .antMatchers("/orders/create","/orders/history").hasAuthority("ROLE_KhachHang")
        .antMatchers("/orders/confirm").hasAnyAuthority("ROLE_NhanVienGiaoHang", "ROLE_Shipper")
        .anyRequest().authenticated()
        .and()
        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // Add JWT filter

    return http.build();
}


    // Tùy chỉnh HttpFirewall để cho phép các ký tự mã hóa trong URL
    @Bean
public HttpFirewall customHttpFirewall() {
    StrictHttpFirewall firewall = new StrictHttpFirewall();
    firewall.setAllowUrlEncodedPercent(true); // Cho phép ký tự mã hóa %
    firewall.setAllowSemicolon(true);        // Cho phép ;
    firewall.setAllowUrlEncodedSlash(true);  // Cho phép mã hóa /
    firewall.setAllowBackSlash(true);        // Cho phép dấu \
    return firewall;
}


    // Define CORS to allow requests from frontend
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "https://localhost:3000")); 
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
        configuration.setAllowCredentials(true); 
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public HttpFirewall allowUrlEncodedSlashHttpFirewall() {
        StrictHttpFirewall firewall = new StrictHttpFirewall();
        firewall.setAllowUrlEncodedPercent(true); // Cho phép các ký tự mã hóa URL
        firewall.setAllowSemicolon(true);        // Nếu cần, cho phép dấu chấm phẩy
        return firewall;
    }
}
