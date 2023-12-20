package by.bsu.cardirectory.controller;

import by.bsu.cardirectory.entity.Car;
import by.bsu.cardirectory.projection.CarSummaryProjection;
import by.bsu.cardirectory.repository.CarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.projection.ProjectionFactory;
import org.springframework.data.rest.webmvc.BasePathAwareController;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@BasePathAwareController("/cars")
@RequiredArgsConstructor
public class CarController {

    private final CarRepository carRepository;
    private final ProjectionFactory factory;
    private final PagedResourcesAssembler<CarSummaryProjection> carSummaryProjectionPagedResourcesAssembler;

    @GetMapping("/search/free")
    public ResponseEntity<PagedModel<EntityModel<CarSummaryProjection>>> getFreeForManufacturer(
            @RequestParam(value = "manufacturerId", required = false) Long manufacturerId,
            Pageable pageable
    ) {
        Page<Car> freeCars = carRepository.freeForManufacturer(manufacturerId, pageable);
        Page<CarSummaryProjection> freeCarsSummary = freeCars
                .map(freeCar -> factory.createProjection(CarSummaryProjection.class, freeCar));

        PagedModel<EntityModel<CarSummaryProjection>> freeCarsSummaryModel =
                carSummaryProjectionPagedResourcesAssembler.toModel(freeCarsSummary);

        return ResponseEntity.ok(freeCarsSummaryModel);
    }
}
