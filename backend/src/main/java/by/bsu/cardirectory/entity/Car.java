package by.bsu.cardirectory.entity;

import jakarta.persistence.*;
import lombok.Data;

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
    private Long id;

    private String model;

    private Date releaseDate;

    private Double fuelEfficiency;

    @ManyToOne(cascade = CascadeType.ALL)
    private Manufacturer manufacturer;
}
