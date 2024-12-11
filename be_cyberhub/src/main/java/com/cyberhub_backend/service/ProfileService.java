package com.cyberhub_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cyberhub_backend.model.Profile;
import com.cyberhub_backend.repository.ProfileRepository;

import java.util.List;

@Service
public class ProfileService {

    @Autowired
    private ProfileRepository profileRepository;

    // Lấy tất cả profile
    public List<Profile> getAllProfiles() {
        return profileRepository.findAll();
    }

    // Lấy profile theo ID
    public Profile getProfileById(Long id) throws Exception {
        return profileRepository.findById(id)
            .orElseThrow(() -> new Exception("Không tìm thấy profile với id: " + id));
    }

    // Tạo mới profile
    public Profile createProfile(Profile profile) {
        return profileRepository.save(profile);
    }

    // Cập nhật profile
    public Profile updateProfile(Long id, Profile profileDetails) throws Exception {
        Profile profile = getProfileById(id);
        
        profile.setFirstName(profileDetails.getFirstName());
        profile.setLastName(profileDetails.getLastName());
        profile.setPhone(profileDetails.getPhone());
        profile.setAddress(profileDetails.getAddress());
        profile.setImgURL(profileDetails.getImgURL());
        profile.setEmail(profileDetails.getEmail()); // Cập nhật email

        return profileRepository.save(profile);
    }

    // Xóa profile theo ID
    public void deleteProfile(Long id) throws Exception {
        Profile profile = getProfileById(id);
        profileRepository.delete(profile);
    }

    public Profile findByUserId(Long userId) {
        return profileRepository.findByUserId(userId);
    }
}
