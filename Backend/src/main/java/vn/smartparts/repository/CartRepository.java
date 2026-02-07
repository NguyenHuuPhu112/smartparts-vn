package vn.smartparts.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.smartparts.domain.cart.Cart;
import vn.smartparts.domain.user.User;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {

    Optional<Cart> findByUser(User user);
}

