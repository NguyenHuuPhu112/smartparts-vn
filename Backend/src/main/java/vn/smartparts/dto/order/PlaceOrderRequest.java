package vn.smartparts.dto.order;

import vn.smartparts.domain.order.PaymentMethod;

import java.math.BigDecimal;

public record PlaceOrderRequest(
        Long addressId,
        PaymentMethod paymentMethod,
        BigDecimal shippingFee) {
}
