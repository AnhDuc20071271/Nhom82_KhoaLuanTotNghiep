package com.cyberhub_backend.repository;

import com.cyberhub_backend.model.ShippingConfirmation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShippingConfirmationRepository extends JpaRepository<ShippingConfirmation, Long> {
}
