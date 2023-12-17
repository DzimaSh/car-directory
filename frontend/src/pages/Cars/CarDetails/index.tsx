import React from 'react';
import {
  Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useQuery } from 'react-query';
import { get } from 'lodash';
import { useNavigate, useParams } from 'react-router-dom';
import { ICar } from '../../../interfaces/car';
import { Details, Loader } from '../../../components';
import Api, { projections } from '../../../api';
import { IManufacturer } from '../../../interfaces/manufacturer';
import { findByName } from '../../../utils/helpers';
import { getApiManufacturerLink } from '../../../utils/links';
import { PageEnum } from '../../../constants/PageEnum';
import { EditorContext } from '../../../interfaces/components';

const CarDetails: React.FC = () => {
  const routeParams = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [car, setCar] = React.useState<ICar>();
  const [manufacturers, setManufacturers] = React.useState<IManufacturer[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const { isFetched: isManufacturersFetched } = useQuery(
    ['manufacturers'],
    () => Api.Manufacturer.getAllManufacturers({ projection: projections.manufacturer.summary }),
    {
      onSuccess: ({ data }) => {
        setManufacturers(get(data, '_embedded.manufacturers', []));
      },
    },
  );

  const { isFetched: isCarFetched } = useQuery(
    [routeParams.id, 'car'],
    () => Api.Car.getCarById(parseInt(routeParams.id as string, 10), {
      projection: projections.car.enriched,
    }),
    {
      onSuccess: ({ data }) => {
        setCar(data);
      },
    },
  );

  React.useEffect(() => {
    setIsLoading(!(isCarFetched && isManufacturersFetched));
  }, [car, isCarFetched, isManufacturersFetched]);

  const handleUpdate = (newCar: ICar): void => {
    if (typeof car !== 'undefined') {
      Api.Car.updateCar(
        car.id,
        {
          ...newCar,
          manufacturer: getApiManufacturerLink(newCar.manufacturer?.id as number),
        },
      )
        .then(({ data }) => {
          setCar({ ...data });
        });
    }
  };

  const handleDelete = (id: number): void => {
    if (typeof car !== 'undefined') {
      Api.Car.deleteCar(id).then(() => {
        navigate(PageEnum.Cars);
      });
    }
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
          className="edit-component"
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
          className="edit-component"
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
        <Box className="edit-component" onClick={() => handleEdit('releaseDate')}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              readOnly={!editMode}
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
        editMode: boolean,
        carCopy: ICar,
        handleEdit: (key: keyof ICar) => void,
        handleChange: (newCar: Partial<ICar>) => void,
      ): React.ReactNode => (
        <TextField
          className="edit-component"
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
    {
      key: 'manufacturer',
      header: 'Manufacturer',
      renderComponent: (
        editMode: boolean,
        carCopy: ICar,
        handleEdit: (key: keyof ICar) => void,
        handleChange: (newCar: Partial<ICar>) => void,
      ): React.ReactNode => (
        <FormControl className="edit-component">
          <InputLabel id="demo-simple-select-label">Manufacturer</InputLabel>
          <Select
            readOnly={!editMode}
            onChange={(e: SelectChangeEvent): void => {
              handleChange({
                manufacturer: findByName<IManufacturer>(manufacturers, e?.target.value),
              });
            }}
            label="Manufacturer"
            error={typeof carCopy.manufacturer === 'undefined'}
            value={carCopy.manufacturer?.name}
            onClick={() => handleEdit('manufacturer')}
          >
            {manufacturers.map((manufacturer) => (
              <MenuItem key={manufacturer.id} value={manufacturer.name}>
                {manufacturer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ),
    },
  ];

  return (
    <>
      {typeof car === 'undefined'
        ? <Loader bigger /> : (
          <Details<ICar>
            header="Car"
            object={car}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            context={context}
            isLoading={isLoading}
          />
        )}
    </>
  );
};

export default React.memo(CarDetails);
