package vn.smartparts.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import vn.smartparts.dto.user.UpdateProfileRequest;
import vn.smartparts.dto.user.UserDto;
import vn.smartparts.service.UserService;

import vn.smartparts.dto.DataResponse;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
@Tag(name = "User", description = "User management APIs")
@SecurityRequirement(name = "bearerAuth")
public class UserController {

    private final UserService userService;

    @Operation(summary = "Get all users (Admin only)")
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DataResponse<Page<UserDto>>> getAllUsers(@ParameterObject Pageable pageable) {
        return ResponseEntity.ok(DataResponse.success(userService.getAll(pageable)));
    }

    @Operation(summary = "Get current user profile")
    @GetMapping("/me")
    public ResponseEntity<DataResponse<UserDto>> getCurrentUser(@AuthenticationPrincipal UserDetails userDetails) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(DataResponse.success(userService.getByEmail(email)));
    }

    @Operation(summary = "Update current user profile")
    @PutMapping("/me")
    public ResponseEntity<DataResponse<UserDto>> updateCurrentUser(
            @AuthenticationPrincipal UserDetails userDetails,
            @RequestBody UpdateProfileRequest request) {
        String email = userDetails.getUsername();
        UserDto currentUser = userService.getByEmail(email);
        return ResponseEntity.ok(DataResponse.success(userService.update(currentUser.id(), request)));
    }

    @Operation(summary = "Get user by ID (Admin only)")
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DataResponse<UserDto>> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(DataResponse.success(userService.getById(id)));
    }

    @Operation(summary = "Delete user by ID (Admin only)")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<DataResponse<Void>> deleteUser(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.ok(DataResponse.success("User deleted successfully", null));
    }
}
