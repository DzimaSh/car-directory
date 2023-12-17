import { IEntity, INamedEntity } from '../interfaces/entity';

export function findById<T extends IEntity>(array: T[], id: number): T | null {
  return array.find((obj) => obj.id === id) ?? null;
}

export function findByName<T extends INamedEntity >(array: T[], name: string): T | undefined {
  return array.find((obj) => obj.name === name);
}

export const prepareValue = (value: number | string | null): string => (value === null
  ? 'empty'
  : value.toString()
);
