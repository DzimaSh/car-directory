package by.bsu.cardirectory.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.rest.core.annotation.RestResource;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Data
public class Car {

    @Id
    @SequenceGenerator(
            allocationSize = 1,
            name = "car_id_seq",
            sequenceName = "car_id_seq"
    )
    @GeneratedValue(
            strategy = GenerationType.SEQUENCE,
            generator = "car_id_seq"
    )
    @RestResource
    private Long id;

    private String model;

    private String description;

    private Date releaseDate;

    private Double fuelEfficiency;

    @ManyToOne(cascade = CascadeType.ALL)
    private Manufacturer manufacturer;
}
