import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Briefcase, User } from 'lucide-react';
import { useTranslation } from '../i18n';
import EmployerLoginModal from '../components/EmployerLoginModal';
import JobSeekerLoginModal from '../components/JobSeekerLoginModal';

const HomePage = () => {
  const { language, setLanguage, t } = useTranslation();
  const isEnglish = language === 'en';
  const [showEmployerModal, setShowEmployerModal] = useState(false);
  const [showJobSeekerModal, setShowJobSeekerModal] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className="flex justify-between items-center px-6 py-4 border-b">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-orange-500">Kaam</span>
            <span className="text-blue-600">Khojo</span>
          </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <a href="#" onClick={() => setShowEmployerModal(true)} className="relative px-2 py-1 text-black after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">{t.employerLogin}</a>
          <a href="#" onClick={() => setShowJobSeekerModal(true)} className="relative px-2 py-1 text-black after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-blue-600 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left">{t.jobSeekerLogin}</a>
          <div className="border-l pl-4 flex items-center gap-1">
            <button className={isEnglish ? 'text-blue-600' : 'hover:text-blue-600 text-black'} onClick={() => setLanguage('en')}>English</button>
            {' / '}
            <button className={!isEnglish ? 'text-blue-600' : 'hover:text-blue-600 text-black'} onClick={() => setLanguage('hi')}>हिन्दी</button>
          </div>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-bold leading-snug">
          <span className="text-blue-600">{t.titleLine1}</span><br />
          <span className="text-orange-600">{t.titleLine2}</span>
        </h1>

        <img src="/handshake.png" alt="hero" className="w-64 my-6" />

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => navigate('/employer-register')}
            className="border border-blue-200 rounded-md p-6 w-64 hover:border-blue-400 hover:shadow transition text-blue-600"
          >
            <Briefcase className="mx-auto mb-2" size={32} />
            <div>{t.hire}</div>
          </button>
          <button onClick={() => navigate('/job-seeker-registration')} className="border border-orange-200 rounded-md p-6 w-64 hover:border-orange-400 hover:shadow transition text-orange-600">
            <User className="mx-auto mb-2" size={32} />
            <div>{t.job}</div>
          </button>

        </div>
      </main>

      <footer className="bg-blue-50 text-center text-sm py-4">
        <p className="text-black font-medium">{t.footer1}</p>
        <p className="text-blue-600 font-normal">{t.footer2}</p>
      </footer>

      {showEmployerModal && <EmployerLoginModal onClose={() => setShowEmployerModal(false)} />}
      {showJobSeekerModal && <JobSeekerLoginModal onClose={() => setShowJobSeekerModal(false)} />}
    </div>
  );
};

export default HomePage;
