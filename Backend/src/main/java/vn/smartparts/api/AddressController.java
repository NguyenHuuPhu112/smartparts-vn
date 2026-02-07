package vn.smartparts.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import vn.smartparts.domain.user.User;
import vn.smartparts.dto.AddressDtos;
import vn.smartparts.repository.AddressRepository;
import vn.smartparts.repository.UserRepository;
import vn.smartparts.security.CustomUserDetails;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@RequiredArgsConstructor
public class AddressController {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    @GetMapping
    public List<AddressDtos.AddressDto> list(@AuthenticationPrincipal CustomUserDetails currentUser) {
        User user = userRepository.findById(currentUser.getId()).orElseThrow();
        return addressRepository.findByUserOrderByIsDefaultDesc(user).stream()
                .map(this::toDto)
                .toList();
    }

    @PostMapping
    public ResponseEntity<AddressDtos.AddressDto> create(@AuthenticationPrincipal CustomUserDetails currentUser,
                                                        @RequestBody AddressDtos.AddressCreateRequest body) {
        User user = userRepository.findById(currentUser.getId()).orElseThrow();
        var address = vn.smartparts.domain.user.Address.builder()
                .user(user)
                .line1(body.line1())
                .line2(body.line2())
                .city(body.city())
                .district(body.district())
                .ward(body.ward())
                .phone(body.phone())
                .isDefault(body.isDefault() != null ? body.isDefault() : Boolean.FALSE)
                .build();

        var saved = addressRepository.save(address);
        return ResponseEntity.status(HttpStatus.CREATED).body(toDto(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AddressDtos.AddressDto> update(@AuthenticationPrincipal CustomUserDetails currentUser,
                                                        @PathVariable Long id,
                                                        @RequestBody AddressDtos.AddressUpdateRequest body) {
        User user = userRepository.findById(currentUser.getId()).orElseThrow();
        return addressRepository.findById(id)
                .filter(addr -> addr.getUser().getId().equals(user.getId()))
                .map(existing -> {
                    existing.setLine1(body.line1());
                    existing.setLine2(body.line2());
                    existing.setCity(body.city());
                    existing.setDistrict(body.district());
                    existing.setWard(body.ward());
                    existing.setPhone(body.phone());
                    existing.setIsDefault(body.isDefault() != null ? body.isDefault() : Boolean.FALSE);
                    var saved = addressRepository.save(existing);
                    return ResponseEntity.ok(toDto(saved));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@AuthenticationPrincipal CustomUserDetails currentUser,
                                       @PathVariable Long id) {
        User user = userRepository.findById(currentUser.getId()).orElseThrow();
        return addressRepository.findById(id)
                .filter(addr -> addr.getUser().getId().equals(user.getId()))
                .map(existing -> {
                    addressRepository.delete(existing);
                    return ResponseEntity.noContent().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private AddressDtos.AddressDto toDto(vn.smartparts.domain.user.Address address) {
        return new AddressDtos.AddressDto(
                address.getId(),
                address.getLine1(),
                address.getLine2(),
                address.getCity(),
                address.getDistrict(),
                address.getWard(),
                address.getPhone(),
                address.getIsDefault()
        );
    }
}

