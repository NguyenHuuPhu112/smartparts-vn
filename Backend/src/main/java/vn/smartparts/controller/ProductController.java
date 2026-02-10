package vn.smartparts.controller;

import lombok.RequiredArgsConstructor;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.smartparts.dto.DataResponse;
import vn.smartparts.dto.product.CreateProductRequest;
import vn.smartparts.dto.product.ProductDto;
import vn.smartparts.dto.product.UpdateProductRequest;
import vn.smartparts.service.ProductService;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<DataResponse<Page<ProductDto>>> search(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long brandId,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        var result = productService.search(keyword, brandId, categoryId, minPrice, maxPrice, page, size);
        return ResponseEntity.ok(DataResponse.success(result));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DataResponse<ProductDto>> getById(@PathVariable Long id) {
        return ResponseEntity.ok(DataResponse.success(productService.getById(id)));
    }

    @PostMapping
    public ResponseEntity<DataResponse<ProductDto>> create(@Valid @RequestBody CreateProductRequest body) {
        ProductDto created = productService.create(
                body.sku(),
                body.name(),
                body.description(),
                body.brandId(),
                body.categoryId(),
                body.price(),
                body.originalPrice(),
                body.stockQuantity(),
                body.active(),
                body.mainImageUrl(),
                body.imageUrls());
        return ResponseEntity.status(HttpStatus.CREATED).body(DataResponse.success(created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DataResponse<ProductDto>> update(@PathVariable Long id,
            @RequestBody UpdateProductRequest body) {
        var updated = productService.update(
                id,
                body.name(),
                body.description(),
                body.brandId(),
                body.categoryId(),
                body.price(),
                body.originalPrice(),
                body.stockQuantity(),
                body.active(),
                body.mainImageUrl(),
                body.imageUrls());
        return ResponseEntity.ok(DataResponse.success(updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DataResponse<Void>> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.ok(DataResponse.success("Deleted successfully", null));
    }
}
