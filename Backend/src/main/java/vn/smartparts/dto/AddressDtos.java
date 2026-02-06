package vn.smartparts.dto;

public class AddressDtos {

    public record AddressDto(
            Long id,
            String line1,
            String line2,
            String city,
            String district,
            String ward,
            String phone,
            Boolean isDefault
    ) {
    }

    public record AddressCreateRequest(
            String line1,
            String line2,
            String city,
            String district,
            String ward,
            String phone,
            Boolean isDefault
    ) {
    }

    public record AddressUpdateRequest(
            String line1,
            String line2,
            String city,
            String district,
            String ward,
            String phone,
            Boolean isDefault
    ) {
    }
}

