import Car from './Car';
import Manufacturer from './Manufacturer';

export const projections = {
  manufacturer: {
    enriched: 'enrichedManufacturer',
    summary: 'summaryProjection',
  },
  car: {
    enriched: 'enrichedCar',
  },
};

const Api = {
  Car,
  Manufacturer,
};

export default Api;
