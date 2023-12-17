export interface IEntity {
  id: number;
}

export interface ICar extends IEntity {
  model: string;
  description: string | null;
  releaseDate: string;
  fuelEfficiency: number;
}

export interface IManufacturer extends IEntity {
  id: number;
  name: string;
  country: string;
  foundationDate: string;
  employeesNumber: number;
  cars: ICar[];
}
