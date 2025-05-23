import React, { useState } from 'react';
import { useTranslation } from "../i18n.jsx";
import { useNavigate } from 'react-router-dom';

const EmployerLoginModal = ({ onClose }) => {
  const { t, language, setLanguage } = useTranslation();
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = () => {
    const isValid = /^[6-9]\d{9}$/.test(phone); // Basic Indian number validation
    if (!isValid) {
      setError(t.invalidPhone);
      return;
    }

    setError('');
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (otp.trim().length !== 6) {
      setError(t.invalidOtp);
      return;
    }

    // If OTP is valid, redirect to employer dashboard
    navigate('/employer-dashboard');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-600 text-xl">&times;</button>

        {/* Language Toggle */}
        <div className="absolute top-2 right-10 text-sm">
          <button
            className={language === 'en' ? 'text-blue-600' : 'hover:text-blue-600 text-black'}
            onClick={() => setLanguage('en')}
          >
            English
          </button>
          {' '}/{' '}
          <button
            className={language === 'hi' ? 'text-blue-600' : 'hover:text-blue-600 text-black'}
            onClick={() => setLanguage('hi')}
          >
            हिन्दी
          </button>
        </div>

        {/* Heading */}
        <h2 className="text-lg font-medium text-blue-600 mb-6 mt-6">
          {t.employerLogin || 'Employer Login'}
        </h2>

        {/* Phone Input */}
        <label className="block text-sm font-medium mb-1">
          {t.phoneLabel}
        </label>
        <input
          type="tel"
          placeholder={t.phonePlaceholder}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
        />

        {/* OTP Input */}
        {otpSent && (
          <>
            <label className="block text-sm font-medium mt-4 mb-1">
              {t.otpLabel || 'Enter OTP'}
            </label>
            <input
              type="text"
              placeholder={t.otpPlaceholder}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </>
        )}

        {/* Error Message */}
        {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}

        {/* Button */}
        <div className="mt-6 flex justify-start">
          {!otpSent ? (
            <button
              onClick={handleSendOtp}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {t.sendOtp || 'Send OTP'}
            </button>
          ) : (
            <button
              onClick={handleVerifyOtp}
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
            >
              {t.verifyOtp || 'Verify OTP'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployerLoginModal;
