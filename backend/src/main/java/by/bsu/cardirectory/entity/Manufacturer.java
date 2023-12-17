package by.bsu.cardirectory.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
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
    private Long id;

    @Column(unique = true)
    private String name;

    private String country;

    private LocalDate foundationDate;

    private Integer employeesNumber;

    @OneToMany(mappedBy = "manufacturer", fetch = FetchType.EAGER)
    private List<Car> cars;
}
