package vn.smartparts.dto.cart;

public record AddItemRequest(
        Long productId,
        Integer quantity) {
}
