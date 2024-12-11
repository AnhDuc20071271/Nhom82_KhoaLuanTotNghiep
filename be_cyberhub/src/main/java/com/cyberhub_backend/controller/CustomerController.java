package com.cyberhub_backend.controller;

import com.cyberhub_backend.dto.CustomerDTO;
import com.cyberhub_backend.model.Customer;
import com.cyberhub_backend.model.Profile;
import com.cyberhub_backend.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/customer-info")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping
    public ResponseEntity<Customer> saveCustomerInfo(@Validated @RequestBody CustomerDTO customerDTO) {
        Customer customer = new Customer();
        
        // Tạo đối tượng Profile và thiết lập các thuộc tính
        Profile profile = new Profile();
        profile.setId(customerDTO.getProfileId());
        customer.setProfile(profile);
        
        customer.setLoyaltyPoints(customerDTO.getLoyaltyPoints());
        
        // Nếu bạn muốn sử dụng thời gian hiện tại
        customer.setRegistrationDate(LocalDateTime.now());

        // Nếu bạn muốn sử dụng giá trị từ customerDTO
        // customer.setRegistrationDate(customerDTO.getRegistrationDate().atStartOfDay());

        customer.setMembershipLevel(customerDTO.getMembershipLevel());

        Customer savedCustomer = customerService.saveCustomer(customer);
        return ResponseEntity.ok(savedCustomer);
    }
}
