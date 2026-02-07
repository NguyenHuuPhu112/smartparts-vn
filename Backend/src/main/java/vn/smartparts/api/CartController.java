package vn.smartparts.api;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import vn.smartparts.dto.CartDtos;
import vn.smartparts.security.CustomUserDetails;
import vn.smartparts.service.CartService;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    public CartDtos.CartDto getCart(@AuthenticationPrincipal CustomUserDetails currentUser) {
        return cartService.getCartDtoForUser(currentUser.getId());
    }

    @PostMapping("/items")
    public CartDtos.CartDto addItem(
            @AuthenticationPrincipal CustomUserDetails currentUser,
            @RequestBody CartDtos.AddItemRequest body
    ) {
        return cartService.addItem(currentUser.getId(), body.productId(), body.quantity());
    }

    @PutMapping("/items")
    public CartDtos.CartDto updateItem(
            @AuthenticationPrincipal CustomUserDetails currentUser,
            @RequestBody CartDtos.UpdateItemRequest body
    ) {
        return cartService.updateItem(currentUser.getId(), body.productId(), body.quantity());
    }

    @DeleteMapping
    public CartDtos.CartDto clear(@AuthenticationPrincipal CustomUserDetails currentUser) {
        return cartService.clearCart(currentUser.getId());
    }
}

