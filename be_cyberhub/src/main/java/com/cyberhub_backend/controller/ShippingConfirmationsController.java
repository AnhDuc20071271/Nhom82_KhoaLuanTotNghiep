package com.cyberhub_backend.controller;

import com.cyberhub_backend.model.ShippingConfirmation;
import com.cyberhub_backend.service.ShippingConfirmationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shippingConfirmations")
public class ShippingConfirmationsController {

    @Autowired
    private ShippingConfirmationService shippingConfirmationService;

    @GetMapping
    public ResponseEntity<List<ShippingConfirmation>> getAllShippingConfirmations() {
        return ResponseEntity.ok(shippingConfirmationService.getAllShippingConfirmations());
    }

    @PostMapping
    public ResponseEntity<ShippingConfirmation> createShippingConfirmation(@RequestBody ShippingConfirmation shippingConfirmation) {
        return ResponseEntity.ok(shippingConfirmationService.createShippingConfirmation(shippingConfirmation));
    }
}
