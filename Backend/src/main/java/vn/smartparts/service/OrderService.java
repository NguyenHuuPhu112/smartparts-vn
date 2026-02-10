package vn.smartparts.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.smartparts.domain.cart.Cart;
import vn.smartparts.domain.cart.CartItem;
import vn.smartparts.domain.order.Order;
import vn.smartparts.domain.order.OrderItem;
import vn.smartparts.domain.order.OrderStatus;
import vn.smartparts.domain.order.PaymentMethod;
import vn.smartparts.domain.user.Address;
import vn.smartparts.domain.user.User;
import vn.smartparts.dto.order.OrderDto;
import vn.smartparts.dto.order.OrderItemDto;
import vn.smartparts.repository.AddressRepository;
import vn.smartparts.repository.CartRepository;
import vn.smartparts.repository.OrderRepository;
import vn.smartparts.repository.UserRepository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class OrderService {

        private final OrderRepository orderRepository;
        private final CartRepository cartRepository;
        private final UserRepository userRepository;
        private final AddressRepository addressRepository;

        public OrderDto placeOrder(Long userId, Long addressId, PaymentMethod paymentMethod, BigDecimal shippingFee) {
                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new NoSuchElementException("User not found"));

                Cart cart = cartRepository.findByUser(user)
                                .orElseThrow(() -> new NoSuchElementException("Cart is empty"));

                if (cart.getItems().isEmpty()) {
                        throw new IllegalStateException("Cart has no items");
                }

                Address address = addressRepository.findById(addressId)
                                .orElseThrow(() -> new NoSuchElementException("Address not found"));

                BigDecimal subtotal = cart.getItems().stream()
                                .map(CartItem::getLineTotal)
                                .reduce(BigDecimal.ZERO, BigDecimal::add);

                BigDecimal shipFee = shippingFee != null ? shippingFee : BigDecimal.ZERO;
                BigDecimal total = subtotal.add(shipFee);

                Order order = Order.builder()
                                .code(generateOrderCode())
                                .user(user)
                                .shippingAddress(address)
                                .status(OrderStatus.PENDING)
                                .paymentMethod(paymentMethod != null ? paymentMethod : PaymentMethod.COD)
                                .subtotalAmount(subtotal)
                                .shippingFee(shipFee)
                                .totalAmount(total)
                                .build();

                for (CartItem ci : cart.getItems()) {
                        OrderItem oi = OrderItem.builder()
                                        .order(order)
                                        .product(ci.getProduct())
                                        .quantity(ci.getQuantity())
                                        .unitPrice(ci.getUnitPrice())
                                        .lineTotal(ci.getLineTotal())
                                        .build();
                        order.getItems().add(oi);
                }

                // clear cart
                cart.getItems().clear();
                cart.setTotalAmount(BigDecimal.ZERO);

                cartRepository.save(cart);
                return toDto(orderRepository.save(order));
        }

        @Transactional(readOnly = true)
        public List<OrderDto> getOrdersOfUser(Long userId) {
                User user = userRepository.findById(userId)
                                .orElseThrow(() -> new NoSuchElementException("User not found"));
                return orderRepository.findByUserOrderByCreatedAtDesc(user).stream()
                                .map(this::toDto)
                                .toList();
        }

        private String generateOrderCode() {
                return "OD" + LocalDateTime.now().format(java.time.format.DateTimeFormatter.ofPattern("yyyyMMddHHmmss"))
                                + UUID.randomUUID().toString().substring(0, 4).toUpperCase();
        }

        private OrderDto toDto(Order order) {
                var items = order.getItems().stream()
                                .map(i -> new OrderItemDto(
                                                i.getProduct().getId(),
                                                i.getProduct().getName(),
                                                i.getProduct().getMainImageUrl(),
                                                i.getQuantity(),
                                                i.getUnitPrice(),
                                                i.getLineTotal()))
                                .toList();

                return new OrderDto(
                                order.getId(),
                                order.getCode(),
                                order.getStatus(),
                                order.getPaymentMethod(),
                                order.getSubtotalAmount(),
                                order.getShippingFee(),
                                order.getTotalAmount(),
                                order.getCreatedAt(),
                                items);
        }
}
