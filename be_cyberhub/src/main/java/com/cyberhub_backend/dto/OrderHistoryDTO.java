// src/main/java/com/cyberhub_backend/dto/OrderHistoryDTO.java

package com.cyberhub_backend.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderHistoryDTO {

    private Long orderId;
    private LocalDateTime orderDate;
    private BigDecimal totalPrice;
    private String status;
    private String invoiceNumber;
    private String note;
    private List<OrderDetailExtendedDTO> orderDetails;

    // Getters and Setters

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public LocalDateTime getOrderDate() {
        return orderDate;
    }
  
    public void setOrderDate(LocalDateTime orderDate) {
        this.orderDate = orderDate;
    }
  
    public BigDecimal getTotalPrice() {
        return totalPrice;
    }
  
    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }
  
    public String getStatus() {
        return status;
    }
  
    public void setStatus(String status) {
        this.status = status;
    }
  
    public String getInvoiceNumber() {
        return invoiceNumber;
    }
  
    public void setInvoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }
  
    public String getNote() {
        return note;
    }
  
    public void setNote(String note) {
        this.note = note;
    }

    public List<OrderDetailExtendedDTO> getOrderDetails() {
        return orderDetails;
    }

    public void setOrderDetails(List<OrderDetailExtendedDTO> orderDetails) {
        this.orderDetails = orderDetails;
    }
}
