import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Chip, Stack } from '@mui/material';
import Table from '../../components/Table';
import { ICar } from '../../interfaces/car';
import { IManufacturer, IManufacturerValues } from '../../interfaces/manufacturer';
import { ActionEnum, PageEnum } from '../../constants/PageEnum';
import { HeaderContext } from '../../interfaces/components';
import { prepareValue } from '../../utils/helpers';

interface IManufacturerTable {
  manufacturersData: IManufacturer[];
}

const ManufacturerTable: React.FC<IManufacturerTable> = ({ manufacturersData }) => {
  const navigate = useNavigate();

  const head: HeaderContext<IManufacturer>[] = [
    {
      key: 'name',
      sortable: true,
      header: 'Name',
    },
    {
      key: 'country',
      sortable: true,
      header: 'Origin Country',
    },
    {
      key: 'foundationDate',
      sortable: true,
      header: 'Foundation Date',
    },
    {
      key: 'employeesNumber',
      sortable: true,
      header: 'Employees Amount',
    },
    {
      key: 'cars',
      sortable: false,
      header: 'Owned Cars',
    },
  ];

  const handleCarClick = (event: React.MouseEvent, carId: number): void => {
    event.stopPropagation();
    navigate(
      `${PageEnum.Cars}/${ActionEnum.Edit}/${carId}`,
    );
  };

  const renderValue = (manufacturer: IManufacturer, key: keyof IManufacturer): React.ReactNode => {
    const value: IManufacturerValues = manufacturer[key];
    switch (key) {
      case 'foundationDate':
        return prepareValue(new Date(value as string).toLocaleDateString());
      case 'cars':
        if (typeof value === 'undefined' || (value as ICar[]).length === 0) {
          return prepareValue(null);
        }
        return (
          <Stack direction="row" spacing={1}>
            {(value as ICar[]).map((car) => (
              <Chip
                label={car.model}
                onClick={(e: React.MouseEvent) => handleCarClick(e, car.id)}
              />
            ))}
          </Stack>
        );
      default:
        return prepareValue(value as string | number);
    }
  };

  const handleRowClick = (manufacturerId: number): void => {
    navigate(`${ActionEnum.Edit}/${manufacturerId}`);
  };

  const handleCreateNewCarClick = (): void => {
    navigate(`${ActionEnum.Create}`);
  };

  return (
    <Table<IManufacturer>
      data={manufacturersData}
      renderValue={renderValue}
      head={head}
      onRowClick={handleRowClick}
      onCreateNewItem={handleCreateNewCarClick}
    />
  );
};

export default React.memo(ManufacturerTable);
