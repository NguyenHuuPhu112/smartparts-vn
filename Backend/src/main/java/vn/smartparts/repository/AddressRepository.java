package vn.smartparts.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.smartparts.domain.user.Address;
import vn.smartparts.domain.user.User;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {

    List<Address> findByUserOrderByIsDefaultDesc(User user);
}

