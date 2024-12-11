package com.cyberhub_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Value;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${frontend.base-url}")
    private String frontendBaseUrl;

    @Override
    public void sendAssignmentEmail(String email, String userName, String orderDetails, String confirmationLink) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Thông tin phân công đơn hàng");

        String emailContent = "Chào bạn " + userName + ",\n\n"
                + "Bạn được phân công giao đơn hàng với các thông tin sau:\n"
                + orderDetails + "\n\n"
                + "Vui lòng nhấp vào liên kết sau để xác nhận đã giao hàng: "
                + confirmationLink + "\n\n"
                + "Trân trọng,\n"
                + "Đội ngũ quản lý\n"
                + "CyberHUB";

        message.setText(emailContent);

        mailSender.send(message);
        System.out.println("Đã gửi email phân công tới: " + email);
    }

    @Override
    public void sendResetPasswordEmail(String toEmail, String resetToken) {
        String resetLink = frontendBaseUrl + "/reset-password?token=" + resetToken;
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Đặt lại mật khẩu");
        message.setText("Bạn đã yêu cầu đặt lại mật khẩu. Nhấp vào link sau để đặt lại: " + resetLink 
                        + "\nToken của bạn là: " + resetToken 
                        + "\nLink sẽ hết hạn sau 1 giờ.");

        mailSender.send(message);
        System.out.println("Đã gửi email đặt lại mật khẩu tới: " + toEmail);
    }

}
