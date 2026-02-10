package vn.smartparts.dto.category;

public record CategoryDto(
        Long id,
        String name,
        String description,
        Long parentId) {
}
