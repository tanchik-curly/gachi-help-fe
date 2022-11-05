import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ProtectedRoute from 'routes/ProtectedRoute';
import { CertificationPage } from 'pages/CertificationPage';
import { HelpPage } from 'pages/HelpPage';
import { HomePage } from 'pages/HomePage';
import { LoginPage } from 'pages/LoginPage';
import { NotFoundPage } from 'pages/NotFoundPage';
import { RegisterPage } from 'pages/RegisterPage';
import { SocialInfoPage } from 'pages/SocialInfoPage';
import './App.css';

function App() {
  // implement logic for this later
  const isAuthed = true;

  return (
    <div className="App">
      <Router>
        <Routes>
          <ProtectedRoute
            isAuthed={isAuthed}
            path="/login"
            element={<LoginPage />}
          />
          <ProtectedRoute
            isAuthed={isAuthed}
            path="/register"
            element={<RegisterPage />}
          />
          <Route path="/home" element={<HomePage />} />
          <Route path="/request-help" element={<HelpPage />} />
          <Route path="/social-information" element={<SocialInfoPage />} />
          <Route path="/certifications" element={<CertificationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
