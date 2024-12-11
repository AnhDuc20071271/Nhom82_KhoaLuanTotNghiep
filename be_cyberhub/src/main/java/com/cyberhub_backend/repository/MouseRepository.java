package com.cyberhub_backend.repository;

import com.cyberhub_backend.model.Mouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List; // Thêm dòng này vào

@Repository
public interface MouseRepository extends JpaRepository<Mouse, Long> {
    List<Mouse> findByNameContainingIgnoreCase(String keyword); // Tìm kiếm theo tên chuột
}
