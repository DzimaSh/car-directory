import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { PRIMARY_RED } from '../constants/colors';
import { MainLogo } from '../icons';
import '../styles/App.css';

const Header: React.FC = () => (
  <AppBar position="static" sx={{ bgcolor: PRIMARY_RED }}>
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Typography variant="h6" component="div">
        Car Directory
      </Typography>
      <MainLogo className="main-logo-header" />
      <Typography variant="subtitle1" component="div">
        Find your dream car
      </Typography>
    </Toolbar>
  </AppBar>
);

export default React.memo(Header);
