import React from 'react';
import { Box, Typography } from '@mui/material';
import CarTable from './CarTable';
import { ICar } from '../../interfaces/car';

const carsData: ICar[] = [
  {
    id: 1,
    model: 'Prius',
    description: null,
    releaseDate: '1997-12-10T00:00:00.000+00:00',
    fuelEfficiency: 23.5,
  },
  {
    id: 2,
    model: 'Model 3',
    description: null,
    releaseDate: '2017-07-28T00:00:00.000+00:00',
    fuelEfficiency: 24.4,
  },
  {
    id: 3,
    model: 'Golf',
    description: null,
    releaseDate: '1974-03-29T00:00:00.000+00:00',
    fuelEfficiency: 18.9,
  },
  {
    id: 4,
    model: 'Clio',
    description: null,
    releaseDate: '1990-06-01T00:00:00.000+00:00',
    fuelEfficiency: 20.1,
  },
];

const Cars: React.FC = () => (
  <Box sx={{ p: 2 }}>
    <Typography variant="h4" gutterBottom>
      Car Directory
    </Typography>
    <Typography variant="body1" gutterBottom>
      Welcome to the Car Directory!
      Here you can find information about various cars, including their model,
      release date, and fuel efficiency.
    </Typography>
    <CarTable carsData={carsData} />
  </Box>
);

export default React.memo(Cars);
