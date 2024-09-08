import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SidebarLayout from './components/SidebarLayout';
import CryptoDashboard from './components/CryptoDashboard';
import InvestCryptoPage from './components/InvestCryptoPage';
import LoginPage from './components/LoginPage';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (authStatus: boolean) => {
    setIsAuthenticated(authStatus);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={
            isAuthenticated ? 
            <Navigate to="/dashboard" replace /> : 
            <LoginPage onLogin={handleLogin} />
          } 
        />
        <Route
          path="/*"
          element={
            isAuthenticated ? (
              <SidebarLayout onLogout={handleLogout}>
                <Routes>
                  <Route path="/dashboard" element={<CryptoDashboard />} />
                  <Route path="/investir" element={<InvestCryptoPage />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </SidebarLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}