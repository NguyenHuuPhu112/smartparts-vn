package vn.smartparts.dto;

import vn.smartparts.domain.order.OrderStatus;
import vn.smartparts.domain.order.PaymentMethod;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class OrderDtos {

    public record OrderItemDto(
            Long productId,
            String productName,
            String productImageUrl,
            Integer quantity,
            BigDecimal unitPrice,
            BigDecimal lineTotal
    ) {
    }

    public record OrderDto(
            Long id,
            String code,
            OrderStatus status,
            PaymentMethod paymentMethod,
            BigDecimal subtotalAmount,
            BigDecimal shippingFee,
            BigDecimal totalAmount,
            LocalDateTime createdAt,
            List<OrderItemDto> items
    ) {
    }

    public record PlaceOrderRequest(
            Long addressId,
            PaymentMethod paymentMethod,
            BigDecimal shippingFee
    ) {
    }
}

