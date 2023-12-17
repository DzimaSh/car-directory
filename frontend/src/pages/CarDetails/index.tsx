import React from 'react';
import { Box, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ICar } from '../../interfaces/entity';
import { Details } from '../../components';
import { EditorContext } from '../../components/Details';

const carMock = {
  id: -1,
  model: '',
  description: null,
  releaseDate: '',
  fuelEfficiency: 0,
};

const CarDetails: React.FC = () => {
  const [car, setCar] = React.useState<ICar>(carMock);

  const handleSave = (newCar: ICar): void => {
    setCar({ ...newCar });
  };

  const context: EditorContext<ICar>[] = [
    {
      key: 'model',
      header: 'Model',
      renderComponent: (
        editMode: boolean,
        carCopy: ICar,
        handleEdit: (key: keyof ICar) => void,
        handleChange: (newCar: Partial<ICar>) => void,
      ): React.ReactNode => (
        <TextField
          InputProps={{
            readOnly: !editMode,
          }}
          value={carCopy.model}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleChange({ model: e.target.value });
          }}
          onClick={() => handleEdit('model')}
        />
      ),
    },
    {
      key: 'description',
      header: 'Description',
      renderComponent: (
        editMode: boolean,
        carCopy: ICar,
        handleEdit: (key: keyof ICar) => void,
        handleChange: (newCar: Partial<ICar>) => void,
      ): React.ReactNode => (
        <TextField
          InputProps={{
            readOnly: !editMode,
          }}
          multiline
          value={carCopy.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleChange({ description: e.target.value });
          }}
          onClick={() => handleEdit('description')}
        />
      ),
    },
    {
      key: 'releaseDate',
      header: 'Release Date',
      renderComponent: (
        editMode: boolean,
        carCopy: ICar,
        handleEdit: (key: keyof ICar) => void,
        handleChange: (newCar: Partial<ICar>) => void,
      ): React.ReactNode => (
        <Box onClick={() => handleEdit('releaseDate')}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              readOnly={!editMode}
              value={dayjs(carCopy.releaseDate)}
              onChange={(e: Dayjs | null): void => {
                if (e !== null) {
                  handleChange({ releaseDate: e.locale() });
                }
              }}
            />
          </LocalizationProvider>
        </Box>
      ),
    },
    {
      key: 'fuelEfficiency',
      header: 'Fuel Efficiency',
      renderComponent: (
        editMode: boolean,
        carCopy: ICar,
        handleEdit: (key: keyof ICar) => void,
        handleChange: (newCar: Partial<ICar>) => void,
      ): React.ReactNode => (
        <TextField
          InputProps={{
            readOnly: !editMode,
          }}
          type="number"
          value={carCopy.fuelEfficiency}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleChange({ fuelEfficiency: parseFloat(e?.target.value ?? '0') });
          }}
          onClick={() => handleEdit('fuelEfficiency')}
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
