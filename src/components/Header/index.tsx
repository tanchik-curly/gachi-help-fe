import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Roles, User } from 'interfaces';
import { useAppSelector } from 'store/hooks';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import {
  AppBar,
  Box,
  IconButton,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { removeAccessToken } from 'utils/authTokens';

const mapper = {
  [Roles.Admin]: 'Адміністратор',
  [Roles.Worker]: 'Фахівець',
  [Roles.User]: 'Користувач',
};

const Header: React.FC = () => {
  const user: User = useAppSelector(state => state.user);
  const navigate = useNavigate();

  const formatUser = (user: User) => {
    return `Увійшов як ${user.name} ${user.surname} - ${mapper[user.role]}`;
  };

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
          <Box display="flex" flexDirection="row" alignItems="center">
            <MenuItem onClick={() => navigate('/main')}>
              <Typography variant="h5" mr={8}>
                Gachi Help
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate('/main')}>
              <Typography fontSize={14}>Комунікаційний хаб</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate('/main')}>
              <Typography fontSize={14}>
                Центр інформації користувача
              </Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate('/main')}>
              <Typography fontSize={14}>Кабінет користувача</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate('/main')}>
              <Typography fontSize={14}>Сервіс обліку за ознаками</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate('/main')}>
              <Typography fontSize={14}>Формування пакету допомоги</Typography>
            </MenuItem>
            <MenuItem onClick={() => navigate('/home')}>
              <Typography fontSize={14}>
                Модуль аналізу та статистики
              </Typography>
            </MenuItem>
          </Box>
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
