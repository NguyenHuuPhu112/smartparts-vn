package vn.smartparts.controller;

import lombok.RequiredArgsConstructor;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import vn.smartparts.domain.user.User;
import vn.smartparts.dto.auth.JwtResponse;
import vn.smartparts.dto.auth.LoginRequest;
import vn.smartparts.dto.auth.RegisterRequest;
import vn.smartparts.repository.RoleRepository;
import vn.smartparts.repository.UserRepository;
import vn.smartparts.security.JwtTokenProvider;

import vn.smartparts.dto.DataResponse;

import java.util.Collections;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final vn.smartparts.service.RefreshTokenService refreshTokenService;

    @PostMapping("/login")
    public ResponseEntity<DataResponse<JwtResponse>> login(@Valid @RequestBody LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password()));

        vn.smartparts.security.CustomUserDetails userDetails = (vn.smartparts.security.CustomUserDetails) authentication
                .getPrincipal();

        String token = jwtTokenProvider.generateToken(authentication);
        vn.smartparts.domain.user.RefreshToken refreshToken = refreshTokenService
                .createRefreshToken(userDetails.getUser().getId());

        return ResponseEntity.ok(DataResponse.success(new JwtResponse(token, refreshToken.getToken())));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<DataResponse<vn.smartparts.dto.auth.TokenRefreshResponse>> refreshToken(
            @Valid @RequestBody vn.smartparts.dto.auth.TokenRefreshRequest request) {
        String requestRefreshToken = request.refreshToken();

        return java.util.Optional.of(refreshTokenService.findByToken(requestRefreshToken))
                .map(refreshTokenService::verifyExpiration)
                .map(vn.smartparts.domain.user.RefreshToken::getUser)
                .map(user -> {
                    vn.smartparts.security.CustomUserDetails userDetails = new vn.smartparts.security.CustomUserDetails(
                            user);
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    String token = jwtTokenProvider.generateToken(authentication);
                    return new vn.smartparts.dto.auth.TokenRefreshResponse(token, requestRefreshToken);
                })
                .map(DataResponse::success)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new vn.smartparts.exception.TokenRefreshException(requestRefreshToken,
                        "Refresh token is not in database!"));
    }

    @PostMapping("/register")
    public ResponseEntity<DataResponse<Object>> register(@Valid @RequestBody RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            return ResponseEntity.badRequest().body(DataResponse.error("Email already in use"));
        }

        var userRole = roleRepository.findByCode("ROLE_USER")
                .orElseGet(() -> {
                    var r = new vn.smartparts.domain.user.Role();
                    r.setCode("ROLE_USER");
                    r.setName("User");
                    return roleRepository.save(r);
                });

        User user = User.builder()
                .email(request.email())
                .password(passwordEncoder.encode(request.password()))
                .fullName(request.fullName())
                .phone(request.phone())
                .enabled(true)
                .locked(false)
                .roles(Collections.singleton(userRole))
                .build();

        userRepository.save(user);
        return ResponseEntity.ok(DataResponse.success("User registered successfully", null));
    }
}
