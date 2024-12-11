// ProfileController.java
package com.cyberhub_backend.controller;

import com.cyberhub_backend.dto.ProfileResponseDTO;
import com.cyberhub_backend.model.Customer;
import com.cyberhub_backend.model.Profile;
import com.cyberhub_backend.model.User;
import com.cyberhub_backend.service.CustomerService;
import com.cyberhub_backend.service.ProfileService;
import com.cyberhub_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/myprofile")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    @Autowired
    private UserService userService;

    @Autowired
    private CustomerService customerService;

    @GetMapping
    public ProfileResponseDTO getMyProfile() {
        // Lấy tên người dùng hiện tại từ Authentication context
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        // Tìm User dựa trên username
        User user = userService.findByUsername(username);
        Profile profile = profileService.findByUserId(user.getId());

        // Tìm customer từ profile_id
        Customer customer = customerService.findByProfileId(profile.getId());

        ProfileResponseDTO responseDTO = new ProfileResponseDTO();
        responseDTO.setId(profile.getId());
        responseDTO.setFirstName(profile.getFirstName());
        responseDTO.setLastName(profile.getLastName());
        responseDTO.setPhone(profile.getPhone());
        responseDTO.setAddress(profile.getAddress());
        responseDTO.setImgURL(profile.getImgURL());
        responseDTO.setEmail(profile.getEmail());

        if (customer != null) {
            responseDTO.setCustomerId(customer.getCustomerId());
        }

        return responseDTO;
    }
}
