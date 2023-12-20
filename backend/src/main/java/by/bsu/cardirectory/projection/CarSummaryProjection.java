package by.bsu.cardirectory.projection;

import by.bsu.cardirectory.entity.Car;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;
import java.util.Date;

@Projection(name = "carSummary", types = {Car.class})
public interface CarSummaryProjection {
    @Value("#{target.id}")
    Long getId();

    @Value("#{target.model}")
    String getModel();

    @Value("#{target.description}")
    String getDescription();

    @Value("#{target.releaseDate}")
    Date getReleaseDate();

    @Value("#{target.fuelEfficiency}")
    Double getFuelEfficiency();
}
