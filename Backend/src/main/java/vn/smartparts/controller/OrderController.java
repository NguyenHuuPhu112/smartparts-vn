package vn.smartparts.controller;

import lombok.RequiredArgsConstructor;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import vn.smartparts.dto.order.OrderDto;
import vn.smartparts.dto.order.PlaceOrderRequest;
import vn.smartparts.security.CustomUserDetails;
import vn.smartparts.service.OrderService;

import vn.smartparts.dto.DataResponse;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public ResponseEntity<DataResponse<OrderDto>> placeOrder(@AuthenticationPrincipal CustomUserDetails currentUser,
            @Valid @RequestBody PlaceOrderRequest body) {
        var order = orderService.placeOrder(currentUser.getId(), body.addressId(), body.paymentMethod(),
                body.shippingFee());
        return ResponseEntity.ok(DataResponse.success(order));
    }

    @GetMapping
    public ResponseEntity<DataResponse<List<OrderDto>>> getOrdersOfUser(
            @AuthenticationPrincipal CustomUserDetails currentUser) {
        var orders = orderService.getOrdersOfUser(currentUser.getId());
        return ResponseEntity.ok(DataResponse.success(orders));
    }
}
