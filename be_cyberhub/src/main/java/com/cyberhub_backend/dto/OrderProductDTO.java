package com.example.demo.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class OrderProductDTO {

    @NotNull(message = "productId không được để trống")
    private Long productId;

    @Min(value = 1, message = "Số lượng phải lớn hơn 0")
    private int quantity;

    // Getters and Setters
}
