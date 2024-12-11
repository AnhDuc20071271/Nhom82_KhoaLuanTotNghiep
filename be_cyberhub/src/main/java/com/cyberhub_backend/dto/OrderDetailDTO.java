package com.cyberhub_backend.dto;

import java.math.BigDecimal;

public class OrderDetailDTO {
    private Long id;
    private int quantity;
    private BigDecimal price;
    private ProductDTO product;

    // Getters và Setters
    public Long getId() {
        return id;
    }

    public int getQuantity() {
        return quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public ProductDTO getProduct() {
        return product;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public void setProduct(ProductDTO product) {
        this.product = product;
    }
}
