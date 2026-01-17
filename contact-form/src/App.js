import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ContactForm from './components/ContactForm';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import SetupWizard from './components/SetupWizard';
import './App.css';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL || ''}>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<ContactForm />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/setup" element={<SetupWizard />} />
          <Route path="/admin/panel" element={<AdminPanel />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />
          <Route path="/admin/reset" element={<ResetPassword />} />
          
          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
