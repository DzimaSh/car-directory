import React from 'react';
import { ICar } from '../../interfaces/entity';
import Table, { HeaderContext } from '../../components/Table';

interface ICarTable {
  carsData: ICar[];
}

const CarTable: React.FC<ICarTable> = ({ carsData }) => {
  const head: HeaderContext<ICar>[] = [
    {
      key: 'model',
      sortable: true,
      header: 'Model',
    },
    {
      key: 'description',
      sortable: false,
      header: 'Description',
    },
    {
      key: 'releaseDate',
      sortable: true,
      header: 'Release Date',
    },
    {
      key: 'fuelEfficiency',
      sortable: true,
      header: 'Fuel Efficiency',
    },
  ];

  const renderValue = (car: ICar, key: keyof ICar): React.ReactNode => {
    const value: number | string | null = car[key];
    switch (key) {
      case 'model':
      case 'fuelEfficiency':
        return value;
      case 'description':
        return value === null ? 'empty' : value;
      case 'releaseDate':
        return value === null ? 'empty' : new Date(value).toLocaleDateString();
      default:
        return '';
    }
  };

  return (
    <Table<ICar>
      data={carsData}
      renderValue={renderValue}
      head={head}
    />
  );
};

export default React.memo(CarTable);
