package by.bsu.cardirectory.repository;

import by.bsu.cardirectory.entity.Car;
import by.bsu.cardirectory.projection.EnrichedCarProjection;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "cars", excerptProjection = EnrichedCarProjection.class)
public interface CarRepository extends CrudRepository<Car, Long> {
}
