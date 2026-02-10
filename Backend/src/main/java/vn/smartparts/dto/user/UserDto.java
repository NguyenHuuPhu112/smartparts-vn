package vn.smartparts.dto.user;

import java.time.LocalDateTime;
import java.util.Set;

public record UserDto(
        Long id,
        String email,
        String fullName,
        String phone,
        String avatarUrl,
        Boolean enabled,
        Set<String> roles,
        LocalDateTime createdAt,
        LocalDateTime updatedAt) {
}
