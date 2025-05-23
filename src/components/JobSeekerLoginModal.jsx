import React, { useState } from 'react';
import { useTranslation } from '../i18n';
import { useNavigate } from 'react-router-dom';

const JobSeekerLoginModal = ({ onClose }) => {
  const { t, language, setLanguage } = useTranslation();
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = () => {
    const isValid = /^[6-9]\d{9}$/.test(phone); // Indian mobile format
    if (!isValid) {
      setError(t.invalidPhone || 'Please enter a valid phone number');
      return;
    }

    setError('');
    setOtpSent(true);
  };

  const handleVerifyOtp = () => {
    if (otp.trim().length !== 6) {
      setError(t.invalidOtp || 'Please enter a valid 6-digit OTP');
      return;
    }

    // OTP valid, navigate to job seeker dashboard
    navigate('/jobseeker-dashboard');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow p-6 w-full max-w-md relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-2 right-3 text-gray-600 text-xl">&times;</button>

        {/* Language Toggle */}
        <div className="absolute top-2 right-10 text-sm">
          <button
            className={language === 'en' ? 'text-orange-600' : 'hover:text-orange-600 text-black'}
            onClick={() => setLanguage('en')}
          >
            English
          </button>{' '}/{' '}
          <button
            className={language === 'hi' ? 'text-orange-600' : 'hover:text-orange-600 text-black'}
            onClick={() => setLanguage('hi')}
          >
            हिन्दी
          </button>
        </div>

        {/* Heading */}
        <h2 className="text-lg font-medium text-orange-600 mb-6 mt-6">
          {t.jobSeekerLogin || 'Job Seeker Login'}
        </h2>

        {/* Phone Input */}
        <div className="mt-2">
          <label className="block text-sm font-medium mb-1">
            {t.phoneLabel || 'Phone Number'}
          </label>
          <input
            type="tel"
            placeholder={t.phonePlaceholder || 'Enter your phone number'}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-600"
          />
        </div>

        {/* OTP Input */}
        {otpSent && (
          <>
            <label className="block text-sm font-medium mt-4 mb-1">
              {t.otpLabel || 'Enter OTP'}
            </label>
            <input
              type="text"
              placeholder={t.otpPlaceholder || '6-digit OTP'}
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-600"
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
              className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
            >
              {t.sendOtp || 'Send OTP'}
            </button>
          ) : (
            <button
              onClick={handleVerifyOtp}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {t.verifyOtp || 'Verify OTP'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobSeekerLoginModal;
