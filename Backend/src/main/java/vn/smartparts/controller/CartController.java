package vn.smartparts.controller;

import lombok.RequiredArgsConstructor;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.*;
import vn.smartparts.dto.DataResponse;
import vn.smartparts.dto.cart.AddItemRequest;
import vn.smartparts.dto.cart.CartDto;
import vn.smartparts.dto.cart.UpdateItemRequest;
import vn.smartparts.security.CustomUserDetails;
import vn.smartparts.service.CartService;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public ResponseEntity<DataResponse<CartDto>> getCart(@AuthenticationPrincipal CustomUserDetails currentUser) {
        return ResponseEntity.ok(DataResponse.success(cartService.getCartDtoForUser(currentUser.getId())));
    }

    @PostMapping("/items")
    public ResponseEntity<DataResponse<CartDto>> addItem(
            @AuthenticationPrincipal CustomUserDetails currentUser,
            @Valid @RequestBody AddItemRequest body) {
        var cart = cartService.addItem(currentUser.getId(), body.productId(), body.quantity());
        return ResponseEntity.ok(DataResponse.success(cart));
    }

    @PutMapping("/items")
    public ResponseEntity<DataResponse<CartDto>> updateItem(
            @AuthenticationPrincipal CustomUserDetails currentUser,
            @Valid @RequestBody UpdateItemRequest body) {
        var cart = cartService.updateItem(currentUser.getId(), body.productId(), body.quantity());
        return ResponseEntity.ok(DataResponse.success(cart));
    }

    @DeleteMapping
    public ResponseEntity<DataResponse<CartDto>> clear(@AuthenticationPrincipal CustomUserDetails currentUser) {
        var cart = cartService.clearCart(currentUser.getId());
        return ResponseEntity.ok(DataResponse.success(cart));
    }
}
