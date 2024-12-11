package com.cyberhub_backend.service;

import com.cyberhub_backend.dto.OrderDetailDTO;
import com.cyberhub_backend.dto.OrderResponseDTO;
import com.cyberhub_backend.dto.OrderHistoryDTO;
import com.cyberhub_backend.dto.ProductDTO;
import com.cyberhub_backend.model.Customer;
import com.cyberhub_backend.model.Order;
import com.cyberhub_backend.model.OrderDetail;
import com.cyberhub_backend.model.Product;
import com.cyberhub_backend.dto.OrderRequestDTO;
import com.cyberhub_backend.model.ShippingInfo;
import com.cyberhub_backend.repository.OrderRepository;
import com.cyberhub_backend.repository.ProductRepository;
import com.cyberhub_backend.dto.ShippingInfoDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.text.NumberFormat;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    private final ProductRepository productRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    public Order createOrder(Customer customer, OrderRequestDTO orderRequestDTO, List<OrderDetail> orderDetails) {
        Order order = new Order();
        order.setCustomer(customer);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(orderRequestDTO.getStatus());

        // Tính tổng giá trị
        BigDecimal totalPrice = BigDecimal.ZERO;
        for (OrderDetail detail : orderDetails) {
            BigDecimal itemTotal = detail.getPrice().multiply(BigDecimal.valueOf(detail.getQuantity()));
            totalPrice = totalPrice.add(itemTotal);
            detail.setOrder(order);
        }
        order.setTotalPrice(totalPrice);
        order.setOrderDetails(orderDetails);

        // Tạo ShippingInfo
        ShippingInfo shippingInfo = new ShippingInfo();
        shippingInfo.setOrder(order);
        shippingInfo.setAddressLine(orderRequestDTO.getAddressLine());
        shippingInfo.setWard(orderRequestDTO.getWard());
        shippingInfo.setDistrict(orderRequestDTO.getDistrict());
        shippingInfo.setCity(orderRequestDTO.getCity());
        shippingInfo.setSpecialNotes(orderRequestDTO.getSpecialNotes());
        shippingInfo.setInvoiceRequired(orderRequestDTO.getInvoiceRequired());

        // Thiết lập quan hệ hai chiều
        order.setShippingInfo(shippingInfo);

        // Lưu đơn hàng
        return orderRepository.save(order);
    }

    public List<Order> getOrdersByPhone(String phone) {
        return orderRepository.findByCustomerPhone(phone);
    }

    public List<OrderDetail> createOrderDetails(List<Long> productIds, List<Integer> quantities) {
        List<OrderDetail> orderDetails = new ArrayList<>();
        for (int i = 0; i < productIds.size(); i++) {
            Product product = productRepository.findById(productIds.get(i))
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            OrderDetail detail = new OrderDetail();
            detail.setProduct(product);
            detail.setQuantity(quantities.get(i));
            detail.setPrice(BigDecimal.valueOf(product.getPrice()));
            orderDetails.add(detail);
        }
        return orderDetails;
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findByIdWithDetails(id);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public void confirmOrder(Long orderId) {
        Order order = orderRepository.findById(orderId)
                                    .orElseThrow(() -> new RuntimeException("Order not found"));
        order.setNote("Đơn hàng đã được giao thành công!");
        orderRepository.save(order);
    }

    public void updateOrderStatus(Long orderId, String status) {
        if ("Assigned".equalsIgnoreCase(status)) {
            throw new RuntimeException("Không thể cập nhật trạng thái thành 'Assigned'.");
        }
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        if ("Đơn hàng đã được giao thành công!".equals(order.getNote())) {
            order.setStatus(status); // Ví dụ: "Completed"
            orderRepository.save(order);
        } else {
            throw new RuntimeException("Không thể cập nhật trạng thái vì đơn hàng chưa được xác nhận.");
        }
    }

    public String getOrderDetailsForEmail(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        String invoiceNumber = order.getInvoiceNumber();
        BigDecimal totalPrice = order.getTotalPrice();

        NumberFormat currencyFormatter = NumberFormat.getCurrencyInstance(new Locale("vi", "VN"));
        String formattedTotalPrice = currencyFormatter.format(totalPrice);

        return "Mã hóa đơn: " + invoiceNumber + ", Tổng giá trị: " + formattedTotalPrice;
    }

    // Phương thức chuyển đổi từ Order sang OrderResponseDTO
    public OrderResponseDTO convertToOrderResponseDTO(Order order) {
        OrderResponseDTO responseDTO = new OrderResponseDTO();
        responseDTO.setId(order.getId());
        responseDTO.setOrderDate(order.getOrderDate());
        responseDTO.setTotalPrice(order.getTotalPrice());
        responseDTO.setStatus(order.getStatus());
        responseDTO.setInvoiceNumber(order.getInvoiceNumber());
        responseDTO.setNote(order.getNote());

        // Chuyển đổi danh sách OrderDetail
        List<OrderDetailDTO> detailDTOs = order.getOrderDetails().stream().map(detail -> {
            OrderDetailDTO detailDTO = new OrderDetailDTO();
            detailDTO.setId(detail.getId());
            detailDTO.setQuantity(detail.getQuantity());
            detailDTO.setPrice(detail.getPrice());

            // Chuyển đổi Product
            Product product = detail.getProduct();
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(product.getId());
            productDTO.setName(product.getName());
            productDTO.setCategory(product.getCategory());
            productDTO.setDescription(product.getDescription());
            productDTO.setImageUrl(product.getImageUrl());

            detailDTO.setProduct(productDTO);

            return detailDTO;
        }).collect(Collectors.toList());

        responseDTO.setOrderDetails(detailDTOs);

        // Chuyển đổi ShippingInfo
        ShippingInfo shippingInfo = order.getShippingInfo();
        if (shippingInfo != null) {
            ShippingInfoDTO shippingInfoDTO = new ShippingInfoDTO();
            shippingInfoDTO.setShippingId(shippingInfo.getShippingId());
            shippingInfoDTO.setAddressLine(shippingInfo.getAddressLine());
            shippingInfoDTO.setWard(shippingInfo.getWard());
            shippingInfoDTO.setDistrict(shippingInfo.getDistrict());
            shippingInfoDTO.setCity(shippingInfo.getCity());
            shippingInfoDTO.setSpecialNotes(shippingInfo.getSpecialNotes());
            shippingInfoDTO.setInvoiceRequired(shippingInfo.isInvoiceRequired());

            responseDTO.setShippingInfo(shippingInfoDTO);
        }

        return responseDTO;
    }

    public void deleteOrder(Long orderId) {
        // Kiểm tra nếu đơn hàng không tồn tại
        if (!orderRepository.existsById(orderId)) {
            throw new RuntimeException("Không tìm thấy đơn hàng.");
        }
        // Xóa đơn hàng
        orderRepository.deleteById(orderId);
    }

    // Lấy lịch sử đơn hàng
    public List<OrderHistoryDTO> getOrderHistory(String phone, String email) {
        return orderRepository.findOrderHistory(phone, email);
    }

    // Tra cứu đơn hàng theo mã hóa đơn
    public OrderHistoryDTO getOrderByInvoice(String phone, String email, String invoiceNumber) {
        return orderRepository.findOrderByInvoice(phone, email, invoiceNumber);
    }
}
