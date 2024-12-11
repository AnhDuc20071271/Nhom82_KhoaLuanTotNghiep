package com.cyberhub_backend.service;

import com.cyberhub_backend.model.PasswordResetToken;
import com.cyberhub_backend.repository.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;

@Service
public class PasswordResetService {

    @Autowired
    private PasswordResetTokenRepository passwordResetTokenRepository;

    // Tạo token mới và lưu vào cơ sở dữ liệu
    public String generateResetToken(String email) {
        String token = UUID.randomUUID().toString();
        LocalDateTime expiryDate = LocalDateTime.now().plusHours(1); // Token hết hạn sau 1 giờ

        PasswordResetToken resetToken = new PasswordResetToken(email, token, expiryDate);
        passwordResetTokenRepository.save(resetToken);

        return token;
    }

    // Xác thực token
    public boolean validateResetToken(String token, String email) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token);

        if (resetToken == null) {
            return false;
        }

        if (!resetToken.getEmail().equals(email)) {
            return false;
        }

        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            return false;
        }

        return true;
    }

    // Xóa token sau khi sử dụng
    @Transactional
    public void invalidateToken(String token) {
        passwordResetTokenRepository.deleteByToken(token);
    }


    // Lấy email từ token
    public String getEmailByToken(String token) {
        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(token);
        if (resetToken == null) {
            throw new IllegalArgumentException("Token không tồn tại.");
        }
        return resetToken.getEmail();
    }
}
