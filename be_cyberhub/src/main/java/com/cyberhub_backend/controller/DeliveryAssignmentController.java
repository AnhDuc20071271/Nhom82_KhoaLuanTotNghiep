package com.cyberhub_backend.controller;

import com.cyberhub_backend.model.DeliveryAssignment;
import com.cyberhub_backend.service.DeliveryAssignmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/deliveryAssignments")
public class DeliveryAssignmentController {

    @Autowired
    private DeliveryAssignmentService deliveryAssignmentService;

    // Lấy tất cả các phân công
    @GetMapping
    public ResponseEntity<List<DeliveryAssignment>> getAllAssignments() {
        List<DeliveryAssignment> assignments = deliveryAssignmentService.getAllAssignments();
        return ResponseEntity.ok(assignments);
    }

    // Lấy chi tiết phân công theo ID
    @GetMapping("/{id}")
    public ResponseEntity<DeliveryAssignment> getAssignmentById(@PathVariable Long id) {
        DeliveryAssignment assignment = deliveryAssignmentService.getAssignmentById(id);
        return ResponseEntity.ok(assignment);
    }

    // Tạo phân công mới
    @PostMapping
    public ResponseEntity<DeliveryAssignment> createAssignment(@RequestBody DeliveryAssignment deliveryAssignment) {
        DeliveryAssignment createdAssignment = deliveryAssignmentService.createAssignment(deliveryAssignment);
        return ResponseEntity.ok(createdAssignment);
    }
}
