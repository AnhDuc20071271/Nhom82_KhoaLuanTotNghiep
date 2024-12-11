package com.cyberhub_backend.repository;

import com.cyberhub_backend.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    @Query("SELECT c FROM Customer c WHERE c.profile.id = :profileId")
    Customer findByProfileId(@Param("profileId") Long profileId);

    @Query("SELECT c FROM Customer c JOIN c.profile p WHERE p.phone = :phone")
    Customer findByPhone(@Param("phone") String phone);
    
}
