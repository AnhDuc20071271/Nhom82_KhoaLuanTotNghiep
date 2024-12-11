package com.cyberhub_backend.repository;

import com.cyberhub_backend.dto.OrderHistoryDTO;
import java.util.List;

public interface CustomOrderRepository {
    List<OrderHistoryDTO> findOrderHistory(String phone, String email);
    OrderHistoryDTO findOrderByInvoice(String phone, String email, String invoiceNumber);
}
