package vn.smartparts.controller;

import lombok.RequiredArgsConstructor;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.smartparts.domain.product.Category;
import vn.smartparts.dto.category.CategoryDto;
import vn.smartparts.dto.category.CreateCategoryRequest;
import vn.smartparts.dto.category.UpdateCategoryRequest;
import vn.smartparts.repository.CategoryRepository;

import vn.smartparts.dto.DataResponse;

import java.util.List;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryRepository categoryRepository;

    @GetMapping
    public ResponseEntity<DataResponse<List<CategoryDto>>> findAll() {
        var list = categoryRepository.findAll().stream()
                .map(this::toDto)
                .toList();
        return ResponseEntity.ok(DataResponse.success(list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DataResponse<CategoryDto>> getById(@PathVariable Long id) {
        return categoryRepository.findById(id)
                .map(c -> ResponseEntity.ok(DataResponse.success(toDto(c))))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<DataResponse<CategoryDto>> create(@Valid @RequestBody CreateCategoryRequest body) {
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
        return ResponseEntity.status(HttpStatus.CREATED).body(DataResponse.success(toDto(saved)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DataResponse<CategoryDto>> update(@PathVariable Long id,
            @RequestBody UpdateCategoryRequest body) {
        return categoryRepository.findById(id)
                .map(existing -> {
                    if (body.name() != null) {
                        existing.setName(body.name());
                    }
                    if (body.description() != null) {
                        existing.setDescription(body.description());
                    }
                    Category parent = null;
                    if (body.parentId() != null) {
                        parent = categoryRepository.findById(body.parentId()).orElse(null);
                    }
                    if (body.parentId() != null) {
                        existing.setParent(parent);
                    }
                    Category saved = categoryRepository.save(existing);
                    return ResponseEntity.ok(DataResponse.success(toDto(saved)));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DataResponse<Void>> delete(@PathVariable Long id) {
        if (!categoryRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        categoryRepository.deleteById(id);
        return ResponseEntity.ok(DataResponse.success("Category deleted successfully", null));
    }

    private CategoryDto toDto(Category category) {
        return new CategoryDto(
                category.getId(),
                category.getName(),
                category.getDescription(),
                category.getParent() != null ? category.getParent().getId() : null);
    }
}
