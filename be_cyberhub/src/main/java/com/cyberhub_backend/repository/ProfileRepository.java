package com.cyberhub_backend.repository;

import com.cyberhub_backend.model.Profile;
import com.cyberhub_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Profile findByUser(User user);
    Profile findByUserId(Long userId);
}
