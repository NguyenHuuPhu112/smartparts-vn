package vn.smartparts.domain.product;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "brands")
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 100)
    private String name; // Apple, Samsung, ...

    @Column(length = 255)
    private String logoUrl;

    @OneToMany(mappedBy = "brand")
    @Builder.Default
    private Set<Product> products = new HashSet<>();
}

