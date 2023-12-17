package by.bsu.cardirectory.repository;

import by.bsu.cardirectory.entity.Manufacturer;
import by.bsu.cardirectory.projection.EnrichedManufacturerProjection;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "manufacturers", excerptProjection = EnrichedManufacturerProjection.class)
public interface ManufacturerRepository extends CrudRepository<Manufacturer, Long> {
}
