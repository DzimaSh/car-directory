import { API_V1_BASE_URL } from '../constants/settings';

export function getApiCarLink(carId: number): string {
  return `${API_V1_BASE_URL}cars/${carId}`;
}

export function getApiManufacturerLink(manufacturerId: number): string {
  return `${API_V1_BASE_URL}manufacturers/${manufacturerId}`;
}
