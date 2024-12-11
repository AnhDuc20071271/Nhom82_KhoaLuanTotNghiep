package com.cyberhub_backend.controller;

import com.cyberhub_backend.model.Product;
import com.cyberhub_backend.service.ProductService;
import com.cyberhub_backend.dto.ProductResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

@RestController
@RequestMapping("/products")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public Page<ProductResponse> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "50") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> products = productService.getAllProducts(pageable);

        // Chuyển đổi Product sang DTO ProductResponse
        return products.map(product -> new ProductResponse(
                product.getId(),
                product.getName(),
                product.getCategory(),
                product.getPrice(),
                product.getDiscount(),
                product.getStock(),
                product.getDescription(),
                product.getImageUrl(),
                product.getBasicSpecs(), // Thêm trường này
                product.getRating(),     // Thêm trường này
                null // details có thể để null nếu không cần thiết
        ));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long id) {
        return productService.getProductByIdWithDetails(id)
                .map(product -> {
                    // Tạo danh sách details
                    List<ProductResponse.Detail> details = product.getProductDetails().stream()
                            .map(detail -> new ProductResponse.Detail(detail.getSpecKey(), detail.getSpecValue()))
                            .collect(Collectors.toList());

                    // Khởi tạo ProductResponse với đầy đủ thông tin
                    ProductResponse response = new ProductResponse(
                            product.getId(),
                            product.getName(),
                            product.getCategory(),
                            product.getPrice(),
                            product.getDiscount(),
                            product.getStock(),
                            product.getDescription(),
                            product.getImageUrl(),
                            product.getBasicSpecs(), // Thêm trường này
                            product.getRating(),     // Thêm trường này
                            details
                    );

                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/create")
    public Product createProduct(@RequestBody Product product) {
        // Lưu ý: cần xử lý các trường productDetails nếu cần
        return productService.saveProduct(product);
    }

   @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        return productService.updateProduct(id, productDetails)
                .map(updatedProduct -> ResponseEntity.ok(updatedProduct))
                .orElse(ResponseEntity.notFound().build());
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        if (productService.deleteProduct(id)) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String keyword) {
        return productService.searchProducts(keyword);
    }
}
