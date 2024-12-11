package com.cyberhub_backend.repository;

import com.cyberhub_backend.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.repository.query.Param;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>, CustomOrderRepository {

    @org.springframework.data.jpa.repository.Query("SELECT o FROM Order o WHERE o.customer.profile.phone = :phone")
    List<Order> findByCustomerPhone(String phone);

    Optional<Order> findOrderById(Long id);

    List<Order> findByStatus(String status);

    @org.springframework.data.jpa.repository.Query("SELECT o FROM Order o " +
           "LEFT JOIN FETCH o.orderDetails od " +
           "LEFT JOIN FETCH od.product " +
           "LEFT JOIN FETCH o.shippingInfo " +
           "WHERE o.id = :id")
    Optional<Order> findByIdWithDetails(@Param("id") Long id);
}
