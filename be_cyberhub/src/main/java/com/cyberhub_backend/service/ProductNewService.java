package com.cyberhub_backend.service;

import com.cyberhub_backend.model.ProductNew;
import com.cyberhub_backend.repository.ProductNewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductNewService {
    @Autowired
    private ProductNewRepository productNewRepository;

    public List<ProductNew> getAllProductNews() { // Đổi tên phương thức
        return productNewRepository.findAll();
    }

    public ProductNew getProductNewById(Long id) { // Đổi tên phương thức
        return productNewRepository.findById(id).orElse(null);
    }

    public ProductNew saveProductNew(ProductNew productNew) { // Đổi tên phương thức và biến
        return productNewRepository.save(productNew);
    }

    public void deleteProductNew(Long id) { // Đổi tên phương thức
        productNewRepository.deleteById(id);
    }
}
