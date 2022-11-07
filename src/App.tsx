import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProtectedRoute from 'routes/ProtectedRoute';
import Header from 'components/Header';
import { CertificationPage } from 'pages/CertificationPage';
import { HelpPage } from 'pages/HelpPage';
import { HomePage } from 'pages/HomePage';
import { LoginPage } from 'pages/LoginPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { SocialInfoPage } from 'pages/SocialInfoPage';
import {ToastContainer} from 'react-toastify';
import './App.css';

function App() {
  // implement logic for this later
  const isAuthed = true;

  return (
    <div className="App">
      <Header />
      <Router>
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
      <div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
