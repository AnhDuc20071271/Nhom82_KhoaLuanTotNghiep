package com.cyberhub_backend.model;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.cyberhub_backend.persistence.JsonToMapConverter;

import java.util.Map;
import java.util.List;

@Entity
@Table(name = "Products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "category")
    private String category;

    @Column(name = "price")
    private double price;

    @Column(name = "discount")
    private double discount;

    @Column(name = "stock")
    private int stock;

    @Column(name = "description", length = 1000)
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    @Column(name = "basic_specs", length = 1000)
    @Convert(converter = JsonToMapConverter.class)
    private Map<String, String> basicSpecs;

    @Column(name = "rating")
    private double rating;

    // OneToMany relationship with ProductDetails
    @OneToMany(mappedBy = "product", fetch = FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<ProductDetail> productDetails;


    // Constructors
    public Product() {}

    // Cập nhật constructor để bao gồm các trường mới
    public Product(Long id, String name, String category, double price, double discount, int stock, String description, String imageUrl, Map<String, String> basicSpecs, double rating, List<ProductDetail> productDetails) {
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
        this.productDetails = productDetails;
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

    public List<ProductDetail> getProductDetails() {
        return productDetails;
    }

    public void setProductDetails(List<ProductDetail> productDetails) {
        this.productDetails = productDetails;
        if (productDetails != null) {
            for (ProductDetail detail : productDetails) {
                detail.setProduct(this);
            }
        }
    }
}
