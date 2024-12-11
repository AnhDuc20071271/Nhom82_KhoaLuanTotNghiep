package com.cyberhub_backend.service;

import com.cyberhub_backend.model.Mouse;
import com.cyberhub_backend.repository.MouseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@Service
public class MouseService {

    @Autowired
    private MouseRepository mouseRepository;

    public List<Mouse> getAllMice() {
        return mouseRepository.findAll();
    }

    public Optional<Mouse> getMouseById(Long id) {
        return mouseRepository.findById(id);
    }

    public Mouse saveMouse(Mouse mouse) {
        return mouseRepository.save(mouse);
    }

    public Optional<Mouse> updateMouse(Long id, Mouse mouseDetails) {
        return mouseRepository.findById(id).map(mouse -> {
            mouse.setName(mouseDetails.getName());
            mouse.setPrice(mouseDetails.getPrice());
            mouse.setCategory(mouseDetails.getCategory());
            mouse.setDescription(mouseDetails.getDescription());
            mouse.setDiscount(mouseDetails.getDiscount());
            mouse.setStock(mouseDetails.getStock());
            mouse.setImageUrl(mouseDetails.getImageUrl());
            mouse.setNsx(mouseDetails.getNsx()); // Nhà sản xuất
            mouse.setConnectionType(mouseDetails.getConnectionType()); // Loại kết nối
            return mouseRepository.save(mouse);
        });
    }

    public boolean deleteMouse(Long id) {
        if (mouseRepository.existsById(id)) {
            mouseRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public List<Mouse> searchMice(String keyword) {
        return mouseRepository.findByNameContainingIgnoreCase(keyword);
    }
}
