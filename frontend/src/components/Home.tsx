import React from 'react';
import { Grid, Typography } from '@mui/material';

const Home: React.FC = () => (
  <Grid container>
    <Typography>My First component</Typography>
  </Grid>
);

export default React.memo(Home);
