import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Roles, User } from 'interfaces';
import { useAppSelector } from 'store/hooks';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { removeAccessToken } from 'utils/authTokens';

const Header: React.FC = () => {
  const user: User = useAppSelector(state => state.user);
  const navigate = useNavigate();

  const formatUser = (user: User) => {
    return `Logged in as ${user.name} ${user.surname} as ${user.role}`;
  };

  // todo: implement logging out
  const logoutHandler = () => {
    removeAccessToken();
    navigate('/login');
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
