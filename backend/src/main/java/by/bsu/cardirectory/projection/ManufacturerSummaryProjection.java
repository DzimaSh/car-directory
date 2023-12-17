package by.bsu.cardirectory.projection;

import by.bsu.cardirectory.entity.Manufacturer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.time.LocalDate;

@Projection(name = "manufacturerSummary", types = {Manufacturer.class})
public interface ManufacturerSummaryProjection {

    @Value("#{target.id}")
    Long getId();

    @Value("#{target.name}")
    String getName();

    @Value("#{target.country}")
    String getCountry();

    @Value("#{target.foundationDate}")
    LocalDate getFoundationDate();

    @Value("#{target.employeesNumber}")
    Integer getEmployeesNumber();
}
