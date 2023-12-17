package by.bsu.cardirectory.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.rest.core.annotation.RestResource;

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
    @Getter(onMethod_ = @RestResource(exported = true))
    private Long id;

    private String model;

    private String description;

    private Date releaseDate;

    private Double fuelEfficiency;

    @ManyToOne(cascade = CascadeType.ALL)
    private Manufacturer manufacturer;
}
