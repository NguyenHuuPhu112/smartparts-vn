package vn.smartparts.dto;

public class BrandDtos {

    public record BrandDto(
            Long id,
            String name,
            String logoUrl
    ) {
    }

    public record BrandCreateRequest(
            String name,
            String logoUrl
    ) {
    }

    public record BrandUpdateRequest(
            String name,
            String logoUrl
    ) {
    }
}

