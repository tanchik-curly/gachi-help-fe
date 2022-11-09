import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from 'routes/ProtectedRoute';
import { useAppSelector } from 'store/hooks';
import { Drawer } from 'components/Drawer';
import Header from 'components/Header';
import { CertificationPage } from 'pages/CertificationPage';
import { HelpPage } from 'pages/HelpPage';
import { HomePage } from 'pages/HomePage';
import { LoginPage } from 'pages/LoginPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { SocialInfoPage } from 'pages/SocialInfoPage';
import './App.css';

function App() {
  // implement logic for this later

  const isAuthed = true;
  const user = useAppSelector(state => state.user);

  return (
    <div className="App">
      <Header user={user} />
      <Router>
        <Drawer />
        <Routes>
          <Route path="/" element={<ProtectedRoute isAuthed={isAuthed} />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route path="/home" element={<HomePage />} />
          <Route path="/request-help" element={<HelpPage />} />
          <Route path="/social-information" element={<SocialInfoPage />} />
          <Route path="/certifications" element={<CertificationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
