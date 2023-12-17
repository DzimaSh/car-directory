package by.bsu.cardirectory.projection;

import by.bsu.cardirectory.entity.Car;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

@Projection(name = "enrichedCar", types = {Car.class})
public interface EnrichedCarProjection {

    @Value("#{target}")
    @JsonUnwrapped
    Car getCar();

    @Value("#{target.manufacturer}")
    ManufacturerSummaryProjection getManufacturer();
}
