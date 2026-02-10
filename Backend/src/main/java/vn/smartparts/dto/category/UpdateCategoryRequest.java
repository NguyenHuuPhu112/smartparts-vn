package vn.smartparts.dto.category;

public record UpdateCategoryRequest(
        String name,
        String description,
        Long parentId) {
}
