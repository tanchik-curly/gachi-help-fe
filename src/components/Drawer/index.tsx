import React from 'react';
import { Link, matchPath, useLocation } from 'react-router-dom';
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer as MUIDrawer,
} from '@mui/material';
import { getMenuItems } from 'utils/getMenuItems';

export const Drawer = () => {
  const { pathname } = useLocation();

  const returnedList = (pathTitle: any, pathTo: any, PathIcon: any) => (
    <ListItemButton
      component={Link}
      to={pathTo}
      selected={pathname.includes(pathTo)}
      sx={{
        '&.Mui-selected': {
          color: 'blue',
          background: 'none',
        },
      }}
    >
      <ListItemIcon
        {...(pathname.includes(pathTo) ? { sx: { color: 'blue' } } : {})}
      >
        <PathIcon />
      </ListItemIcon>
      <ListItemText primary={pathTitle} />
    </ListItemButton>
  );

  const menuItems = getMenuItems().map(({ title, path, icon }) =>
    returnedList(title, path, icon),
  );

  return (
    <MUIDrawer variant="permanent" sx={{ zIndex: '1250 !important' }} open>
      <Divider />
      <List sx={{ paddingTop: '80px' }}>{menuItems}</List>
    </MUIDrawer>
  );
};
