import React from 'react';
import {
  Divider,
  Drawer, Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
  DirectionsCar, Factory, ChevronLeft, Home as HomeIcon,
} from '@mui/icons-material';
import { PageEnum } from '../../constants/PageEnum';
import '../../styles/App.css';

interface ISideBar {
  open: boolean;
  onClose: () => void;
}

const SideBar: React.FC<ISideBar> = ({ open, onClose }) => (
  <Drawer
    variant="persistent"
    anchor="left"
    open={open}
  >
    <Grid className="sidebar-header" container justifyContent="flex-end">
      <IconButton onClick={onClose}>
        <ChevronLeft />
      </IconButton>
    </Grid>

    <Divider />

    <List
      component="nav"
      subheader={(
        <ListSubheader component="div" id="nested-list-subheader">
          Directories
        </ListSubheader>
      )}
    >
      <ListItemButton component={Link} to={PageEnum.Manufacturers} onClick={onClose}>
        <ListItemIcon>
          <Factory />
        </ListItemIcon>
        <ListItemText primary="Manufacturers directory" />
      </ListItemButton>
      <ListItemButton component={Link} to={PageEnum.Cars} onClick={onClose}>
        <ListItemIcon>
          <DirectionsCar />
        </ListItemIcon>
        <ListItemText primary="Cars directory" />
      </ListItemButton>
    </List>

    <Divider />

    <List component="nav">
      <ListItemButton component={Link} to={PageEnum.Home} onClick={onClose}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
    </List>
  </Drawer>
);

export default React.memo(SideBar);
