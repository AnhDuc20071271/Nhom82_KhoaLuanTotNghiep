package com.cyberhub_backend.dto;

import com.cyberhub_backend.dto.OrderDetailDTO;
import com.cyberhub_backend.dto.ShippingInfoDTO;

import java.math.BigDecimal;
import java.util.List;

public class OrderDTO {

    private BigDecimal totalPrice;
    private String status;
    private Long customerId;
    private List<OrderDetailDTO> orderDetails;
    private ShippingInfoDTO shippingInfo;

    // Getters and Setters

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

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public List<OrderDetailDTO> getOrderDetails() {
        return orderDetails;
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
