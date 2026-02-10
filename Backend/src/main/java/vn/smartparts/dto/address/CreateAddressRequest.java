package vn.smartparts.dto.address;

public record CreateAddressRequest(
        String line1,
        String line2,
        String city,
        String district,
        String ward,
        String phone,
        Boolean isDefault) {
}
