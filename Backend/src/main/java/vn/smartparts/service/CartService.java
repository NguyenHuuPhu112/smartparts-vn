package vn.smartparts.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.smartparts.domain.cart.Cart;
import vn.smartparts.domain.cart.CartItem;
import vn.smartparts.domain.product.Product;
import vn.smartparts.domain.user.User;
import vn.smartparts.dto.cart.CartDto;
import vn.smartparts.dto.cart.CartItemDto;
import vn.smartparts.repository.CartRepository;
import vn.smartparts.repository.ProductRepository;
import vn.smartparts.repository.UserRepository;

import java.math.BigDecimal;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public Cart getCartForUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new NoSuchElementException("User not found"));
        return cartRepository.findByUser(user)
                .orElseGet(() -> createEmptyCart(user));
    }

    public CartDto getCartDtoForUser(Long userId) {
        return toDto(getCartForUser(userId));
    }

    public CartDto addItem(Long userId, Long productId, int quantity) {
        if (quantity <= 0) {
            throw new IllegalArgumentException("Quantity must be > 0");
        }

        Cart cart = getCartForUser(userId);
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new NoSuchElementException("Product not found"));

        CartItem existing = cart.getItems().stream()
                .filter(i -> i.getProduct().getId().equals(productId))
                .findFirst()
                .orElse(null);

        if (existing == null) {
            CartItem item = CartItem.builder()
                    .cart(cart)
                    .product(product)
                    .quantity(quantity)
                    .unitPrice(product.getPrice())
                    .build();
            item.setLineTotal(item.getUnitPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
            cart.getItems().add(item);
        } else {
            existing.setQuantity(existing.getQuantity() + quantity);
            existing.setLineTotal(existing.getUnitPrice().multiply(BigDecimal.valueOf(existing.getQuantity())));
        }

        recalcTotal(cart);
        return toDto(cartRepository.save(cart));
    }

    public CartDto updateItem(Long userId, Long productId, int quantity) {
        if (quantity < 0) {
            throw new IllegalArgumentException("Quantity must be >= 0");
        }

        Cart cart = getCartForUser(userId);

        CartItem item = cart.getItems().stream()
                .filter(i -> i.getProduct().getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Item not in cart"));

        if (quantity == 0) {
            cart.getItems().remove(item);
        } else {
            item.setQuantity(quantity);
            item.setLineTotal(item.getUnitPrice().multiply(BigDecimal.valueOf(quantity)));
        }

        recalcTotal(cart);
        return toDto(cartRepository.save(cart));
    }

    public CartDto clearCart(Long userId) {
        Cart cart = getCartForUser(userId);
        cart.getItems().clear();
        cart.setTotalAmount(BigDecimal.ZERO);
        return toDto(cartRepository.save(cart));
    }

    private Cart createEmptyCart(User user) {
        Cart cart = Cart.builder()
                .user(user)
                .totalAmount(BigDecimal.ZERO)
                .build();
        return cartRepository.save(cart);
    }

    private void recalcTotal(Cart cart) {
        BigDecimal total = cart.getItems().stream()
                .map(CartItem::getLineTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        cart.setTotalAmount(total);
    }

    private CartDto toDto(Cart cart) {
        var items = cart.getItems().stream()
                .map(i -> new CartItemDto(
                        i.getProduct().getId(),
                        i.getProduct().getName(),
                        i.getProduct().getMainImageUrl(),
                        i.getQuantity(),
                        i.getUnitPrice(),
                        i.getLineTotal()))
                .toList();
        return new CartDto(cart.getId(), cart.getTotalAmount(), items);
    }
}
