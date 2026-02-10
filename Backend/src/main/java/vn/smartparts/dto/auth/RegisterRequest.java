package vn.smartparts.dto.auth;

public record RegisterRequest(
        String email,
        String password,
        String fullName,
        String phone) {
}
