package vn.smartparts.api;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.smartparts.dto.ProductDto;
import vn.smartparts.dto.ProductRequests;
import vn.smartparts.service.ProductService;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public Page<ProductDto> search(
            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) Long brandId,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size
    ) {
        return productService.search(keyword, brandId, categoryId, minPrice, maxPrice, page, size);
    }

    @GetMapping("/{id}")
    public ProductDto getById(@PathVariable Long id) {
        return productService.getById(id);
    }

    @PostMapping
    public ResponseEntity<ProductDto> create(@RequestBody ProductRequests.ProductCreateRequest body) {
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
                body.imageUrls()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ProductDto update(@PathVariable Long id, @RequestBody ProductRequests.ProductUpdateRequest body) {
        return productService.update(
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
                body.imageUrls()
        );
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        productService.delete(id);
    }
}

