package vn.smartparts.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import vn.smartparts.domain.user.User;
import vn.smartparts.dto.AuthDtos;
import vn.smartparts.repository.RoleRepository;
import vn.smartparts.repository.UserRepository;
import vn.smartparts.security.JwtTokenProvider;

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

    @PostMapping("/login")
    public ResponseEntity<AuthDtos.JwtResponse> login(@RequestBody AuthDtos.LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.password())
        );
        String token = jwtTokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new AuthDtos.JwtResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody AuthDtos.RegisterRequest request) {
        if (userRepository.findByEmail(request.email()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already in use");
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
        return ResponseEntity.ok().build();
    }
}

