import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer as MUIDrawer,
  Paper,
  Typography,
} from '@mui/material';
import { getMenuItems } from 'utils/getMenuItems';

export const Drawer = () => {
  const { pathname } = useLocation();
  const role = useAppSelector(state => state.user.role);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const returnedList = (pathTitle: string, pathTo: string, PathIcon: any) => (
    <ListItemButton
      component={Link}
      key={pathTo}
      to={pathTo}
      selected={pathname.includes(pathTo)}
      sx={{
        color: 'white',
        '&.Mui-selected': {
          color: '#5C6BC0',
          background: 'none',
        },
      }}
    >
      <ListItemIcon
        {...(pathname.includes(pathTo)
          ? { sx: { color: '#5C6BC0' } }
          : { sx: { color: 'white' } })}
      >
        <PathIcon />
      </ListItemIcon>
      <ListItemText>
        <Typography variant="subtitle2">{pathTitle}</Typography>
      </ListItemText>
    </ListItemButton>
  );

  const menuItems = getMenuItems(role).map(({ title, path, icon }) =>
    returnedList(title, path, icon),
  );

  return (
    <Paper
      elevation={5}
      // PaperProps={{
      //   sx: {
      //     backgroundColor: '#242424',
      //     color: 'white',
      //   },
      // }}
      sx={{
        zIndex: '1250 !important',
        width: 400,
        height: '100vh',
        backgroundColor: '#242424',
        color: 'white',
      }}
    >
      <Divider sx={{ borderColor: 'white' }} />
      <List sx={{ padding: '80px 20px 0' }}>{menuItems}</List>
    </Paper>
  );
};
