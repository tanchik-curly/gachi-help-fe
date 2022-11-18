import React, { useEffect } from 'react';
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NoAuthTokenRestriction from 'routes/restriction/NoAuthTokenRestriction';
import { Routes as Paths } from 'routes/routesConfig';
import { useAppDispatch } from 'store/hooks';
import { setUser } from 'store/slices/userSlice';
import { Box } from '@mui/material';
import { Drawer } from 'components/Drawer';
import Header from 'components/Header';
import { CertificationPage } from 'pages/CertificationPage';
import { HelpPage } from 'pages/HelpPage';
import { HomePage } from 'pages/HomePage';
import { LoginPage } from 'pages/LoginPage';
import { SocialInfoPage } from 'pages/SocialInfoPage';
import { UserInfoPage } from 'pages/UserInfoPage';
import { UsersPage } from 'pages/UsersPage';
import { getAccessToken } from 'utils/authTokens';
import { getUserDataFromToken } from 'utils/getUserDataFromToken';
import './App.css';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUser(getUserDataFromToken(getAccessToken() || '')));
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={Paths.Login} element={<LoginPage />} />
          <Route
            element={
              <NoAuthTokenRestriction>
                <Header />
                <Box display="flex" flexDirection="row">
                  <Drawer />
                  <Outlet />
                </Box>
              </NoAuthTokenRestriction>
            }
          >
            <Route path={Paths.Home} element={<HomePage />} />
            <Route path={Paths.Users} element={<UsersPage />} />
            <Route path={Paths.User} element={<UserInfoPage />} />
            <Route path={Paths.RequestPage} element={<HelpPage />} />
            <Route
              path={Paths.SocialInformationPage}
              element={<SocialInfoPage />}
            />
            <Route
              path={Paths.CertificationPage}
              element={<CertificationPage />}
            />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
