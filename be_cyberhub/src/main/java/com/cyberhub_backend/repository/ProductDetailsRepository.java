package com.cyberhub_backend.repository;

import com.cyberhub_backend.model.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Repository
public interface ProductDetailsRepository extends JpaRepository<ProductDetail, Long> {

    @Modifying
    @Transactional
    void deleteByProductId(Long productId);

    List<ProductDetail> findByProductId(Long productId);
}



