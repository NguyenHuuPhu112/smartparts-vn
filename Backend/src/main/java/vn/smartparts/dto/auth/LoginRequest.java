package vn.smartparts.dto.auth;

public record LoginRequest(
        String email,
        String password) {
}
