import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  Home,
  UserPlus,
  MapPin,
  CalendarDays,
  IndianRupee,
  Users,
  Phone,
  PlusCircle,
} from 'lucide-react';
import { useTranslation } from '../i18n';
import JobSeekerLoginModal from '../components/JobSeekerLoginModal';

const EmployerDashboard = () => {
  const { t, language, setLanguage } = useTranslation();
  const isEnglish = language === 'en';
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showJobSeekerLogin, setShowJobSeekerLogin] = useState(false);

  const [newJob, setNewJob] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    wage: '',
    workersNeeded: '',
    phone: '',
    smsContent: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!newJob.title || newJob.title.trim() === '') {
      errors.title = t.requiredField || 'Required';
    }

    if (!newJob.date) {
      errors.date = t.requiredField || 'Required';
    }

    if (!newJob.time) {
      errors.time = t.requiredField || 'Required';
    }

    if (!newJob.location || newJob.location.trim() === '') {
      errors.location = t.requiredField || 'Required';
    }

    if (!newJob.wage || isNaN(Number(newJob.wage)) || Number(newJob.wage) <= 0) {
      errors.wage = t.invalidWage || 'Invalid wage';
    }

    if (
      !newJob.workersNeeded ||
      isNaN(Number(newJob.workersNeeded)) ||
      Number(newJob.workersNeeded) <= 0
    ) {
      errors.workersNeeded = t.invalidWorkersNeeded || 'Invalid workers count';
    }

    if (!newJob.phone || !/^\d{10}$/.test(newJob.phone.trim())) {
      errors.phone = t.invalidPhone || 'Enter a valid 10-digit phone number';
    }

    if (!newJob.smsContent || newJob.smsContent.trim().split(/\s+/).length > 5) {
      errors.smsContent = t.smsContentError || 'Enter up to 5 words';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePostJob = () => {
    if (!validateForm()) return;
    setJobs([...jobs, { ...newJob, hired: 0 }]);
    setNewJob({
      title: '',
      date: '',
      time: '',
      location: '',
      wage: '',
      workersNeeded: '',
      phone: '',
      smsContent: '',
    });
    setFormErrors({});
    setShowForm(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-sm bg-white">
      {/* Header */}
      <header className="border-b flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-orange-500">Kaam</span>
          <span className="text-blue-600">Khojo</span>
        </Link>
        <div className="flex items-center gap-6 text-sm font-semibold">
          <button onClick={() => setShowJobSeekerLogin(true)} className="hover:underline text-black">
            {t.jobSeekerLogin}
          </button>
          <div className="border-l pl-4 flex items-center gap-1">
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

      {/* Main */}
      <main className="flex-grow px-6 py-6 max-w-5xl mx-auto w-full">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold text-blue-600 flex items-center gap-2">
            <Briefcase size={20} /> {t.employerDashboard}
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-1"
            >
              <PlusCircle size={16} /> {t.postNewJob}
            </button>
            <Link
              to="/"
              className="border border-blue-600 px-4 py-2 rounded flex items-center gap-1 hover:bg-blue-50"
            >
              <Home size={16} /> {t.home}
            </Link>
          </div>
        </div>

        <input
          type="text"
          placeholder={t.searchPlaceholder}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded"
        />

        <h2 className="text-lg font-bold mb-3">{t.yourPostedJobs}</h2>

        {jobs.length === 0 ? (
          <p className="text-gray-500">{t.noJobsYet}</p>
        ) : (
          jobs.map((job, index) => {
            const jobDateTime = new Date(`${job.date}T${job.time}`);
            const now = new Date();
            const isExpired = now > jobDateTime;

            return (
              <div
                key={index}
                className="border border-blue-600 rounded-lg p-4 mb-6 flex flex-col sm:flex-row justify-between"
              >
                <div className="flex flex-col gap-2 text-sm text-gray-800">
                  <p className="text-blue-600 font-semibold text-base">{job.title}</p>
                  <p className="flex items-center gap-2">
                    <CalendarDays size={16} className="text-orange-500" />
                    {job.date} @ {job.time}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-orange-500" />
                    {job.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <IndianRupee size={16} className="text-orange-500" />
                    {job.wage}
                  </p>
                  <p className="flex items-center gap-2">
                    <Users size={16} className="text-orange-500" />
                    {job.workersNeeded} {t.workersNeeded}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone size={16} className="text-orange-500" />
                    {job.phone}
                  </p>
                </div>
                <div className="flex flex-col justify-between items-end gap-2">
                  <span className={`${isExpired ? 'bg-gray-400' : 'bg-green-500'} text-white text-xs px-2 py-1 rounded-full`}>
                    {isExpired ? t.jobStatusExpired : t.jobStatusActive}
                  </span>
                  <div>
                    <p className="font-semibold">
                      {t.hiredWorkers} ({job.hired}/{job.workersNeeded})
                    </p>
                    <p className="text-sm text-gray-500">{t.noWorkersHired}</p>
                  </div>
                  <button className="bg-orange-500 text-white px-3 py-2 rounded hover:bg-orange-600 flex items-center gap-1">
                    <UserPlus size={16} /> {t.hireWorkers}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#f0f6ff] text-center text-sm text-black px-4 py-6">
        <p className="font-semibold">The identity of hard work, a new opportunity every day</p>
        <p className="text-blue-600">मेहनत की पहचान, हर दिन एक नया अवसर।</p>
      </footer>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-blue-600">{t.postNewJob}</h2>
            <div className="space-y-3">
              {['title', 'date', 'time', 'location', 'wage', 'workersNeeded', 'phone', 'smsContent'].map((field) => (
                <div key={field}>
                  <input
                    type={field === 'date' ? 'date' : field === 'time' ? 'time' : field === 'workersNeeded' ? 'number' : 'text'}
                    placeholder={
                      field === 'smsContent'
                        ? t.smsContentPlaceholder || '5 words to be sent to job seekers'
                        : t[`${field}Placeholder`] || field
                    }
                    value={newJob[field]}
                    onChange={(e) => setNewJob({ ...newJob, [field]: e.target.value })}
                    className={`w-full px-3 py-2 border rounded ${
                      formErrors[field] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {formErrors[field] && <p className="text-red-500 text-xs mt-1">{formErrors[field]}</p>}
                </div>
              ))}
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button
                onClick={handlePostJob}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                {t.postJob}
              </button>
              <button
                onClick={() => {
                  setShowForm(false);
                  setFormErrors({});
                }}
                className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
              >
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Job Seeker Login Modal */}
      {showJobSeekerLogin && <JobSeekerLoginModal onClose={() => setShowJobSeekerLogin(false)} />}
    </div>
  );
};

export default EmployerDashboard;
