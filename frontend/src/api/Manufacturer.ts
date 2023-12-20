import { AxiosResponse } from 'axios';
import request from '../utils/request';
import { IManufacturer, IManufacturerPayload } from '../interfaces/manufacturer';
import { projections } from './projections';

interface IManufacturerRequest {
  projection?: string;
}

const Manufacturer = {
  getAllManufacturers: ({
    projection = projections.manufacturer.enriched,
  }: IManufacturerRequest): Promise<AxiosResponse<IManufacturer[]>> => request.get('manufacturers', {
    params: { projection },
  }),
  getById: (
    id: number,
    params: IManufacturerRequest,
  ): Promise<AxiosResponse<IManufacturer>> => request.get(`manufacturers/${id}`, {
    params,
  }),
  updateManufacturer: (
    id: number,
    manufacturer: IManufacturerPayload,
  ): Promise<AxiosResponse<IManufacturer>> => request.patch(`manufacturers/${id}`, manufacturer, {
    params: { projection: projections.manufacturer.enriched },
  }),
  deleteManufacturer: (id: number): Promise<AxiosResponse<void>> => request.delete(`manufacturers/${id}`),
  createManufacturer: (
    manufacturer: IManufacturerPayload,
  ): Promise<AxiosResponse<IManufacturer>> => request.post('manufacturers', manufacturer),
};

export default Manufacturer;
