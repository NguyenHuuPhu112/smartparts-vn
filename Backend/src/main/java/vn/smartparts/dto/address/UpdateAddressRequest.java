package vn.smartparts.dto.address;

public record UpdateAddressRequest(
        String line1,
        String line2,
        String city,
        String district,
        String ward,
        String phone,
        Boolean isDefault) {
}
