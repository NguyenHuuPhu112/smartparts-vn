package vn.smartparts.api;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import vn.smartparts.dto.OrderDtos;
import vn.smartparts.security.CustomUserDetails;
import vn.smartparts.service.OrderService;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    @PostMapping
    public OrderDtos.OrderDto placeOrder(@AuthenticationPrincipal CustomUserDetails currentUser,
                                         @RequestBody OrderDtos.PlaceOrderRequest body) {
        return orderService.placeOrder(currentUser.getId(), body.addressId(), body.paymentMethod(), body.shippingFee());
    }

    @GetMapping
    public List<OrderDtos.OrderDto> getOrdersOfUser(@AuthenticationPrincipal CustomUserDetails currentUser) {
        return orderService.getOrdersOfUser(currentUser.getId());
    }
}

