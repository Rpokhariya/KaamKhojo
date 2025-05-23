import React, { useState } from 'react';
import { useTranslation } from '../i18n';
import { Link } from 'react-router-dom';
import EmployerLoginModal from '../components/EmployerLoginModal';

const JobSeekerDashboard = () => {
  const { t, language, setLanguage } = useTranslation();
  const isEnglish = language === 'en';
  const [showEmployerLogin, setShowEmployerLogin] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 py-4 bg-white border-b">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-orange-500">Kaam</span>
          <span className="text-blue-600">Khojo</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-semibold">
          <button
            onClick={() => setShowEmployerLogin(true)}
            className="hover:text-blue-600"
          >
            {t.employerLogin || 'Employer Login'}
          </button>
          <div className="flex items-center gap-1">
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
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center justify-center flex-1 px-4 py-10">
        <div className="bg-white shadow-md border rounded-xl p-8 max-w-xl w-full text-center">
          <h2 className="text-2xl font-bold text-blue-600 mb-4">
            {t.dashboardWelcome || 'Welcome to KaamKhojo!'}
          </h2>
          <p className="text-orange-600 text-base">
            {t.jobSeekerDashboardMessage ||
              'Thanks for registering. You will receive messages if any work is there in your selected location preferences.'}
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#f0f6ff] text-center py-4 text-sm text-gray-700">
        <p className="font-semibold">{t.footer1 || 'The identity of hard work, a new opportunity every day'}</p>
        <p className="text-blue-600">{t.footer2 || 'मेहनत की पहचान, हर दिन एक नया अवसर।'}</p>
      </footer>

      {/* Employer Login Modal */}
      {showEmployerLogin && (
        <EmployerLoginModal onClose={() => setShowEmployerLogin(false)} />
      )}
    </div>
  );
};

export default JobSeekerDashboard;
