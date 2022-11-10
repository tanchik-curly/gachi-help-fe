import React from 'react';
import {
  Outlet,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import NoAuthTokenRestriction from 'routes/restriction/NoAuthTokenRestriction';
import { Routes as Paths } from 'routes/routesConfig';
import { Drawer } from 'components/Drawer';
import Header from 'components/Header';
import { CertificationPage } from 'pages/CertificationPage';
import { HelpPage } from 'pages/HelpPage';
import { HomePage } from 'pages/HomePage';
import { LoginPage } from 'pages/LoginPage';
import { SocialInfoPage } from 'pages/SocialInfoPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path={Paths.Login} element={<LoginPage />} />
          <Route
            element={
              <NoAuthTokenRestriction>
                <Header />
                <Drawer />
                <Outlet />
              </NoAuthTokenRestriction>
            }
          >
            <Route path={Paths.Home} element={<HomePage />} />
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
