import { AxiosResponse } from 'axios';
import request from '../utils/request';
import { IManufacturer } from '../interfaces/manufacturer';
import { projections } from './index';

interface IManufacturerRequest {
  projection?: string;
}

const Manufacturer = {
  getAllManufacturers: ({
    projection = projections.manufacturer.enriched,
  }: IManufacturerRequest): Promise<AxiosResponse<IManufacturer[]>> => request.get('manufacturers', {
    params: { projection },
  }),
  // getCarById: (id: number): Promise<AxiosResponse<ICar>> => request.get(`cars/${id}`),
  // createCar: (car: ICarPayload): Promise<AxiosResponse<ICar>> => request.post('cars', car),
  // updateCar: (id: number, car: ICarPayload): Promise<AxiosResponse<ICar>> =>
  // request.put(`/cars/${id}`, car),
  // deleteCar: (id: number): Promise<AxiosResponse<void>> => request.delete(`/cars/${id}`),
};

export default Manufacturer;
