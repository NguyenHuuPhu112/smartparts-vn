package vn.smartparts.dto.category;

public record CreateCategoryRequest(
        String name,
        String description,
        Long parentId) {
}
