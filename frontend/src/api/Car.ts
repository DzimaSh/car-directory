import { AxiosResponse } from 'axios';
import { ICar } from '../interfaces/car';
import request from '../utils/request';

const Car = {
  getAllCars: (): Promise<AxiosResponse<ICar[]>> => request.get('cars'),
  getCarById: (id: number): Promise<AxiosResponse<ICar>> => request.get(`cars/${id}`),
  createCar: (car: ICar): Promise<AxiosResponse<ICar>> => request.post('cars', car),
  updateCar: (id: number, car: ICar): Promise<AxiosResponse<ICar>> => request.put(`/cars/${id}`, car),
  deleteCar: (id: number): Promise<AxiosResponse<void>> => request.delete(`/cars/${id}`),
};

export default Car;
