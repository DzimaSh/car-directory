package by.bsu.cardirectory.repository;

import by.bsu.cardirectory.entity.Car;
import by.bsu.cardirectory.projection.CarSummaryProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.annotation.RestResource;

@RepositoryRestResource(path = "cars", excerptProjection = CarSummaryProjection.class)
public interface CarRepository extends JpaRepository<Car, Long> {

    @RestResource(exported = false)
    @Query(
        """
        SELECT c FROM Car c
        WHERE c.manufacturer IS NULL
            OR (?#{ #manufacturerId != null } = true AND c.manufacturer.id = :manufacturerId)
        """
    )
    Page<Car> freeForManufacturer(
            @Param("manufacturerId") Long manufacturerId,
            Pageable pageable
    );
}
