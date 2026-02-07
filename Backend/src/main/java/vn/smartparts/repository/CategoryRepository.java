package vn.smartparts.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.smartparts.domain.product.Category;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByParentIsNull();
}

