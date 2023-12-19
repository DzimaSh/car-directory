import { IEntity, INamedEntity } from '../interfaces/entity';

export function findById<T extends IEntity>(array: T[], id: number): T | null {
  return array.find((obj) => obj.id === id) ?? null;
}

export function findByName<T extends INamedEntity >(array: T[], name: string): T | null {
  return array.find((obj) => obj.name === name) ?? null;
}

export const findIntersection = <T extends IEntity>(
  array1: T[],
  array2: T[],
): T[] => array1.filter((value) => array2.map((elem) => elem.id).includes(value.id));

export const prepareValue = (value: number | string | null): string => (value === null
  ? 'empty'
  : value.toString()
);
