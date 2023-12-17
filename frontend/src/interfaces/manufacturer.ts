import { IEntity } from './entity';
import { ICar } from './car';

export interface IManufacturer extends IEntity {
  id: number;
  name: string;
  country: string;
  foundationDate: string;
  employeesNumber: number;
  cars: ICar[];
}
