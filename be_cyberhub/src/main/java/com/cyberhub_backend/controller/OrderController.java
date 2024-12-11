package com.cyberhub_backend.controller;

import com.cyberhub_backend.dto.OrderRequestDTO;
import com.cyberhub_backend.dto.OrderResponseDTO;
import com.cyberhub_backend.dto.OrderHistoryDTO;
import com.cyberhub_backend.dto.ProductDTO;
import com.cyberhub_backend.model.Order;
import com.cyberhub_backend.model.OrderDetail;
import com.cyberhub_backend.model.Customer;
import com.cyberhub_backend.model.Product;
import com.cyberhub_backend.service.CustomerService;
import com.cyberhub_backend.service.OrderService;
import com.cyberhub_backend.service.ProductService;
import com.cyberhub_backend.service.OrderAssignmentService;
import com.cyberhub_backend.service.EmailService;
import com.cyberhub_backend.service.UserService;
import com.cyberhub_backend.service.ShipperService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.sql.SQLException;
import java.util.stream.Collectors;
import java.util.Map;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private CustomerService customerService;

    @Autowired
    private ProductService productService;

    @Autowired
    private OrderAssignmentService orderAssignmentService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserService userService;

    @Autowired
    private ShipperService shipperService;

    @PostMapping("/create")
    public ResponseEntity<Order> completeOrder(@Validated @RequestBody OrderRequestDTO orderRequestDTO) {
        Customer customer = customerService.findById(orderRequestDTO.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        List<OrderDetail> orderDetails = orderRequestDTO.getProducts().stream().map(productDTO -> {
            OrderDetail orderDetail = new OrderDetail();

            // Sử dụng productDTO.getId() thay vì getProductId()
            Product product = productService.getProductByIdWithDetails(productDTO.getId())
                    .orElseThrow(() -> new RuntimeException("Product not found with ID: " + productDTO.getId()));

            orderDetail.setProduct(product);
            orderDetail.setQuantity(productDTO.getQuantity());
            orderDetail.setPrice(productDTO.getPrice());

            // Thiết lập quan hệ hai chiều
            orderDetail.setOrder(orderDetail.getOrder());

            return orderDetail;
        }).collect(Collectors.toList());

        Order createdOrder = orderService.createOrder(customer, orderRequestDTO, orderDetails);
        return ResponseEntity.ok(createdOrder);
    }

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponseDTO> getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id)
                .map(order -> {
                    OrderResponseDTO responseDTO = orderService.convertToOrderResponseDTO(order);
                    return ResponseEntity.ok(responseDTO);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<OrderResponseDTO>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        List<OrderResponseDTO> responseDTOs = orders.stream()
                .map(orderService::convertToOrderResponseDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responseDTOs);
    }

    @PostMapping("/assign")
    public ResponseEntity<String> assignOrder(
            @RequestParam Long orderId,
            @RequestParam Long assignedBy,
            @RequestParam(required = false) Long assignedToUserId,
            @RequestParam(required = false) Long assignedToShipperId) {

        try {
            // Kiểm tra rằng chỉ có thể phân công cho một trong hai
            if ((assignedToUserId != null && assignedToShipperId != null) ||
                (assignedToUserId == null && assignedToShipperId == null)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .body("Chỉ có thể phân công cho nhân viên hoặc shipper, và phải phân công cho một trong hai.");
            }

            // Tiếp tục xử lý như bình thường
            orderAssignmentService.assignOrderToShipper(orderId, assignedBy, assignedToUserId, assignedToShipperId);

            // Lấy email và tên người nhận
            String email;
            String userName;
            if (assignedToUserId != null) {
                email = userService.getEmailByUserId(assignedToUserId);
                userName = userService.getUserNameByUserId(assignedToUserId);
            } else {
                email = shipperService.getEmailByShipperId(assignedToShipperId);
                userName = shipperService.getNameByShipperId(assignedToShipperId);
            }

            String orderDetails = orderService.getOrderDetailsForEmail(orderId);
            String confirmationLink = "http://localhost:3000/confirm?orderId=" + orderId;

            emailService.sendAssignmentEmail(email, userName, orderDetails, confirmationLink);

            return ResponseEntity.ok("Đơn hàng đã được phân công và email đã được gửi.");
        } catch (SQLException e) {
            // Xử lý lỗi từ SQL
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi phân công đơn hàng: " + e.getMessage());
        } catch (Exception e) {
            // Xử lý các lỗi khác
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi không xác định: " + e.getMessage());
        }
    }

    @PostMapping("/confirm")
    public ResponseEntity<String> confirmOrder(@RequestParam Long orderId) {
        try {
            orderService.confirmOrder(orderId);
            return ResponseEntity.ok("Đơn hàng đã được xác nhận thành công.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Lỗi khi xác nhận đơn hàng: " + e.getMessage());
        }
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<String> updateOrderStatus(@PathVariable Long orderId, @RequestBody Map<String, String> body) {
        try {
            String status = body.get("status");
            orderService.updateOrderStatus(orderId, status);
            return ResponseEntity.ok("Order status updated successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error updating order status: " + e.getMessage());
        }
    }

    @DeleteMapping("/{orderId}")
    public ResponseEntity<String> deleteOrder(@PathVariable Long orderId) {
        try {
            orderService.deleteOrder(orderId);
            return ResponseEntity.ok("Xóa đơn hàng thành công.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Lỗi khi xóa đơn hàng: " + e.getMessage());
        }
    }

    // Lấy lịch sử đơn hàng
    @GetMapping("/history")
    public ResponseEntity<List<OrderHistoryDTO>> getOrderHistory(
        @RequestParam(required = false) String phone,
        @RequestParam(required = false) String email
    ) {
        List<OrderHistoryDTO> orders = orderService.getOrderHistory(phone, email);
        return ResponseEntity.ok(orders);
    }

    // Tra cứu đơn hàng
    @GetMapping("/lookup")
    public ResponseEntity<OrderHistoryDTO> lookupOrder(
        @RequestParam(required = false) String phone,
        @RequestParam(required = false) String email,
        @RequestParam String invoiceNumber
    ) {
        OrderHistoryDTO order = orderService.getOrderByInvoice(phone, email, invoiceNumber);
        return ResponseEntity.ok(order);
    }
    
}
