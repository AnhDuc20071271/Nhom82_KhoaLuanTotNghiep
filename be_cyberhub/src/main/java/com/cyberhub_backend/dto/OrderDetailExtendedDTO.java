// src/main/java/com/cyberhub_backend/dto/OrderDetailExtendedDTO.java

package com.cyberhub_backend.dto;

public class OrderDetailExtendedDTO {
    private Long productId;
    private String productName;
    private String imageUrl;
    private int quantity;

    // Constructors
    public OrderDetailExtendedDTO() {}

    public OrderDetailExtendedDTO(Long productId, String productName, String imageUrl, int quantity) {
        this.productId = productId;
        this.productName = productName;
        this.imageUrl = imageUrl;
        this.quantity = quantity;
    }

    // Getters and Setters
    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }
  
    public void setProductName(String productName) {
        this.productName = productName;
    }
  
    public String getImageUrl() {
        return imageUrl;
    }
  
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
}
