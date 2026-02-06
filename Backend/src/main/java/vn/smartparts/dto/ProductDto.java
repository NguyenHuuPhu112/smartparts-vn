package vn.smartparts.dto;

import java.math.BigDecimal;
import java.util.List;

public record ProductDto(
        Long id,
        String sku,
        String name,
        String description,
        String brandName,
        String categoryName,
        BigDecimal price,
        BigDecimal originalPrice,
        Integer stockQuantity,
        Boolean active,
        String mainImageUrl,
        List<String> imageUrls
) {
}

