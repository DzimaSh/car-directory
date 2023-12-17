import React from 'react';
import { IEntity } from './entity';

export type HeaderContext<T extends IEntity> = {
  key: keyof T,
  header: string,
  sortable: boolean
  customSort?: (a: T, b: T) => number;
};

export interface ITable<T extends IEntity> {
  data: T[];
  head: HeaderContext<T>[];
  renderValue: (obj: T, key: keyof T) => React.ReactNode;
  onRowClick: (id: number) => void;
  onCreateNewItem: () => void;
}

export interface ISortingConfig<T extends IEntity> {
  key: keyof T;
  direction: 'asc' | 'desc';
}

export type EditorContext<T extends IEntity> =
  {
    key: keyof T,
    header: string,
    renderComponent: (
      editMode: boolean,
      objCopy: T,
      handleEdit: (key: keyof T) => void,
      handleChange: (newObject: Partial<T>) => void,
    ) => React.ReactNode
    notEditable?: boolean,
  };

export type CreationContext<T extends IEntity> =
  {
    key: keyof T,
    header: string,
    renderComponent: (
      objCopy: T,
      handleChange: (newObject: Partial<T>) => void,
    ) => React.ReactNode
  };

export interface IAction<T extends IEntity> {
  header: string;
  object: T;
  isLoading: boolean;
}

export interface IDetails<T extends IEntity> extends IAction<T> {
  onUpdate: (obj: T) => void;
  onDelete: (objId: number) => void;
  context: EditorContext<T>[];
}

export interface ICreate<T extends IEntity> extends IAction<T> {
  onSave: (obj: T) => void;
  context: CreationContext<T>[];
}
