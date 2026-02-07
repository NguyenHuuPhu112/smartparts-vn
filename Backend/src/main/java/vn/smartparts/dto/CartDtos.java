package vn.smartparts.dto;

import java.math.BigDecimal;
import java.util.List;

public class CartDtos {

    public record CartItemDto(
            Long productId,
            String productName,
            String productImageUrl,
            Integer quantity,
            BigDecimal unitPrice,
            BigDecimal lineTotal
    ) {
    }

    public record CartDto(
            Long id,
            BigDecimal totalAmount,
            List<CartItemDto> items
    ) {
    }

    public record AddItemRequest(
            Long productId,
            Integer quantity
    ) {
    }

    public record UpdateItemRequest(
            Long productId,
            Integer quantity
    ) {
    }
}

