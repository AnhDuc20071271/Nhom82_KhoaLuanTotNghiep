package com.cyberhub_backend.controller;

import com.cyberhub_backend.model.Mouse;
import com.cyberhub_backend.service.MouseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/mice")
public class MouseController {

    @Autowired
    private MouseService mouseService;

    @GetMapping
    public List<Mouse> getAllMice() {
        return mouseService.getAllMice();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mouse> getMouseById(@PathVariable Long id) {
        return mouseService.getMouseById(id)
                .map(mouse -> ResponseEntity.ok(mouse)) // Xử lý Optional<Mouse>
                .orElse(ResponseEntity.notFound().build()); // Trả về 404 nếu không tìm thấy sản phẩm
    }

    @PostMapping
    public Mouse createMouse(@RequestBody Mouse mouse) {
        return mouseService.saveMouse(mouse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Mouse> updateMouse(@PathVariable Long id, @RequestBody Mouse mouseDetails) {
        return mouseService.updateMouse(id, mouseDetails)
                .map(updatedMouse -> ResponseEntity.ok(updatedMouse))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMouse(@PathVariable Long id) {
        if (mouseService.deleteMouse(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public List<Mouse> searchMice(@RequestParam String keyword) {
        return mouseService.searchMice(keyword);
    }
}
