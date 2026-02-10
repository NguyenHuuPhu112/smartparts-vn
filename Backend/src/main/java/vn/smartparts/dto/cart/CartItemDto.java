package vn.smartparts.dto.cart;

import java.math.BigDecimal;

public record CartItemDto(
        Long productId,
        String productName,
        String productImageUrl,
        Integer quantity,
        BigDecimal unitPrice,
        BigDecimal lineTotal) {
}
