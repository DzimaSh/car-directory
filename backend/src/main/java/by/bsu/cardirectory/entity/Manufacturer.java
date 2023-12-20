package by.bsu.cardirectory.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;

import java.time.LocalDate;
import java.util.List;

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
    private Long id;

    @Column(unique = true)
    private String name;

    private String country;

    private LocalDate foundationDate;

    private Integer employeesNumber;

    @OneToMany(
            cascade = { CascadeType.REFRESH, CascadeType.MERGE },
            targetEntity = Car.class,
            mappedBy = "manufacturer",
            fetch = FetchType.EAGER
    )
    private List<Car> cars;
}
