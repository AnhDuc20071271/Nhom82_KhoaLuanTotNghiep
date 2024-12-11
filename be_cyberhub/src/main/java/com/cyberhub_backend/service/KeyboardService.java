package com.cyberhub_backend.service;

import com.cyberhub_backend.model.Keyboard;
import com.cyberhub_backend.repository.KeyboardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KeyboardService {

    @Autowired
    private KeyboardRepository keyboardRepository;

    public List<Keyboard> getAllKeyboards() {
        return keyboardRepository.findAll();
    }

    public Keyboard getKeyboardById(Long id) {
        return keyboardRepository.findById(id).orElse(null);
    }

    public Keyboard saveKeyboard(Keyboard keyboard) {
        return keyboardRepository.save(keyboard);
    }

    public void deleteKeyboard(Long id) {
        keyboardRepository.deleteById(id);
    }
}
