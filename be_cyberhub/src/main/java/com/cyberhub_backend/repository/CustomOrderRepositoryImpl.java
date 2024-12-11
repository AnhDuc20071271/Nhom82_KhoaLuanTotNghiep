// src/main/java/com/cyberhub_backend/repository/CustomOrderRepositoryImpl.java

package com.cyberhub_backend.repository;

import com.cyberhub_backend.dto.OrderHistoryDTO;
import com.cyberhub_backend.dto.OrderDetailExtendedDTO;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.*;

@Repository
public class CustomOrderRepositoryImpl implements CustomOrderRepository {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<OrderHistoryDTO> findOrderHistory(String phone, String email) {
        Query query = entityManager.createNativeQuery(
            "EXEC GetOrderHistoryByCustomer @Phone = :phone, @Email = :email"
        );
        query.setParameter("phone", phone);
        query.setParameter("email", email);

        List<Object[]> results = query.getResultList();
        Map<Long, OrderHistoryDTO> orderMap = new HashMap<>();

        for (Object[] row : results) {
            Long orderId = ((Number) row[0]).longValue();
            OrderHistoryDTO orderDTO = orderMap.get(orderId);
            if (orderDTO == null) {
                orderDTO = new OrderHistoryDTO();
                orderDTO.setOrderId(orderId);
                orderDTO.setOrderDate(((Timestamp) row[1]).toLocalDateTime());
                orderDTO.setTotalPrice((BigDecimal) row[2]);
                orderDTO.setStatus((String) row[3]);
                orderDTO.setInvoiceNumber((String) row[4]);
                orderDTO.setNote((String) row[5]);
                orderDTO.setOrderDetails(new ArrayList<>());
                orderMap.put(orderId, orderDTO);
            }

            // Kiểm tra chi tiết sản phẩm
            // Nếu không có orderDetails (vd: od.quantity = NULL) thì row[6] sẽ NULL
            if (row[6] != null) {
                OrderDetailExtendedDTO detailDTO = new OrderDetailExtendedDTO();
                detailDTO.setQuantity(((Number) row[6]).intValue());
                detailDTO.setProductId(((Number) row[7]).longValue());
                detailDTO.setProductName((String) row[8]);
                detailDTO.setImageUrl((String) row[9]);

                orderDTO.getOrderDetails().add(detailDTO);
            }
        }

        return new ArrayList<>(orderMap.values());
    }

    @Override
    public OrderHistoryDTO findOrderByInvoice(String phone, String email, String invoiceNumber) {
        Query query = entityManager.createNativeQuery(
            "EXEC GetOrderByInvoice @Phone = :phone, @Email = :email, @InvoiceNumber = :invoiceNumber"
        );
        query.setParameter("phone", phone);
        query.setParameter("email", email);
        query.setParameter("invoiceNumber", invoiceNumber);

        List<Object[]> results = query.getResultList();

        if (results.isEmpty()) {
            return null;
        }

        OrderHistoryDTO orderDTO = new OrderHistoryDTO();
        orderDTO.setOrderId(((Number) results.get(0)[0]).longValue());
        orderDTO.setOrderDate(((Timestamp) results.get(0)[1]).toLocalDateTime());
        orderDTO.setTotalPrice((BigDecimal) results.get(0)[2]);
        orderDTO.setStatus((String) results.get(0)[3]);
        orderDTO.setInvoiceNumber((String) results.get(0)[4]);
        orderDTO.setNote((String) results.get(0)[5]);
        orderDTO.setOrderDetails(new ArrayList<>());

        for (Object[] row : results) {
            if (row[6] != null) {
                OrderDetailExtendedDTO detailDTO = new OrderDetailExtendedDTO();
                detailDTO.setQuantity(((Number) row[6]).intValue());
                detailDTO.setProductId(((Number) row[7]).longValue());
                detailDTO.setProductName((String) row[8]);
                detailDTO.setImageUrl((String) row[9]);

                orderDTO.getOrderDetails().add(detailDTO);
            }
        }

        return orderDTO;
    }
}
