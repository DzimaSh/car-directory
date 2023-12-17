package by.bsu.cardirectory.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

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

    private String description;

    private Date releaseDate;

    private Double fuelEfficiency;

    @ManyToOne(cascade = {
            CascadeType.PERSIST,
            CascadeType.MERGE,
            CascadeType.REFRESH,
    }, fetch = FetchType.EAGER)
    @JoinColumn(name = "manufacturer_id")
    @ToString.Exclude
    private Manufacturer manufacturer;
}
