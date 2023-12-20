import React from 'react';
import { useQuery } from 'react-query';
import { get } from 'lodash';
import { useNavigate } from 'react-router-dom';
import {
  Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import Api from '../../../api';
import { IManufacturer } from '../../../interfaces/manufacturer';
import Create from '../../../components/Create';
import { ICar } from '../../../interfaces/car';
import { getApiManufacturerLink } from '../../../utils/links';
import { ActionEnum, PageEnum } from '../../../constants/PageEnum';
import { CreationContext } from '../../../interfaces/components';
import { findByName } from '../../../utils/helpers';
import { projections } from '../../../api/projections';

const initialCar: ICar = {
  id: -1,
  model: '',
  description: null,
  fuelEfficiency: 0.0,
  releaseDate: '',
  manufacturer: null,
};

const CarCreate: React.FC = () => {
  const navigate = useNavigate();

  const [manufacturers, setManufacturers] = React.useState<IManufacturer[]>([]);
  const [car] = React.useState<ICar>(initialCar);

  const saveDisabled = (carToCheck: ICar): boolean => carToCheck.model.length === 0
    || carToCheck.fuelEfficiency <= 0
    || typeof carToCheck.manufacturer === 'undefined';

  const { isFetched: isManufacturersFetched } = useQuery(
    ['manufacturers'],
    () => Api.Manufacturer.getAllManufacturers({ projection: projections.manufacturer.summary }),
    {
      onSuccess: ({ data }) => {
        setManufacturers(get(data, '_embedded.manufacturers', []));
      },
    },
  );

  const handleSave = (newCar: ICar): void => {
    Api.Car.createCar({
      ...newCar,
      manufacturer: typeof newCar.manufacturer?.id !== 'undefined'
        ? getApiManufacturerLink(newCar.manufacturer.id)
        : null,
    }).then(({ data }) => {
      navigate(`${PageEnum.Cars}/${ActionEnum.Edit}/${data.id}`, { replace: true });
    });
  };

  const context: CreationContext<ICar>[] = [
    {
      key: 'model',
      header: 'Model',
      renderComponent: (
        carCopy: ICar,
        handleChange: (newCar: Partial<ICar>) => void,
      ): React.ReactNode => (
        <TextField
          className="edit-component"
          value={carCopy.model}
          error={carCopy.model.length === 0}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleChange({ model: e.target.value });
          }}
        />
      ),
    },
    {
      key: 'description',
      header: 'Description',
      renderComponent: (
        carCopy: ICar,
        handleChange: (newCar: Partial<ICar>) => void,
      ): React.ReactNode => (
        <TextField
          className="edit-component"
          multiline
          value={carCopy.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleChange({ description: e.target.value });
          }}
        />
      ),
    },
    {
      key: 'releaseDate',
      header: 'Release Date',
      renderComponent: (
        carCopy: ICar,
        handleChange: (newCar: Partial<ICar>) => void,
      ): React.ReactNode => (
        <Box className="edit-component">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dayjs(carCopy.releaseDate)}
              onChange={(e: Dayjs | null): void => {
                if (e !== null) {
                  handleChange({ releaseDate: e.toDate().toISOString() });
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
        carCopy: ICar,
        handleChange: (newCar: Partial<ICar>) => void,
      ): React.ReactNode => (
        <TextField
          className="edit-component"
          type="number"
          value={carCopy.fuelEfficiency}
          error={carCopy.fuelEfficiency <= 0}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleChange({ fuelEfficiency: parseFloat(e?.target.value ?? '0') });
          }}
        />
      ),
    },
    {
      key: 'manufacturer',
      header: 'Manufacturer',
      renderComponent: (
        carCopy: ICar,
        handleChange: (newCar: Partial<ICar>) => void,
      ): React.ReactNode => (
        <FormControl className="edit-component">
          <InputLabel id="demo-simple-select-label">Manufacturer</InputLabel>
          <Select
            onChange={(e: SelectChangeEvent): void => {
              handleChange({
                manufacturer: findByName<IManufacturer>(manufacturers, e?.target.value),
              });
            }}
            label="Manufacturer"
            error={typeof carCopy.manufacturer === 'undefined'}
            value={carCopy.manufacturer?.name}
            defaultValue=""
          >
            {manufacturers.map((manufacturer) => (
              <MenuItem key={manufacturer.id} value={manufacturer.name}>
                {manufacturer.name}
              </MenuItem>
            ))}
            <MenuItem key="manufacturer_null" value="">
              <em>None</em>
            </MenuItem>
          </Select>
        </FormControl>
      ),
    },
  ];

  return (
    <Create<ICar>
      header="Create car"
      object={car}
      onSave={handleSave}
      context={context}
      isLoading={!isManufacturersFetched}
      disabled={saveDisabled}
    />
  );
};

export default React.memo(CarCreate);
