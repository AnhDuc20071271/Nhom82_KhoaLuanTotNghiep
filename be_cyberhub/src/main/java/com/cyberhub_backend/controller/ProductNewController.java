package com.cyberhub_backend.controller;

import com.cyberhub_backend.model.ProductNew;
import com.cyberhub_backend.service.ProductNewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/productsnew")
public class ProductNewController {
    @Autowired
    private ProductNewService productNewService;

    @GetMapping
    public List<ProductNew> getAllProductNews() { // Gọi đúng tên phương thức trong ProductNewService
        return productNewService.getAllProductNews();
    }

    @GetMapping("/{id}")
    public ProductNew getProductNewById(@PathVariable Long id) { // Gọi đúng tên phương thức trong ProductNewService
        return productNewService.getProductNewById(id);
    }

    @PostMapping
    public ProductNew createProductNew(@RequestBody ProductNew productNew) { // Gọi đúng tên phương thức trong ProductNewService
        return productNewService.saveProductNew(productNew);
    }

    @DeleteMapping("/{id}")
    public void deleteProductNew(@PathVariable Long id) { // Gọi đúng tên phương thức trong ProductNewService
        productNewService.deleteProductNew(id);
    }
}
