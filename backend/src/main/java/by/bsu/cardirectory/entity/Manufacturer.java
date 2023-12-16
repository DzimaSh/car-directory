package by.bsu.cardirectory.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.rest.core.annotation.RestResource;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Data
public class Manufacturer {

    @Id
    @SequenceGenerator(
            name = "manufacturer_id_seq",
            sequenceName = "manufacturer_id_seq",
            allocationSize = 1
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "manufacturer_id_seq"
    )
    @Getter(onMethod_ = @RestResource(exported = true))
    private Long id;

    @Column(unique = true)
    private String name;

    private String country;

    private LocalDate foundationDate;

    private Integer employeesNumber;

    @OneToMany(mappedBy = "manufacturer")
    @ToString.Exclude
    private Set<Car> cars;
}