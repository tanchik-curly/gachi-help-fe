import React from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';

const Header = () => {
  const isAuth = true;

  // todo: implement logging out
  const logoutHandler = () => {
    console.log('logged out');
  };

  return isAuth ? (
    <AppBar>
      <Toolbar>
        <Typography>Gachi help</Typography>
        {isAuth && (
          <IconButton onClick={logoutHandler}>
            <ExitToAppIcon />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  ) : null;
};

export default Header;
