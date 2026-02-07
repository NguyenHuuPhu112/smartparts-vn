package vn.smartparts.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.smartparts.domain.product.Category;
import vn.smartparts.dto.CategoryDtos;
import vn.smartparts.repository.CategoryRepository;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryRepository categoryRepository;

    @GetMapping
    public List<CategoryDtos.CategoryDto> findAll() {
        return categoryRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoryDtos.CategoryDto> getById(@PathVariable Long id) {
        return categoryRepository.findById(id)
                .map(c -> ResponseEntity.ok(toDto(c)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CategoryDtos.CategoryDto> create(@RequestBody CategoryDtos.CategoryCreateRequest body) {
        Category parent = null;
        if (body.parentId() != null) {
            parent = categoryRepository.findById(body.parentId()).orElse(null);
        }

        Category category = Category.builder()
                .name(body.name())
                .description(body.description())
                .parent(parent)
                .build();

        Category saved = categoryRepository.save(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(toDto(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoryDtos.CategoryDto> update(@PathVariable Long id, @RequestBody CategoryDtos.CategoryUpdateRequest body) {
        return categoryRepository.findById(id)
                .map(existing -> {
                    existing.setName(body.name());
                    existing.setDescription(body.description());
                    Category parent = null;
                    if (body.parentId() != null) {
                        parent = categoryRepository.findById(body.parentId()).orElse(null);
                    }
                    existing.setParent(parent);
                    Category saved = categoryRepository.save(existing);
                    return ResponseEntity.ok(toDto(saved));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!categoryRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        categoryRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private CategoryDtos.CategoryDto toDto(Category category) {
        return new CategoryDtos.CategoryDto(
                category.getId(),
                category.getName(),
                category.getDescription(),
                category.getParent() != null ? category.getParent().getId() : null
        );
    }
}

