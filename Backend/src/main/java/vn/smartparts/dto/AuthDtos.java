package vn.smartparts.dto;

public class AuthDtos {

    public record LoginRequest(
            String email,
            String password
    ) {
    }

    public record RegisterRequest(
            String email,
            String password,
            String fullName,
            String phone
    ) {
    }

    public record JwtResponse(
            String accessToken,
            String tokenType
    ) {
        public JwtResponse(String accessToken) {
            this(accessToken, "Bearer");
        }
    }
}

