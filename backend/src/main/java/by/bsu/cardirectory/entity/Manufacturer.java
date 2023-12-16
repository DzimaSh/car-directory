package by.bsu.cardirectory.entity;

import jakarta.persistence.*;
import lombok.Data;
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
    @RestResource
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