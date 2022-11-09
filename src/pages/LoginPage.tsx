import * as React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { axiosInstance } from 'api';
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { setAccessToken } from 'utils/authTokens';
import './root.css';

export const LoginPage = () => {
  const [userData, setUserData] = useState({ login: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res: { token: string; id: number; expirationTime: number } =
      await axiosInstance.post(
        `${process.env.REACT_APP_API_BASE_URL}/Auth/login`,
        userData,
      );
    setAccessToken(res?.token);
    navigate('/home');
  };

  const handleChangeData = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="login-container">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" component="h4">
            Gachi help
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="login"
              label="Електронна адреса"
              name="login"
              autoComplete="login"
              autoFocus
              onInput={handleChangeData}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              onInput={handleChangeData}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Увійти
            </Button>
            <Grid container>
              <Grid item>
                {
                  'Якщо у вас немає акаунта, будь ласка, зверніться в службу підтримки - help@gachihelp.com'
                }
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  );
};
