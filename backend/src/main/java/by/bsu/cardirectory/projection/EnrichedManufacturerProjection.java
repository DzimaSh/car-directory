package by.bsu.cardirectory.projection;

import by.bsu.cardirectory.entity.Manufacturer;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name = "enrichedManufacturer", types = {Manufacturer.class})
public interface EnrichedManufacturerProjection {

    @Value("#{target}")
    @JsonUnwrapped
    Manufacturer getManufacturer();

    @Value("#{target.cars}")
    List<EnrichedCarProjection> getCars();
}
