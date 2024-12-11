package com.cyberhub_backend.controller;

import com.cyberhub_backend.model.User;
import com.cyberhub_backend.service.UserService;
import com.cyberhub_backend.service.PasswordResetService;
import com.cyberhub_backend.dto.UserDto;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.time.LocalDateTime;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.cyberhub_backend.security.JwtService;

@RestController
@RequestMapping("/users")
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private JwtService jwtService; // Thêm @Autowired và sử dụng JwtService

    @Autowired
    private PasswordResetService passwordResetService;


    // API để đăng ký người dùng mới
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserDto userDto) {
        try {
            userService.registerUser(userDto);
            return ResponseEntity.ok("Đăng ký thành công!");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Đăng ký thất bại: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDto userDto) {
        System.out.println("Yêu cầu đăng nhập từ: " + userDto.getUsername());
        try {
            // Lấy token và role của người dùng
            Map<String, String> result = userService.loginUser(userDto);

            // Trả về cả token và role
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            System.out.println("Đăng nhập thất bại cho user: " + userDto.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Tên đăng nhập hoặc mật khẩu không đúng!");
        }
    }

    // API để fetch danh sách users
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // API để cập nhật role của user
    @PutMapping("/{id}/role")
    public ResponseEntity<User> updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> roleUpdate) {
        String newRole = roleUpdate.get("role");
        User updatedUser = userService.updateUserRole(id, newRole);
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        try {
            userService.forgotPassword(email);
            return ResponseEntity.ok("Hãy kiểm tra email để đặt lại mật khẩu.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Lỗi: " + e.getMessage());
        }
    }

    // API để reset mật khẩu
    @PostMapping("/reset-password")
        public ResponseEntity<String> resetPassword(@RequestBody Map<String, String> request) {
            String token = request.get("token");
            String newPassword = request.get("newPassword");

            log.debug("Request token: {}", token);

            try {
                // Lấy email từ token
                String email = passwordResetService.getEmailByToken(token);

                // Kiểm tra token hợp lệ
                if (!passwordResetService.validateResetToken(token, email)) {
                    throw new IllegalArgumentException("Token không hợp lệ hoặc đã hết hạn");
                }

                // Đặt lại mật khẩu
                userService.updatePasswordByEmail(email, newPassword);

                // Xóa token sau khi sử dụng
                passwordResetService.invalidateToken(token);

                return ResponseEntity.ok("Đặt lại mật khẩu thành công!");
            } catch (Exception e) {
                log.error("Lỗi khi đặt lại mật khẩu", e);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Lỗi: " + e.getMessage());
            }
        }
}
