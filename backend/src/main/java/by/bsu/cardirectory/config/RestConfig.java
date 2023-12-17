package by.bsu.cardirectory.config;

import by.bsu.cardirectory.entity.Car;
import by.bsu.cardirectory.entity.Manufacturer;
import by.bsu.cardirectory.projection.EnrichedCarProjection;
import by.bsu.cardirectory.projection.EnrichedManufacturerProjection;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

@Configuration
public class RestConfig implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        config.exposeIdsFor(Car.class, Manufacturer.class)
                .getProjectionConfiguration()
                .addProjection(EnrichedManufacturerProjection.class)
                .addProjection(EnrichedCarProjection.class);
    }
}