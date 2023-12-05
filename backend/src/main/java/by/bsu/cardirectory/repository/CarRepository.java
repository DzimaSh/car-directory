package by.bsu.cardirectory.repository;

import by.bsu.cardirectory.entity.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path = "cars")
public interface CarRepository extends JpaRepository<Car, Long> {
}
