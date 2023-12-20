import React from 'react';
import { Box, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { get } from 'lodash';
import CarTable from './CarTable';
import Api from '../../api';

const Cars: React.FC = () => {
  const { data: carsData } = useQuery(
    ['cars'],
    () => Api.Car.getAllCars(),
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Cars Directory
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome to the Car Directory!
        Here you can find information about various cars, including their model,
        release date, and fuel efficiency.
      </Typography>
      <CarTable carsData={get(carsData, 'data._embedded.cars', [])} />
    </Box>
  );
};

export default React.memo(Cars);
