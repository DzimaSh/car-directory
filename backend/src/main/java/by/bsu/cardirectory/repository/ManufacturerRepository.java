package by.bsu.cardirectory.repository;

import by.bsu.cardirectory.entity.Manufacturer;
import by.bsu.cardirectory.projection.ManufacturerSummaryProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "manufacturers", excerptProjection = ManufacturerSummaryProjection.class)
public interface ManufacturerRepository extends JpaRepository<Manufacturer, Long> {
}
