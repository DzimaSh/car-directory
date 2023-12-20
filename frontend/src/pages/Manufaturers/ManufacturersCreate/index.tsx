import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Autocomplete,
  Box,
  TextField,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useQuery } from 'react-query';
import { get } from 'lodash';
import { AxiosResponse } from 'axios';
import { ICar } from '../../../interfaces/car';
import { IManufacturer } from '../../../interfaces/manufacturer';
import { CreationContext } from '../../../interfaces/components';
import Api from '../../../api';
import { getApiCarLink, getApiManufacturerLink } from '../../../utils/links';
import { ActionEnum, PageEnum } from '../../../constants/PageEnum';
import { projections } from '../../../api/projections';
import { findIntersection } from '../../../utils/helpers';
import Create from '../../../components/Create';

const initialCar: IManufacturer = {
  id: -1,
  name: '',
  country: '',
  employeesNumber: 0,
  foundationDate: '',
  cars: [],
};

const ManufacturerCreate: React.FC = () => {
  const navigate = useNavigate();

  const [manufacturer] = React.useState<IManufacturer>(initialCar);
  const [availableCars, setAvailableCars] = React.useState<ICar[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const saveDisabled = (
    manufacturerToCheck: IManufacturer,
  ): boolean => manufacturerToCheck.name.length === 0
    || manufacturerToCheck.employeesNumber <= 0;

  const { isFetched: isCarsFetched } = useQuery(
    ['cars'],
    () => Api.Car.getFreeCars(
      {
        projection: projections.car.summary,
        manufacturerId: null,
      },
    ),
    {
      onSuccess: ({ data }) => {
        setAvailableCars(get(data, '_embedded.cars', []));
      },
    },
  );

  React.useEffect(() => {
    setIsLoading(!(isCarsFetched));
  }, [manufacturer, availableCars, isCarsFetched]);

  const handleSaveCar = (carId: number, newCar: ICar): Promise<AxiosResponse<ICar>> => {
    const manufacturer = newCar.manufacturer?.id
      ? getApiManufacturerLink(newCar.manufacturer?.id)
      : null;
    return Api.Car.updateCar(
      carId,
      {
        ...newCar,
        manufacturer,
      },
    );
  };

  const handleSave = (newManufacturer: IManufacturer): void => {
    if (typeof manufacturer !== 'undefined') {
      availableCars
        .forEach((availableCar) => {
          const isManufactured = (newManufacturer.cars ?? [])
            .map((car) => car.id)
            .includes(availableCar.id);

          const updatedCar: ICar = {
            ...availableCar,
            manufacturer: isManufactured ? newManufacturer : null,
          };

          handleSaveCar(availableCar.id, updatedCar);
        });

      Api.Manufacturer.createManufacturer(
        {
          ...newManufacturer,
          cars: newManufacturer.cars
            ?.map((car) => getApiCarLink(car.id)) ?? [],
        },
      )
        .then(({ data }) => {
          navigate(`${PageEnum.Manufacturers}/${ActionEnum.Edit}/${data.id}`, { replace: true });
        });
    }
  };

  const context: CreationContext<IManufacturer>[] = [
    {
      key: 'name',
      header: 'Name',
      renderComponent: (
        manufacturerCopy: IManufacturer,
        handleChange: (newManufacturer: Partial<IManufacturer>) => void,
      ): React.ReactNode => (
        <TextField
          className="edit-component"
          value={manufacturerCopy.name}
          error={manufacturerCopy.name.length < 1}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleChange({ name: e.target.value });
          }}
        />
      ),
    },
    {
      key: 'country',
      header: 'Origin Country',
      renderComponent: (
        manufacturerCopy: IManufacturer,
        handleChange: (newManufacturer: Partial<IManufacturer>) => void,
      ): React.ReactNode => (
        <TextField
          className="edit-component"
          multiline
          value={manufacturerCopy.country}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleChange({ country: e.target.value });
          }}
        />
      ),
    },
    {
      key: 'foundationDate',
      header: 'Foundation Date',
      renderComponent: (
        manufacturerCopy: IManufacturer,
        handleChange: (newManufacturer: Partial<IManufacturer>) => void,
      ): React.ReactNode => (
        <Box className="edit-component">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={dayjs(manufacturerCopy.foundationDate)}
              onChange={(e: Dayjs | null): void => {
                if (e !== null) {
                  handleChange({ foundationDate: e.toDate().toISOString() });
                }
              }}
            />
          </LocalizationProvider>
        </Box>
      ),
    },
    {
      key: 'employeesNumber',
      header: 'Employees Amount',
      renderComponent: (
        manufacturerCopy: IManufacturer,
        handleChange: (newManufacturer: Partial<IManufacturer>) => void,
      ): React.ReactNode => (
        <TextField
          className="edit-component"
          type="number"
          value={manufacturerCopy.employeesNumber}
          error={manufacturerCopy.employeesNumber < 1}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleChange({ employeesNumber: parseInt(e?.target.value ?? '0', 10) });
          }}
        />
      ),
    },
    {
      key: 'cars',
      header: 'Owned Cars',
      renderComponent: (
        manufacturerCopy: IManufacturer,
        handleChange: (newManufacturer: Partial<IManufacturer>) => void,
      ): React.ReactNode => (
        <Autocomplete
          className="edit-component"
          multiple
          id={`${availableCars.length}-available-cars`}
          options={availableCars}
          getOptionLabel={(option: ICar) => option.model}
          onChange={(_, value): void => {
            handleChange({ cars: value });
          }}
          loading={isLoading}
          defaultValue={findIntersection<ICar>(availableCars, manufacturer?.cars ?? [])}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="standard"
              label="Factored cars"
              placeholder="Cars"
              id={`${availableCars.length}-available-cars-text`}
            />
          )}
        />
      ),
    },
  ];

  return (
    <Create<IManufacturer>
      header="Manufacturer details"
      object={manufacturer}
      onSave={handleSave}
      context={context}
      isLoading={isLoading}
      disabled={saveDisabled}
    />
  );
};

export default React.memo(ManufacturerCreate);
