package com.cyberhub_backend.dto;

import java.util.List;
import java.util.Map;

import java.text.NumberFormat;
import java.util.Locale;
import com.fasterxml.jackson.annotation.JsonInclude;

public class ProductResponse {

    private Long id;
    private String name;
    private String category;
    private double price;
    private double discount;
    private int stock;
    private String description;
    private String imageUrl;
    private Map<String, String> basicSpecs;
    private double rating;
    private List<Detail> details;

    // Constructor không có 'details'
    public ProductResponse(Long id, String name, String category, double price, double discount,
                           int stock, String description, String imageUrl,
                           Map<String, String> basicSpecs, double rating, List<Detail> details) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.discount = discount;
        this.stock = stock;
        this.description = description;
        this.imageUrl = imageUrl;
        this.basicSpecs = basicSpecs;
        this.rating = rating;
        this.details = details;
    }

    // Constructor đầy đủ (bao gồm 'details')
    public ProductResponse(Long id, String name, String category, double price, double discount,
                           int stock, String description, String imageUrl,
                           Map<String, String> basicSpecs, double rating) {
        this(id, name, category, price, discount, stock, description, imageUrl, basicSpecs, rating, null);
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Map<String, String> getBasicSpecs() {
        return basicSpecs;
    }

    public void setBasicSpecs(Map<String, String> basicSpecs) {
        this.basicSpecs = basicSpecs;
    }

    public double getRating() {
        return rating;
    }

    public void setRating(double rating) {
        this.rating = rating;
    }

    public List<Detail> getDetails() {
        return details;
    }

    public void setDetails(List<Detail> details) {
        this.details = details;
    }

    // Inner class Detail
    public static class Detail {
        private String specKey;
        private String specValue;

        public Detail(String specKey, String specValue) {
            this.specKey = specKey;
            this.specValue = specValue;
        }

        // Getters và Setters
        public String getSpecKey() {
            return specKey;
        }

        public void setSpecKey(String specKey) {
            this.specKey = specKey;
        }

        public String getSpecValue() {
            return specValue;
        }

        public void setSpecValue(String specValue) {
            this.specValue = specValue;
        }
    }
}
