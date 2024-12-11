package com.cyberhub_backend.service;

import com.cyberhub_backend.model.DeliveryAssignment;
import com.cyberhub_backend.repository.DeliveryAssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DeliveryAssignmentService {

    @Autowired
    private DeliveryAssignmentRepository deliveryAssignmentRepository;

    // Lấy tất cả các phân công
    public List<DeliveryAssignment> getAllAssignments() {
        return deliveryAssignmentRepository.findAll();
    }

    // Lấy phân công theo ID
    public DeliveryAssignment getAssignmentById(Long id) {
        return deliveryAssignmentRepository.findById(id).orElse(null);
    }

    // Tạo phân công mới
    public DeliveryAssignment createAssignment(DeliveryAssignment deliveryAssignment) {
        return deliveryAssignmentRepository.save(deliveryAssignment);
    }
}
