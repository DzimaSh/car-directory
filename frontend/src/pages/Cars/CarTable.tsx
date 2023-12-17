import React from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../components/Table';
import { ICar, ICarValues } from '../../interfaces/car';
import { IManufacturer } from '../../interfaces/manufacturer';
import { ActionEnum } from '../../constants/PageEnum';
import { HeaderContext } from '../../interfaces/components';

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
    switch (key) {
      case 'releaseDate':
        return prepareValue(new Date(value as string).toLocaleDateString());
      case 'manufacturer':
        return prepareValue(value ? (value as IManufacturer).name : null);
      default:
        return prepareValue(value as string | number);
    }
  };

  const handleRowClick = (carId: number): void => {
    navigate(`${ActionEnum.Edit}/${carId}`);
  };

  const handleCreateNewCarClick = (): void => {
    navigate(`${ActionEnum.Create}`);
  };

  return (
    <Table<ICar>
      data={carsData}
      renderValue={renderValue}
      head={head}
      onRowClick={handleRowClick}
      onCreateNewItem={handleCreateNewCarClick}
    />
  );
};

export default React.memo(CarTable);
