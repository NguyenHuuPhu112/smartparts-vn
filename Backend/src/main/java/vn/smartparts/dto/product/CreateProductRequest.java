package vn.smartparts.dto.product;

import java.math.BigDecimal;
import java.util.List;

public record CreateProductRequest(
        String sku,
        String name,
        String description,
        Long brandId,
        Long categoryId,
        BigDecimal price,
        BigDecimal originalPrice,
        Integer stockQuantity,
        Boolean active,
        String mainImageUrl,
        List<String> imageUrls) {
}
