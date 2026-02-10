package vn.smartparts.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.smartparts.domain.user.User;
import vn.smartparts.dto.user.UpdateProfileRequest;
import vn.smartparts.dto.user.UserDto;
import vn.smartparts.repository.UserRepository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;

    public Page<UserDto> getAll(Pageable pageable) {
        return userRepository.findAll(pageable).map(this::toDto);
    }

    public UserDto getById(Long id) {
        return userRepository.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new NoSuchElementException("User not found with id: " + id));
    }

    public UserDto getByEmail(String email) {
        return userRepository.findByEmail(email)
                .map(this::toDto)
                .orElseThrow(() -> new NoSuchElementException("User not found with email: " + email));
    }

    @Transactional
    public UserDto update(Long id, UpdateProfileRequest request) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("User not found with id: " + id));

        if (request.fullName() != null) {
            user.setFullName(request.fullName());
        }
        if (request.phone() != null) {
            user.setPhone(request.phone());
        }
        if (request.avatarUrl() != null) {
            user.setAvatarUrl(request.avatarUrl());
        }

        return toDto(userRepository.save(user));
    }

    @Transactional
    public void delete(Long id) {
        if (!userRepository.existsById(id)) {
            throw new NoSuchElementException("User not found with id: " + id);
        }
        userRepository.deleteById(id);
    }

    private UserDto toDto(User user) {
        return new UserDto(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getPhone(),
                user.getAvatarUrl(),
                user.getEnabled(),
                user.getRoles().stream()
                        .map(role -> role.getCode()) // Assuming Role has getCode() or getName()
                        .collect(Collectors.toSet()),
                user.getCreatedAt(),
                user.getUpdatedAt());
    }
}
