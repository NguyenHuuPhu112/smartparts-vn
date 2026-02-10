package vn.smartparts.dto.order;

import vn.smartparts.domain.order.OrderStatus;
import vn.smartparts.domain.order.PaymentMethod;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record OrderDto(
        Long id,
        String code,
        OrderStatus status,
        PaymentMethod paymentMethod,
        BigDecimal subtotalAmount,
        BigDecimal shippingFee,
        BigDecimal totalAmount,
        LocalDateTime createdAt,
        List<OrderItemDto> items) {
}
