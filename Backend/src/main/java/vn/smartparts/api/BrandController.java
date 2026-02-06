package vn.smartparts.api;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.smartparts.domain.product.Brand;
import vn.smartparts.dto.BrandDtos;
import vn.smartparts.repository.BrandRepository;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
public class BrandController {

    private final BrandRepository brandRepository;

    @GetMapping
    public List<BrandDtos.BrandDto> findAll() {
        return brandRepository.findAll().stream()
                .map(this::toDto)
                .toList();
    }

    @GetMapping("/{id}")
    public ResponseEntity<BrandDtos.BrandDto> getById(@PathVariable Long id) {
        return brandRepository.findById(id)
                .map(b -> ResponseEntity.ok(toDto(b)))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<BrandDtos.BrandDto> create(@RequestBody BrandDtos.BrandCreateRequest body) {
        Brand brand = Brand.builder()
                .name(body.name())
                .logoUrl(body.logoUrl())
                .build();
        Brand saved = brandRepository.save(brand);
        return ResponseEntity.status(HttpStatus.CREATED).body(toDto(saved));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BrandDtos.BrandDto> update(@PathVariable Long id, @RequestBody BrandDtos.BrandUpdateRequest body) {
        return brandRepository.findById(id)
                .map(existing -> {
                    existing.setName(body.name());
                    existing.setLogoUrl(body.logoUrl());
                    Brand saved = brandRepository.save(existing);
                    return ResponseEntity.ok(toDto(saved));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!brandRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        brandRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private BrandDtos.BrandDto toDto(Brand brand) {
        return new BrandDtos.BrandDto(
                brand.getId(),
                brand.getName(),
                brand.getLogoUrl()
        );
    }
}

