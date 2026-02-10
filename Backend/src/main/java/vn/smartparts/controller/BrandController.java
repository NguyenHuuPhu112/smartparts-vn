package vn.smartparts.controller;

import lombok.RequiredArgsConstructor;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.smartparts.domain.product.Brand;
import vn.smartparts.dto.brand.BrandDto;
import vn.smartparts.dto.brand.CreateBrandRequest;
import vn.smartparts.dto.brand.UpdateBrandRequest;
import vn.smartparts.repository.BrandRepository;

import vn.smartparts.dto.DataResponse;

import java.util.List;

@RestController
@RequestMapping("/api/brands")
@RequiredArgsConstructor
public class BrandController {

    private final BrandRepository brandRepository;

    @GetMapping
    public ResponseEntity<DataResponse<List<BrandDto>>> findAll() {
        var list = brandRepository.findAll().stream()
                .map(this::toDto)
                .toList();
        return ResponseEntity.ok(DataResponse.success(list));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DataResponse<BrandDto>> getById(@PathVariable Long id) {
        return brandRepository.findById(id)
                .map(b -> ResponseEntity.ok(DataResponse.success(toDto(b))))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<DataResponse<BrandDto>> create(@Valid @RequestBody CreateBrandRequest body) {
        Brand brand = Brand.builder()
                .name(body.name())
                .logoUrl(body.logoUrl())
                .build();
        Brand saved = brandRepository.save(brand);
        return ResponseEntity.status(HttpStatus.CREATED).body(DataResponse.success(toDto(saved)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DataResponse<BrandDto>> update(@PathVariable Long id, @RequestBody UpdateBrandRequest body) {
        return brandRepository.findById(id)
                .map(existing -> {
                    if (body.name() != null) {
                        existing.setName(body.name());
                    }
                    if (body.logoUrl() != null) {
                        existing.setLogoUrl(body.logoUrl());
                    }
                    Brand saved = brandRepository.save(existing);
                    return ResponseEntity.ok(DataResponse.success(toDto(saved)));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DataResponse<Void>> delete(@PathVariable Long id) {
        if (!brandRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        brandRepository.deleteById(id);
        return ResponseEntity.ok(DataResponse.success("Brand deleted successfully", null));
    }

    private BrandDto toDto(Brand brand) {
        return new BrandDto(
                brand.getId(),
                brand.getName(),
                brand.getLogoUrl());
    }
}
