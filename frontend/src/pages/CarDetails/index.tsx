import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ICar } from '../../interfaces/entity';
import { Details } from '../../components';
import { EditorContext } from '../../components/Details';

const carMock = {
  id: 1,
  model: 'Prius',
  description: null,
  releaseDate: '1997-12-10T00:00:00.000+00:00',
  fuelEfficiency: 23.5,
};

const CarDetails: React.FC = () => {
  const [car, setCar] = React.useState<ICar>(carMock);

  const handleSave = (): void => {
    setCar({ ...car });
  };

  const context: EditorContext<ICar>[] = [
    {
      key: 'model',
      header: 'Model',
      renderComponent: (editMode: boolean): React.ReactNode => (
        <TextField
          InputProps={{
            readOnly: !editMode,
          }}
          value={car.model}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setCar({ ...car, model: e.target.value });
          }}
        />
      ),
    },
    {
      key: 'description',
      header: 'Description',
      renderComponent: (editMode: boolean): React.ReactNode => (
        <TextField
          InputProps={{
            readOnly: !editMode,
          }}
          multiline
          value={car.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setCar({ ...car, description: e.target.value });
          }}
        />
      ),
    },
    {
      key: 'releaseDate',
      header: 'Release Date',
      renderComponent: (editMode: boolean): React.ReactNode => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            readOnly={!editMode}
            value={dayjs(car.releaseDate)}
            onChange={(e: Dayjs | null): void => {
              if (e !== null) {
                setCar({ ...car, description: e.locale() });
              }
            }}
          />
        </LocalizationProvider>
      ),
    },
    {
      key: 'fuelEfficiency',
      header: 'Fuel Efficiency',
      renderComponent: (editMode: boolean): React.ReactNode => (
        <TextField
          InputProps={{
            readOnly: !editMode,
          }}
          type="number"
          value={car.fuelEfficiency}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setCar({ ...car, fuelEfficiency: parseFloat(e?.target.value ?? '0') });
          }}
        />
      ),
    },
  ];

  return (
    <Details<ICar>
      header="Car"
      object={car}
      onSave={handleSave}
      context={context}
    />
  );
};

export default CarDetails;
