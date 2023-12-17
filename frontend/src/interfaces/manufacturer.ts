import { INamedEntity } from './entity';
import { ICar } from './car';

export interface IManufacturer extends INamedEntity {
  name: string;
  country: string;
  foundationDate: string;
  employeesNumber: number;
  cars?: ICar[];
}

export type IManufacturerValues = IManufacturer[keyof IManufacturer];

export interface IManufacturerPayload {
  name: string;
  country: string;
  foundationDate: string;
  employeesNumber: number;
  cars: string[];
}
