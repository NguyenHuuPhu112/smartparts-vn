package vn.smartparts.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.smartparts.domain.user.Role;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByCode(String code);
}

