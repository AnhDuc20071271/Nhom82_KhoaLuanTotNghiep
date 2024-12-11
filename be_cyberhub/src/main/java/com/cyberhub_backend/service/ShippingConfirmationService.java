package com.cyberhub_backend.service;

import com.cyberhub_backend.model.ShippingConfirmation;
import com.cyberhub_backend.repository.ShippingConfirmationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShippingConfirmationService {

    @Autowired
    private ShippingConfirmationRepository shippingConfirmationRepository;

    public List<ShippingConfirmation> getAllShippingConfirmations() {
        return shippingConfirmationRepository.findAll();
    }

    public ShippingConfirmation createShippingConfirmation(ShippingConfirmation shippingConfirmation) {
        return shippingConfirmationRepository.save(shippingConfirmation);
    }
}
