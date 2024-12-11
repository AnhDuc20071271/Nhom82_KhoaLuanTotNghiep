// CustomerService.java
package com.cyberhub_backend.service;

import com.cyberhub_backend.model.Customer;
import com.cyberhub_backend.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    public Customer saveCustomer(Customer customer) {
        return customerRepository.save(customer);
    }

    public Optional<Customer> findById(Long id) {
        return customerRepository.findById(id);
    }

    public Customer findByPhone(String phone) {
        return customerRepository.findByPhone(phone);
    }

    public Customer findByProfileId(Long profileId) {
        return customerRepository.findByProfileId(profileId);
    }
}
