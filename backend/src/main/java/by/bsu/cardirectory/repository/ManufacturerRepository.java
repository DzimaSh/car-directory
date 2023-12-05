package by.bsu.cardirectory.repository;

import by.bsu.cardirectory.entity.Manufacturer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "manufacturers")
public interface ManufacturerRepository extends JpaRepository<Manufacturer, Long> {
}
