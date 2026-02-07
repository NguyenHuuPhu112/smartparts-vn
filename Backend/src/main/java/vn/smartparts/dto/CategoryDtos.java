package vn.smartparts.dto;

public class CategoryDtos {

    public record CategoryDto(
            Long id,
            String name,
            String description,
            Long parentId
    ) {
    }

    public record CategoryCreateRequest(
            String name,
            String description,
            Long parentId
    ) {
    }

    public record CategoryUpdateRequest(
            String name,
            String description,
            Long parentId
    ) {
    }
}

