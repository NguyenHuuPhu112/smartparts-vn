package vn.smartparts.dto.cart;

public record UpdateItemRequest(
        Long productId,
        Integer quantity) {
}
