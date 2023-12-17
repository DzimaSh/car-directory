import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ICar } from '../../interfaces/entity';
import Table, { HeaderContext } from '../../components/Table';

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
  ];

  const prepareValue = (value: number | Date | string | null): string => (value === null ? 'empty' : value.toString());

  const renderValue = (car: ICar, key: keyof ICar): React.ReactNode => {
    const value: number | Date | string | null = car[key];
    switch (key) {
      case 'model':
      case 'fuelEfficiency':
      case 'description':
        return prepareValue(value);
      case 'releaseDate':
        return value === null ? 'empty' : new Date(value).toLocaleDateString();
      default:
        return '';
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
