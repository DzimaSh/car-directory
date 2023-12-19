import { AxiosResponse } from 'axios';
import { ICar, ICarPayload } from '../interfaces/car';
import request from '../utils/request';
import { projections } from './projections';

interface ICarRequest {
  projection?: string;
  page?: number;
  size?: number;
}

const defaultPageable = {
  page: 0,
  size: 50000,
};

const defaultRequestParams: ICarRequest = {
  projection: projections.car.enriched,
  ...defaultPageable,
};

const Car = {
  getAllCars: (
    params: ICarRequest = defaultRequestParams,
  ): Promise<AxiosResponse<ICar[]>> => request.get('cars', {
    params,
  }),
  getCarById: (id: number, params?: ICarRequest): Promise<AxiosResponse<ICar>> => request.get(`cars/${id}`, {
    params,
  }),
  getFreeCars: (
    manufacturerId: number,
    params?: ICarRequest,
  ): Promise<AxiosResponse<ICar[]>> => request.get(`cars/search/free/forManufacturer/${manufacturerId}`, {
    params: {
      ...params,
      ...defaultPageable,
    },
  }),
  createCar: (car: ICarPayload): Promise<AxiosResponse<ICar>> => request.post('cars', car, {
    params: {
      projection: projections.car.enriched,
    },
  }),
  updateCar: (id: number, car: ICarPayload): Promise<AxiosResponse<ICar>> => request.patch(`cars/${id}`, car, {
    params: {
      projection: projections.car.enriched,
    },
  }),
  deleteCar: (id: number): Promise<AxiosResponse<void>> => request.delete(`cars/${id}`),
};

export default Car;
