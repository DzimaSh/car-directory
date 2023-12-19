import React from 'react';
import { Box, Typography } from '@mui/material';
import { useQuery } from 'react-query';
import { get } from 'lodash';
import Api from '../../api';
import ManufacturerTable from './ManufaturerTable';
import { projections } from '../../api/projections';

const Manufacturers: React.FC = () => {
  const { data: manufacturersData } = useQuery(
    ['cars'],
    () => Api.Manufacturer.getAllManufacturers(
      { projection: projections.manufacturer.enriched },
    ),
  );

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Manufacturers Directory
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome to the Car Directory!
        Here, you can explore information about different manufacturers,
        including their name, founding year, and specializations.
      </Typography>
      <ManufacturerTable manufacturersData={get(manufacturersData, 'data._embedded.manufacturers', [])} />
    </Box>
  );
};

export default React.memo(Manufacturers);
