package vn.smartparts.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.smartparts.domain.order.Order;
import vn.smartparts.domain.user.User;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {

    List<Order> findByUserOrderByCreatedAtDesc(User user);
}

