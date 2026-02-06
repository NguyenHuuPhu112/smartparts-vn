package vn.smartparts.dto;

import java.math.BigDecimal;
import java.util.List;

public class ProductRequests {

    public record ProductCreateRequest(
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
            List<String> imageUrls
    ) {
    }

    public record ProductUpdateRequest(
            String name,
            String description,
            Long brandId,
            Long categoryId,
            BigDecimal price,
            BigDecimal originalPrice,
            Integer stockQuantity,
            Boolean active,
            String mainImageUrl,
            List<String> imageUrls
    ) {
    }
}

