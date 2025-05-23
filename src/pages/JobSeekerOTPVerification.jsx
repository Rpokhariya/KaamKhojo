import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../i18n';
import { useNavigate, Link } from 'react-router-dom';

const JobSeekerOTPVerification = () => {
  const { t, language, setLanguage } = useTranslation();
  const isEnglish = language === 'en';
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [toastMessage, setToastMessage] = useState('');
  const inputRefs = useRef([]);

  // Focus first input on mount
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index, value) => {
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < 5) inputRefs.current[index + 1]?.focus();
    } else if (value === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '') {
        if (index > 0) inputRefs.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = '';
        setOtp(newOtp);
      }
    }
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length === 6) {
      navigate('/jobseeker-dashboard');
    } else {
      const msg = isEnglish
        ? 'Please enter all 6 digits of the OTP'
        : 'कृपया ओटीपी के सभी 6 अंक दर्ज करें';
      showToast(msg);
    }
  };

  const handleResend = () => {
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
    const msg = isEnglish ? 'OTP resent' : 'ओटीपी पुनः भेजा गया';
    showToast(msg);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#f0f6ff] px-4 font-sans">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 py-4">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-orange-500">Kaam</span>
          <span className="text-blue-600">Khojo</span>
        </Link>
        <div className="flex items-center gap-1 text-sm font-semibold">
          <button
            className={isEnglish ? 'text-blue-600' : 'hover:text-blue-600 text-black'}
            onClick={() => setLanguage('en')}
          >
            English
          </button>
          /
          <button
            className={!isEnglish ? 'text-blue-600' : 'hover:text-blue-600 text-black'}
            onClick={() => setLanguage('hi')}
          >
            हिन्दी
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
          <h2 className="text-xl font-bold text-blue-600 mb-3">
            {t.otpVerificationTitle || 'OTP Verification'}
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            {t.enterOtpSent || 'Enter the 6-digit OTP sent to your phone'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex justify-between gap-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className="w-12 h-12 text-center border border-gray-300 rounded text-lg focus:outline-blue-500"
                />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100"
              >
                {t.goBack || 'Go Back'}
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                {t.verifyOtp || 'Verify OTP'}
              </button>
            </div>
          </form>

          <p className="text-sm text-gray-600 mt-4 text-center">
            {t.didntReceiveOtp || "Didn't receive the OTP?"}{' '}
            <button
              type="button"
              onClick={handleResend}
              className="text-blue-600 font-medium"
            >
              {t.resend || 'Resend'}
            </button>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-sm text-gray-700">
        <p className="font-semibold">{t.footer1}</p>
        <p className="text-blue-600">{t.footer2}</p>
      </footer>

      {/* Toast Message */}
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-black text-white text-sm px-4 py-2 rounded shadow-lg z-50">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default JobSeekerOTPVerification;
