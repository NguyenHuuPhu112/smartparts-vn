package vn.smartparts.dto.user;

public record UpdateProfileRequest(
        String fullName,
        String phone,
        String avatarUrl) {
}
