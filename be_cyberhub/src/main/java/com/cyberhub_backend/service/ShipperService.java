package com.cyberhub_backend.service;

import com.cyberhub_backend.model.Shipper;
import com.cyberhub_backend.repository.ShipperRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShipperService {

    @Autowired
    private ShipperRepository shipperRepository;

    public List<Shipper> getAllShippers() {
        return shipperRepository.findAll();
    }

    public Shipper createShipper(Shipper shipper) {
        return shipperRepository.save(shipper);
    }

    public String getEmailByShipperId(Long shipperId) {
        return shipperRepository.findById(shipperId)
                .map(Shipper::getEmail)
                .orElseThrow(() -> new RuntimeException("Shipper not found"));
    }
    
    public String getNameByShipperId(Long shipperId) {
        return shipperRepository.findById(shipperId)
                .map(Shipper::getName)
                .orElseThrow(() -> new RuntimeException("Shipper not found with ID: " + shipperId));
    }
}
