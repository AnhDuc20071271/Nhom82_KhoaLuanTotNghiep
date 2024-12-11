package com.cyberhub_backend.repository;

import com.cyberhub_backend.model.Laptop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LaptopRepository extends JpaRepository<Laptop, Long> {
    // Bạn có thể thêm các phương thức tìm kiếm tùy chỉnh tại đây nếu cần
}
