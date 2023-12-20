import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
import { Details, Loader } from '../../../components';
import { EditorContext } from '../../../interfaces/components';
import Api from '../../../api';
import { getApiCarLink, getApiManufacturerLink } from '../../../utils/links';
import { PageEnum } from '../../../constants/PageEnum';
import { projections } from '../../../api/projections';
import { findIntersection } from '../../../utils/helpers';

const ManufacturerDetails: React.FC = () => {
  const routeParams = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [manufacturer, setManufacturer] = React.useState<IManufacturer>();
  const [availableCars, setAvailableCars] = React.useState<ICar[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const { isFetched: isCarsFetched } = useQuery(
    ['cars'],
    () => Api.Car.getFreeCars(
      {
        projection: projections.car.summary,
        manufacturerId: parseInt(routeParams.id as string, 10),
      },
    ),
    {
      onSuccess: ({ data }) => {
        setAvailableCars(get(data, '_embedded.cars', []));
      },
    },
  );

  const { isFetched: isManufacturerFetched } = useQuery(
    [routeParams.id, 'manufacturer'],
    () => Api.Manufacturer.getById(parseInt(routeParams.id as string, 10), {
      projection: projections.manufacturer.enriched,
    }),
    {
      onSuccess: ({ data }) => {
        setManufacturer(data);
      },
    },
  );

  React.useEffect(() => {
    setIsLoading(!(isManufacturerFetched && isCarsFetched));
  }, [manufacturer, availableCars, isManufacturerFetched, isCarsFetched]);

  const handleUpdateCar = (carId: number, newCar: ICar): Promise<AxiosResponse<ICar>> => {
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

  const handleUpdate = (newManufacturer: IManufacturer): void => {
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

          handleUpdateCar(availableCar.id, updatedCar);
        });

      Api.Manufacturer.updateManufacturer(
        manufacturer.id,
        {
          ...newManufacturer,
          cars: newManufacturer.cars
            ?.map((car) => getApiCarLink(car.id)) ?? [],
        },
      )
        .then(({ data }) => {
          setManufacturer({ ...data });
        });
    }
  };

  const handleDelete = (id: number): void => {
    if (typeof manufacturer !== 'undefined') {
      Api.Manufacturer.deleteManufacturer(id).then(() => {
        navigate(PageEnum.Manufacturers);
      });
    }
  };

  const context: EditorContext<IManufacturer>[] = [
    {
      key: 'name',
      header: 'Name',
      renderComponent: (
        editMode: boolean,
        manufacturerCopy: IManufacturer,
        handleEdit: (key: keyof IManufacturer) => void,
        handleChange: (newManufacturer: Partial<IManufacturer>) => void,
      ): React.ReactNode => (
        <TextField
          className="edit-component"
          InputProps={{
            readOnly: !editMode,
          }}
          value={manufacturerCopy.name}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleChange({ name: e.target.value });
          }}
          onClick={() => handleEdit('name')}
        />
      ),
    },
    {
      key: 'country',
      header: 'Origin Country',
      renderComponent: (
        editMode: boolean,
        manufacturerCopy: IManufacturer,
        handleEdit: (key: keyof IManufacturer) => void,
        handleChange: (newManufacturer: Partial<IManufacturer>) => void,
      ): React.ReactNode => (
        <TextField
          className="edit-component"
          InputProps={{
            readOnly: !editMode,
          }}
          multiline
          value={manufacturerCopy.country}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleChange({ country: e.target.value });
          }}
          onClick={() => handleEdit('country')}
        />
      ),
    },
    {
      key: 'foundationDate',
      header: 'Foundation Date',
      renderComponent: (
        editMode: boolean,
        manufacturerCopy: IManufacturer,
        handleEdit: (key: keyof IManufacturer) => void,
        handleChange: (newManufacturer: Partial<IManufacturer>) => void,
      ): React.ReactNode => (
        <Box className="edit-component" onClick={() => handleEdit('foundationDate')}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              readOnly={!editMode}
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
        editMode: boolean,
        manufacturerCopy: IManufacturer,
        handleEdit: (key: keyof IManufacturer) => void,
        handleChange: (newManufacturer: Partial<IManufacturer>) => void,
      ): React.ReactNode => (
        <TextField
          className="edit-component"
          InputProps={{
            readOnly: !editMode,
          }}
          type="number"
          value={manufacturerCopy.employeesNumber}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleChange({ employeesNumber: parseInt(e?.target.value ?? '0', 10) });
          }}
          onClick={() => handleEdit('employeesNumber')}
        />
      ),
    },
    {
      key: 'cars',
      header: 'Owned Cars',
      notEditable: true,
      renderComponent: (
        editMode: boolean,
        manufacturerCopy: IManufacturer,
        handleEdit: (key: keyof IManufacturer) => void,
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
              onClick={() => handleEdit('cars')}
            />
          )}
        />
      ),
    },
  ];

  return (
    <>
      {typeof manufacturer === 'undefined'
        ? <Loader standalone bigger /> : (
          <Details<IManufacturer>
            header="Manufacturer details"
            object={manufacturer}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            context={context}
            isLoading={isLoading}
          />
        )}
    </>
  );
};

export default React.memo(ManufacturerDetails);
