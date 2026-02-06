package vn.smartparts.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import vn.smartparts.domain.product.Brand;
import vn.smartparts.domain.product.Category;
import vn.smartparts.domain.product.Product;
import vn.smartparts.domain.product.ProductImage;
import vn.smartparts.dto.ProductDto;
import vn.smartparts.repository.BrandRepository;
import vn.smartparts.repository.CategoryRepository;
import vn.smartparts.repository.ProductRepository;

import java.math.BigDecimal;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProductService {

    private final ProductRepository productRepository;
    private final BrandRepository brandRepository;
    private final CategoryRepository categoryRepository;

    public Page<ProductDto> search(
            String keyword,
            Long brandId,
            Long categoryId,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            int page,
            int size
    ) {
        Pageable pageable = PageRequest.of(page, size);

        Specification<Product> spec = Specification.where(null);

        if (keyword != null && !keyword.isBlank()) {
            String like = "%" + keyword.toLowerCase() + "%";
            spec = spec.and((root, query, cb) ->
                    cb.or(
                            cb.like(cb.lower(root.get("name")), like),
                            cb.like(cb.lower(root.get("description")), like),
                            cb.like(cb.lower(root.get("sku")), like)
                    )
            );
        }

        if (brandId != null) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("brand").get("id"), brandId)
            );
        }

        if (categoryId != null) {
            spec = spec.and((root, query, cb) ->
                    cb.equal(root.get("category").get("id"), categoryId)
            );
        }

        if (minPrice != null) {
            spec = spec.and((root, query, cb) ->
                    cb.greaterThanOrEqualTo(root.get("price"), minPrice)
            );
        }

        if (maxPrice != null) {
            spec = spec.and((root, query, cb) ->
                    cb.lessThanOrEqualTo(root.get("price"), maxPrice)
            );
        }

        spec = spec.and((root, query, cb) -> cb.isTrue(root.get("active")));

        return productRepository.findAll(spec, pageable).map(this::toDto);
    }

    public ProductDto getById(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Product not found"));
        return toDto(product);
    }

    @Transactional
    public ProductDto create(
            String sku,
            String name,
            String description,
            Long brandId,
            Long categoryId,
            BigDecimal price,
            BigDecimal originalPrice,
            Integer stockQuantity,
            Boolean active,
            String mainImageUrl,
            List<String> imageUrls
    ) {
        Brand brand = null;
        if (brandId != null) {
            brand = brandRepository.findById(brandId)
                    .orElseThrow(() -> new NoSuchElementException("Brand not found"));
        }

        Category category = null;
        if (categoryId != null) {
            category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new NoSuchElementException("Category not found"));
        }

        Product product = Product.builder()
                .sku(sku)
                .name(name)
                .description(description)
                .brand(brand)
                .category(category)
                .price(price)
                .originalPrice(originalPrice)
                .stockQuantity(stockQuantity)
                .active(active != null ? active : Boolean.TRUE)
                .mainImageUrl(mainImageUrl)
                .build();

        if (imageUrls != null && !imageUrls.isEmpty()) {
            for (int i = 0; i < imageUrls.size(); i++) {
                ProductImage img = ProductImage.builder()
                        .product(product)
                        .imageUrl(imageUrls.get(i))
                        .sortOrder(i)
                        .build();
                product.getImages().add(img);
            }
        }

        product = productRepository.save(product);
        return toDto(product);
    }

    @Transactional
    public ProductDto update(
            Long id,
            String name,
            String description,
            Long brandId,
            Long categoryId,
            BigDecimal price,
            BigDecimal originalPrice,
            Integer stockQuantity,
            Boolean active,
            String mainImageUrl,
            List<String> imageUrls
    ) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Product not found"));

        if (name != null) product.setName(name);
        if (description != null) product.setDescription(description);
        if (price != null) product.setPrice(price);
        if (originalPrice != null) product.setOriginalPrice(originalPrice);
        if (stockQuantity != null) product.setStockQuantity(stockQuantity);
        if (active != null) product.setActive(active);
        if (mainImageUrl != null) product.setMainImageUrl(mainImageUrl);

        if (brandId != null) {
            Brand brand = brandRepository.findById(brandId)
                    .orElseThrow(() -> new NoSuchElementException("Brand not found"));
            product.setBrand(brand);
        }
        if (categoryId != null) {
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new NoSuchElementException("Category not found"));
            product.setCategory(category);
        }

        if (imageUrls != null) {
            product.getImages().clear();
            for (int i = 0; i < imageUrls.size(); i++) {
                ProductImage img = ProductImage.builder()
                        .product(product)
                        .imageUrl(imageUrls.get(i))
                        .sortOrder(i)
                        .build();
                product.getImages().add(img);
            }
        }

        product = productRepository.save(product);
        return toDto(product);
    }

    @Transactional
    public void delete(Long id) {
        if (!productRepository.existsById(id)) {
            throw new NoSuchElementException("Product not found");
        }
        productRepository.deleteById(id);
    }

    private ProductDto toDto(Product product) {
        List<String> imageUrls = product.getImages().stream()
                .sorted((a, b) -> Integer.compare(a.getSortOrder(), b.getSortOrder()))
                .map(ProductImage::getImageUrl)
                .toList();

        return new ProductDto(
                product.getId(),
                product.getSku(),
                product.getName(),
                product.getDescription(),
                product.getBrand() != null ? product.getBrand().getName() : null,
                product.getCategory() != null ? product.getCategory().getName() : null,
                product.getPrice(),
                product.getOriginalPrice(),
                product.getStockQuantity(),
                product.getActive(),
                product.getMainImageUrl(),
                imageUrls
        );
    }
}

