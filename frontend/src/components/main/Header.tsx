import React from 'react';
import {
  AppBar, Box, IconButton, Toolbar, Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { PRIMARY_RED } from '../../constants/colors';
import { MainLogo } from '../../icons';
import '../../styles/App.css';

interface IHeader {
  onSideBarOpen: () => void;
}

const Header: React.FC<IHeader> = ({ onSideBarOpen }) => (
  <AppBar position="static" sx={{ bgcolor: PRIMARY_RED }}>
    <Toolbar sx={{ justifyContent: 'space-between' }}>
      <Box display="flex">
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={onSideBarOpen}
          edge="start"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" alignSelf="center">
          Car Directory
        </Typography>
      </Box>
      <MainLogo className="main-logo-header" />
      <Typography variant="subtitle1" component="div">
        Find your dream car
      </Typography>
    </Toolbar>
  </AppBar>
);

export default React.memo(Header);
