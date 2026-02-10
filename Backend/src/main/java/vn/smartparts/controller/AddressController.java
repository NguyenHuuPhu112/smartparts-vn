package vn.smartparts.controller;

import lombok.RequiredArgsConstructor;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import vn.smartparts.domain.user.User;
import vn.smartparts.dto.address.AddressDto;
import vn.smartparts.dto.address.CreateAddressRequest;
import vn.smartparts.dto.address.UpdateAddressRequest;
import vn.smartparts.repository.AddressRepository;
import vn.smartparts.repository.UserRepository;
import vn.smartparts.security.CustomUserDetails;

import vn.smartparts.dto.DataResponse;

import java.util.List;

@RestController
@RequestMapping("/api/addresses")
@RequiredArgsConstructor
public class AddressController {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;

    @GetMapping
    public ResponseEntity<DataResponse<List<AddressDto>>> list(@AuthenticationPrincipal CustomUserDetails currentUser) {
        User user = userRepository.findById(currentUser.getId()).orElseThrow();
        var list = addressRepository.findByUserOrderByIsDefaultDesc(user).stream()
                .map(this::toDto)
                .toList();
        return ResponseEntity.ok(DataResponse.success(list));
    }

    @PostMapping
    public ResponseEntity<DataResponse<AddressDto>> create(@AuthenticationPrincipal CustomUserDetails currentUser,
            @Valid @RequestBody CreateAddressRequest body) {
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
        return ResponseEntity.status(HttpStatus.CREATED).body(DataResponse.success(toDto(saved)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DataResponse<AddressDto>> update(@AuthenticationPrincipal CustomUserDetails currentUser,
            @PathVariable Long id,
            @RequestBody UpdateAddressRequest body) {
        User user = userRepository.findById(currentUser.getId()).orElseThrow();
        return addressRepository.findById(id)
                .filter(addr -> addr.getUser().getId().equals(user.getId()))
                .map(existing -> {
                    if (body.line1() != null) {
                        existing.setLine1(body.line1());
                    }
                    if (body.line2() != null) {
                        existing.setLine2(body.line2());
                    }
                    if (body.city() != null) {
                        existing.setCity(body.city());
                    }
                    if (body.district() != null) {
                        existing.setDistrict(body.district());
                    }
                    if (body.ward() != null) {
                        existing.setWard(body.ward());
                    }
                    if (body.phone() != null) {
                        existing.setPhone(body.phone());
                    }
                    if (body.isDefault() != null) {
                        existing.setIsDefault(body.isDefault());
                    }
                    var saved = addressRepository.save(existing);
                    return ResponseEntity.ok(DataResponse.success(toDto(saved)));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DataResponse<Void>> delete(@AuthenticationPrincipal CustomUserDetails currentUser,
            @PathVariable Long id) {
        User user = userRepository.findById(currentUser.getId()).orElseThrow();
        return addressRepository.findById(id)
                .filter(addr -> addr.getUser().getId().equals(user.getId()))
                .map(existing -> {
                    addressRepository.delete(existing);
                    return ResponseEntity.ok(DataResponse.<Void>success("Address deleted successfully", null));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    private AddressDto toDto(vn.smartparts.domain.user.Address address) {
        return new AddressDto(
                address.getId(),
                address.getLine1(),
                address.getLine2(),
                address.getCity(),
                address.getDistrict(),
                address.getWard(),
                address.getPhone(),
                address.getIsDefault());
    }
}
