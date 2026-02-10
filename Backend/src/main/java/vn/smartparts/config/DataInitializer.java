package vn.smartparts.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import vn.smartparts.domain.user.Role;
import vn.smartparts.domain.user.User;
import vn.smartparts.repository.RoleRepository;
import vn.smartparts.repository.UserRepository;

import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;

@Component
@RequiredArgsConstructor
@Slf4j
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        log.info("Starting data initialization...");

        // 1. Init Roles
        Role adminRole = initRole("ROLE_ADMIN", "Administrator");
        Role userRole = initRole("ROLE_USER", "Standard User");

        // 2. Init Admin User
        initAdminUser(adminRole);

        log.info("Data initialization completed.");
    }

    private Role initRole(String code, String name) {
        return roleRepository.findByCode(code)
                .orElseGet(() -> {
                    log.info("Creating role: {}", code);
                    return roleRepository.save(Role.builder()
                            .code(code)
                            .name(name)
                            .build());
                });
    }

    private void initAdminUser(Role adminRole) {
        String adminEmail = "admin@smartparts.vn";
        if (userRepository.findByEmail(adminEmail).isEmpty()) {
            log.info("Creating default admin user: {}", adminEmail);
            User admin = User.builder()
                    .email(adminEmail)
                    .password(passwordEncoder.encode("admin")) // Default password
                    .fullName("System Administrator")
                    .enabled(true)
                    .locked(false)
                    .roles(new HashSet<>(Collections.singletonList(adminRole)))
                    .build();
            userRepository.save(admin);
        } else {
            log.info("Admin user already exists.");
        }
    }
}
