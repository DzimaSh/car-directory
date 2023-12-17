import { AxiosResponse } from 'axios';
import { ICar, ICarPayload } from '../interfaces/car';
import request from '../utils/request';
import { projections } from './index';

interface ICarRequest {
  projection?: string;
}

const Car = {
  getAllCars: (): Promise<AxiosResponse<ICar[]>> => request.get('cars'),
  getCarById: (id: number, params?: ICarRequest): Promise<AxiosResponse<ICar>> => request.get(`cars/${id}`, {
    params,
  }),
  createCar: (car: ICarPayload): Promise<AxiosResponse<ICar>> => request.post('cars', car, {
    params: {
      projection: projections.car.enriched,
    },
  }),
  updateCar: (id: number, car: ICarPayload): Promise<AxiosResponse<ICar>> => request.patch(`/cars/${id}`, car, {
    params: {
      projection: projections.car.enriched,
    },
  }),
  deleteCar: (id: number): Promise<AxiosResponse<void>> => request.delete(`/cars/${id}`),
};

export default Car;
