package com.cyberhub_backend.service;

import com.cyberhub_backend.model.User;
import com.cyberhub_backend.model.PasswordResetToken;
import com.cyberhub_backend.repository.UserRepository;
import com.cyberhub_backend.repository.PasswordResetTokenRepository;
import com.cyberhub_backend.security.JwtTokenUtil;
import com.cyberhub_backend.dto.UserDto;
import com.cyberhub_backend.exception.LoginException;

import java.util.Map;
import java.util.HashMap;
import java.util.List;
import java.util.Collections;
import java.time.LocalDateTime;
import java.util.UUID;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.authority.SimpleGrantedAuthority;


@Service
public class UserService implements UserDetailsService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordResetService passwordResetService;

    // Phương thức đăng ký người dùng mới
    public void registerUser(UserDto userDto) throws Exception {
        // Kiểm tra email
        if (!isValidEmail(userDto.getEmail())) {
            throw new Exception("Email không hợp lệ! Email phải có dạng '@gmail.com'.");
        }
    
        // Kiểm tra username
        if (!isValidUsername(userDto.getUsername())) {
            throw new Exception("Username không hợp lệ! Username phải bắt đầu bằng chữ hoa và có độ dài từ 6 đến 16 ký tự.");
        }
    
        // Kiểm tra password
        if (!isValidPassword(userDto.getPassword())) {
            throw new Exception("Password không hợp lệ! Password phải bắt đầu bằng chữ hoa, chứa ký tự đặc biệt và có độ dài từ 6 đến 16 ký tự.");
        }
    
        // Mã hóa mật khẩu
        String hashedPassword = passwordEncoder.encode(userDto.getPassword());
    
        // Gán role thấp nhất là 'KhachHang'
        String lowestRole = "KhachHang";
    
        // Tạo đối tượng User mới
        User newUser = new User();
        newUser.setUsername(userDto.getUsername());
        newUser.setEmail(userDto.getEmail());
        newUser.setHashedPassword(hashedPassword);
        newUser.setRole(lowestRole);  // Sử dụng role thấp nhất
    
        // Lưu người dùng vào cơ sở dữ liệu
        userRepository.save(newUser);
    }
    

    // Phương thức kiểm tra email
    private boolean isValidEmail(String email) {
        if (email == null) {
            return false;
        }
        return email.endsWith("@gmail.com");
    }

    // Phương thức kiểm tra role
    private boolean isValidRole(String role) {
        return "admin".equalsIgnoreCase(role) || "employee".equalsIgnoreCase(role) || "NhanVien".equalsIgnoreCase(role) || "KhachHang".equalsIgnoreCase(role);
    }

    // Phương thức kiểm tra username
    private boolean isValidUsername(String username) {
        if (username == null) {
            return false;
        }
        String regex = "^[A-Z][A-Za-z0-9]{5,15}$";
        return username.matches(regex);
    }

    // Phương thức kiểm tra password
    private boolean isValidPassword(String password) {
        if (password == null) {
            return false;
        }
        String regex = "^(?=.*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?])[A-Z][A-Za-z0-9!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?]{5,15}$";
        return password.matches(regex);
    }

    // Phương thức đăng nhập người dùng
    public Map<String, String> loginUser(UserDto userDto) {
        System.out.println("Đang xác thực user: " + userDto.getUsername());

        // Tìm người dùng theo tên đăng nhập
        User user = userRepository.findByUsername(userDto.getUsername());

        if (user != null) {
            // Kiểm tra mật khẩu
            if (passwordEncoder.matches(userDto.getPassword(), user.getHashedPassword())) {
                System.out.println("Xác thực thành công, tạo token...");
                // Tạo token JWT
                String token = jwtTokenUtil.generateToken(userDto.getUsername(), user.getRole());

                // Trả về token và role
                Map<String, String> response = new HashMap<>();
                response.put("token", token);
                response.put("role", user.getRole());
                return response;
            } else {
                throw new LoginException("Mật khẩu không đúng!");
            }
        } else {
            throw new LoginException("Không tìm thấy người dùng!");
        }
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }


    // Lấy tất cả các users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Cập nhật role cho user
    public User updateUserRole(Long userId, String newRole) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setRole(newRole);
        return userRepository.save(user);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("Không tìm thấy người dùng: " + username);
        }

        // Trả về đối tượng UserDetails cho Spring Security
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getHashedPassword(),
                Collections.singleton(new SimpleGrantedAuthority("ROLE_" + user.getRole()))
        );
    }

    public String getEmailByUserId(Long userId) {
        return userRepository.findById(userId)
                .map(User::getEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public String getUserNameByUserId(Long userId) {
        return userRepository.findById(userId)
                .map(User::getUsername)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
    }

    public void forgotPassword(String email) throws Exception {
        // Kiểm tra email tồn tại
        User user = userRepository.findAll().stream()
            .filter(u -> u.getEmail().equals(email))
            .findFirst()
            .orElseThrow(() -> new Exception("Email không tồn tại trong hệ thống"));

        // Tạo token
        String resetToken = passwordResetService.generateResetToken(email);

        // Gửi email
        emailService.sendResetPasswordEmail(email, resetToken);
    }

    public void resetPassword(String token, String newPassword) throws Exception {
        // Xác thực token
        User user = userRepository.findAll().stream()
            .filter(u -> passwordResetService.validateResetToken(token, u.getEmail()))
            .findFirst()
            .orElseThrow(() -> new Exception("Token không hợp lệ hoặc đã hết hạn"));

        // Cập nhật mật khẩu
        user.setHashedPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);

        // Xóa token sau khi sử dụng
        passwordResetService.invalidateToken(token);
    }

    public void updatePasswordByToken(String token, String newPassword) {
    // Giả sử bạn lưu email theo token
        String email = passwordResetService.getEmailByToken(token);

        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("Người dùng không tồn tại!");
        }

        // Hash mật khẩu mới và lưu
        user.setHashedPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

    public void updatePasswordByEmail(String email, String newPassword) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("Người dùng không tồn tại!");
        }

        // Hash mật khẩu mới và lưu
        user.setHashedPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

}
