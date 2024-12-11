package com.cyberhub_backend.repository;

import com.cyberhub_backend.model.Product;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;


@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContainingIgnoreCase(String keyword);

    // Lấy chi tiết sản phẩm qua JOIN FETCH
    @Query("SELECT p FROM Product p LEFT JOIN FETCH p.productDetails WHERE p.id = :id")
    Optional<Product> findByIdWithDetails(@Param("id") Long id);

    // Lấy danh sách sản phẩm phân trang (không JOIN FETCH)
    @Query("SELECT p FROM Product p") 
    Page<Product> findAllProductsWithPagination(Pageable pageable);
}


