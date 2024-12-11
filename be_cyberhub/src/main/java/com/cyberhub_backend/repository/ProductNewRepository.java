// src/main/java/com/yourproject/repository/ProductNewRepository.java
package com.cyberhub_backend.repository;

import com.cyberhub_backend.model.ProductNew;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductNewRepository extends JpaRepository<ProductNew, Long> {
}
