import React from 'react';
import { User } from 'interfaces';
import { useAppSelector } from 'store/hooks';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';

const Header: React.FC = () => {
  const user: User = useAppSelector(state => state.user);

  const formatUser = (user: User) => {
    return `Logged in as ${user.name} ${user.surname} a ${user.role}`;
  };

  // todo: implement logging out
  const logoutHandler = () => {
    console.log('logged out');
  };

  return (
    <AppBar sx={{ zIndex: '1251 !important' }}>
      <Toolbar>
        <Stack
          flexDirection="row"
          alignItems="center"
          sx={{ width: '100%' }}
          justifyContent="space-between"
        >
          <Typography>Gachi help</Typography>
          <Stack flexDirection="row" alignItems="center">
            <Typography>{formatUser(user)}</Typography>
            <IconButton onClick={logoutHandler}>
              <ExitToAppIcon sx={{ color: '#fff' }} />
            </IconButton>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
