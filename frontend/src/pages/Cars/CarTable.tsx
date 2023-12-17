import React from 'react';
import { useNavigate } from 'react-router-dom';
import Table, { HeaderContext } from '../../components/Table';
import { ICar, ICarValues } from '../../interfaces/car';

interface ICarTable {
  carsData: ICar[];
}

const CarTable: React.FC<ICarTable> = ({ carsData }) => {
  const navigate = useNavigate();

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
    {
      key: 'manufacturer',
      sortable: false,
      header: 'Manufacturer',
    },
  ];

  const prepareValue = (value: number | string | null): string => (value === null
    ? 'empty'
    : value.toString()
  );

  const renderValue = (car: ICar, key: keyof ICar): React.ReactNode => {
    const value: ICarValues = car[key];
    switch (typeof value) {
      case 'number':
      case 'string':
        return prepareValue(value ?? null);
      case 'object':
        return prepareValue(value?.name ?? null);
      default:
        return prepareValue(null);
    }
  };

  const handleRowClick = (carId: number): void => {
    navigate(`${carId}`);
  };

  return (
    <Table<ICar>
      data={carsData}
      renderValue={renderValue}
      head={head}
      onRowClick={handleRowClick}
    />
  );
};

export default React.memo(CarTable);
