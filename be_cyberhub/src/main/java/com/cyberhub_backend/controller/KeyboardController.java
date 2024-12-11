package com.cyberhub_backend.controller;

import com.cyberhub_backend.model.Keyboard;
import com.cyberhub_backend.service.KeyboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/keyboards")
public class KeyboardController {

    @Autowired
    private KeyboardService keyboardService;

    // API lấy danh sách keyboards
    @GetMapping
    public List<Keyboard> getAllKeyboards() {
        return keyboardService.getAllKeyboards();
    }

    // API lấy keyboard theo ID
    @GetMapping("/{id}")
    public ResponseEntity<Keyboard> getKeyboardById(@PathVariable Long id) {
        Keyboard keyboard = keyboardService.getKeyboardById(id);
        if (keyboard != null) {
            return ResponseEntity.ok(keyboard);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // API thêm mới keyboard
    @PostMapping
    public Keyboard createKeyboard(@RequestBody Keyboard keyboard) {
        return keyboardService.saveKeyboard(keyboard);
    }

    // API xóa keyboard theo ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteKeyboard(@PathVariable Long id) {
        keyboardService.deleteKeyboard(id);
        return ResponseEntity.ok().build();
    }
}
