import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './i18n';

import HomePage from './pages/HomePage';
import EmployerRegistration from './pages/EmployerRegistration';
import JobSeekerRegistration from './pages/JobSeekerRegistration';
import OTPVerification from './pages/EmployerOTPVerification';
import JobSeekerOTPVerification from './pages/JobSeekerOTPVerification';
import EmployerDashboard from './pages/EmployerDashboard';
import JobSeekerDashboard from './pages/JobSeekerDashboard';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/employer-register" element={<EmployerRegistration />} />
          <Route path="/job-seeker-registration" element={<JobSeekerRegistration />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/jobseeker-otp-verification" element={<JobSeekerOTPVerification />} />
          <Route path="/employer-dashboard" element={<EmployerDashboard />} />
          <Route path="/jobseeker-dashboard" element={<JobSeekerDashboard />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}





