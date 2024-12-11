package com.cyberhub_backend.service;

import com.cyberhub_backend.model.Product;
import com.cyberhub_backend.model.ProductDetail;
import com.cyberhub_backend.repository.ProductRepository;
import com.cyberhub_backend.repository.ProductDetailsRepository;

import org.springframework.stereotype.Service;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.transaction.annotation.Transactional;
import java.util.ArrayList;


@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductDetailsRepository productDetailsRepository;

    // Lấy danh sách sản phẩm với phân trang
    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAllProductsWithPagination(pageable);
    }

    // Lấy chi tiết sản phẩm
    public Optional<Product> getProductByIdWithDetails(Long id) {
        return productRepository.findByIdWithDetails(id);
    }

    public Product saveProduct(Product product) {
        // Xử lý lưu ProductDetails nếu cần
        return productRepository.save(product);
    }

@Transactional
public Optional<Product> updateProduct(Long id, Product productDetails) {
    return productRepository.findById(id).map(product -> {
        // Cập nhật các trường cơ bản
        product.setName(productDetails.getName());
        product.setPrice(productDetails.getPrice());
        product.setCategory(productDetails.getCategory());
        product.setDescription(productDetails.getDescription());
        product.setDiscount(productDetails.getDiscount());
        product.setStock(productDetails.getStock());
        product.setImageUrl(productDetails.getImageUrl());
        product.setRating(productDetails.getRating());
        product.setBasicSpecs(productDetails.getBasicSpecs());

        // Xóa các `ProductDetail` hiện tại thông qua danh sách trong `product`
        if (product.getProductDetails() != null) {
            product.getProductDetails().clear();
        } else {
            product.setProductDetails(new ArrayList<>());
        }

        // Thêm các `ProductDetail` mới vào danh sách `productDetails`
        if (productDetails.getBasicSpecs() != null && !productDetails.getBasicSpecs().isEmpty()) {
            productDetails.getBasicSpecs().forEach((key, value) -> {
                if (key != null && value != null && !key.isBlank() && !value.isBlank()) {
                    ProductDetail newDetail = new ProductDetail();
                    newDetail.setProduct(product);
                    newDetail.setSpecKey(key.trim());
                    newDetail.setSpecValue(value.trim());
                    product.getProductDetails().add(newDetail);
                }
            });
        }

        // Lưu sản phẩm
        return productRepository.save(product);
    });
}


    public boolean deleteProduct(Long id) {
        if (productRepository.existsById(id)) {
            productRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContainingIgnoreCase(keyword);
    }
}
