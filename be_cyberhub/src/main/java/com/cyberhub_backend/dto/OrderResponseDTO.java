package com.cyberhub_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderResponseDTO {
    private Long id;
    private LocalDateTime orderDate;
    private BigDecimal totalPrice;
    private String status;
    private String invoiceNumber;
    private String note;
    private List<OrderDetailDTO> orderDetails;
    private ShippingInfoDTO shippingInfo;

    // Getters và Setters
    public Long getId() {
        return id;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public String getStatus() {
        return status;
    }

    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public String getNote() {
        return note;
    }

    public List<OrderDetailDTO> getOrderDetails() {
        return orderDetails;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setInvoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public void setOrderDetails(List<OrderDetailDTO> orderDetails) {
        this.orderDetails = orderDetails;
    }

    public ShippingInfoDTO getShippingInfo() {
        return shippingInfo;
    }

    public void setShippingInfo(ShippingInfoDTO shippingInfo) {
        this.shippingInfo = shippingInfo;
    }
}
