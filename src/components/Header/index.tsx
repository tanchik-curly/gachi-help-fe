import React from 'react';
import { User } from 'interfaces';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';

type Props = {
  user: User;
};

const Header: React.FC<Props> = ({ user }: Props) => {
  const isAuth = true;

  const formatUser = (user: User) => {
    return `Logged in as ${user.firstName} ${user.lastName} a ${user.role}`;
  };

  // todo: implement logging out
  const logoutHandler = () => {
    console.log('logged out');
  };

  return (
    <AppBar>
      <Toolbar>
        <Stack
          flexDirection="row"
          alignItems="center"
          sx={{ width: '100%' }}
          justifyContent="space-between"
        >
          <Typography>Gachi help</Typography>
          {isAuth && (
            <Stack flexDirection="row" alignItems="center">
              <Typography>{formatUser(user)}</Typography>
              <IconButton onClick={logoutHandler}>
                <ExitToAppIcon sx={{ color: '#fff' }} />
              </IconButton>
            </Stack>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
