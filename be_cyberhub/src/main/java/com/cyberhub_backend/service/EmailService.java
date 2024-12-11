package com.cyberhub_backend.service;

public interface EmailService {
    void sendAssignmentEmail(String email, String userName, String orderDetails, String confirmationLink);
    void sendResetPasswordEmail(String toEmail, String resetToken);
}
