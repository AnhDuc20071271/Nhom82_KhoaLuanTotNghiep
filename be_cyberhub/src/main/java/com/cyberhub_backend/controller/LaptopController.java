package com.cyberhub_backend.controller;

import com.cyberhub_backend.model.Laptop;
import com.cyberhub_backend.service.LaptopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/laptops")
public class LaptopController {

    @Autowired
    private LaptopService laptopService;

    // API lấy danh sách laptop
    @GetMapping
    public List<Laptop> getAllLaptops() {
        return laptopService.getAllLaptops();
    }

    // API lấy laptop theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Laptop> getLaptopById(@PathVariable Long id) {
        Laptop laptop = laptopService.getLaptopById(id);
        if (laptop != null) {
            return ResponseEntity.ok(laptop);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // API thêm mới laptop
    @PostMapping
    public Laptop createLaptop(@RequestBody Laptop laptop) {
        return laptopService.saveLaptop(laptop);
    }

    // API xóa laptop theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLaptop(@PathVariable Long id) {
        laptopService.deleteLaptop(id);
        return ResponseEntity.ok().build();
    }
}
