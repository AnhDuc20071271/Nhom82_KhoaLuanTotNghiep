package com.cyberhub_backend.controller;

import com.cyberhub_backend.model.Shipper;
import com.cyberhub_backend.service.ShipperService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shippers")
public class ShippersController {

    @Autowired
    private ShipperService shipperService;

    @GetMapping
    public ResponseEntity<List<Shipper>> getAllShippers() {
        return ResponseEntity.ok(shipperService.getAllShippers());
    }

    @PostMapping
    public ResponseEntity<Shipper> createShipper(@RequestBody Shipper shipper) {
        return ResponseEntity.ok(shipperService.createShipper(shipper));
    }
}
