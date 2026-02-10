package vn.smartparts.dto.order;

import java.math.BigDecimal;

public record OrderItemDto(
        Long productId,
        String productName,
        String productImageUrl,
        Integer quantity,
        BigDecimal unitPrice,
        BigDecimal lineTotal) {
}
