import { IEntity } from './entity';
import { IManufacturer } from './manufacturer';

export interface ICar extends IEntity {
  model: string;
  description: string | null;
  releaseDate: string;
  fuelEfficiency: number;
  manufacturer?: IManufacturer | null;
}

export type ICarValues = ICar[keyof ICar];

export interface ICarPayload {
  model: string;
  description: string | null;
  releaseDate: string;
  fuelEfficiency: number;
  manufacturer?: string | null;
}
