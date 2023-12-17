package by.bsu.cardirectory.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import net.minidev.json.annotate.JsonIgnore;

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

    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "manufacturer_id")
    @ToString.Exclude
    private Manufacturer manufacturer;
}
