package com.cyberhub_backend.service;

import com.cyberhub_backend.model.Order;
import com.cyberhub_backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;

@Service
public class OrderAssignmentService {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private OrderRepository orderRepository; // Thêm dòng này

    public void assignOrderToShipper(Long orderId, Long assignedBy, Long assignedToUserId, Long assignedToShipperId) throws SQLException {
        String sql = "{CALL AssignOrderToShipper(?, ?, ?, ?, ?)}";

        try (Connection connection = dataSource.getConnection();
             CallableStatement statement = connection.prepareCall(sql)) {

            statement.setLong(1, orderId);
            statement.setLong(2, assignedBy);
            if (assignedToUserId != null) {
                statement.setLong(3, assignedToUserId);
            } else {
                statement.setNull(3, java.sql.Types.BIGINT);
            }
            if (assignedToShipperId != null) {
                statement.setLong(4, assignedToShipperId);
            } else {
                statement.setNull(4, java.sql.Types.BIGINT);
            }

            // Đăng ký tham số đầu ra
            statement.registerOutParameter(5, java.sql.Types.BIGINT);

            // Thực thi stored procedure
            statement.executeUpdate();

            // Lấy giá trị assignment_id trả về
            Long assignmentId = statement.getLong(5);
            System.out.println("Đã phân công đơn hàng với ID: " + assignmentId);

            // Cập nhật trạng thái đơn hàng
            Order order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new RuntimeException("Order not found"));
            order.setStatus("Assigned");
            orderRepository.save(order);
        } catch (SQLException e) {
            e.printStackTrace();
            throw new SQLException("Lỗi khi phân công đơn hàng", e);
        }
    }
}
