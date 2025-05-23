import React, { useState } from 'react';
import { useTranslation } from '../i18n';
import { useNavigate, Link } from 'react-router-dom';
import EmployerLoginModal from '../components/EmployerLoginModal';
import JobSeekerLoginModal from '../components/JobSeekerLoginModal';

const JobSeekerRegistration = () => {
  const { t, language, setLanguage } = useTranslation();
  const isEnglish = language === 'en';
  const navigate = useNavigate();

  const [showEmployerModal, setShowEmployerModal] = useState(false);
  const [showJobSeekerModal, setShowJobSeekerModal] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    location: '',
    idType: '',
    idNumber: '',
    experience: '',
  });

  const [preferredLocationInput, setPreferredLocationInput] = useState('');
  const [preferredLocations, setPreferredLocations] = useState([]);

  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState([]);

  const [errors, setErrors] = useState({});

  const handleAddLocation = () => {
    if (preferredLocationInput.trim()) {
      setPreferredLocations([...preferredLocations, preferredLocationInput.trim()]);
      setPreferredLocationInput('');
    }
  };

  const handleAddSkill = () => {
    if (skillInput.trim()) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput('');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = t.requiredField;
    if (!formData.phone.trim()) {
      newErrors.phone = t.requiredField;
    } else if (!/^\d{10}$/.test(formData.phone.trim())) {
      newErrors.phone = t.invalidPhone;
    }
    if (!formData.location.trim()) newErrors.location = t.requiredField;
    if (preferredLocations.length === 0) newErrors.preferredLocations = t.atLeastOneLocation;
    if (skills.length === 0) newErrors.skills = t.atLeastOneSkill;
    if (!formData.idType) newErrors.idType = t.requiredField;
    if (!formData.idNumber.trim()) newErrors.idNumber = t.requiredField;
    if (!formData.experience) newErrors.experience = t.requiredField;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      navigate('/jobseeker-otp-verification');
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f6ff] flex flex-col items-center pt-10 px-4 font-sans text-sm">
      <header className="w-full flex justify-between items-center px-6 mb-6">
        <Link to="/" className="text-2xl font-bold">
          <span className="text-orange-500">Kaam</span>
          <span className="text-blue-600">Khojo</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-semibold">
          <button onClick={() => setShowEmployerModal(true)} className="hover:text-blue-600 text-black">
            {t.employerLogin}
          </button>
          <div className="border-l pl-4 flex items-center gap-1">
            <button
              className={isEnglish ? 'text-orange-600' : 'hover:text-orange-600 text-black'}
              onClick={() => setLanguage('en')}
            >
              English
            </button>
            /
            <button
              className={!isEnglish ? 'text-orange-600' : 'hover:text-orange-600 text-black'}
              onClick={() => setLanguage('hi')}
            >
              हिन्दी
            </button>
          </div>
        </nav>
      </header>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl w-full">
        <h2 className="text-xl font-bold text-orange-500 mb-3">{t.jobSeekerRegistration}</h2>
        <p className="text-sm text-gray-600 mb-6">{t.jobSeekerDesc}</p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                {t.fullNameLabel}
                <span className="text-orange-500"> *</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
                placeholder={t.fullNamePlaceholder}
              />
              {errors.fullName && <p className="text-red-600 text-xs mt-1">{errors.fullName}</p>}
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                {t.phoneLabel}
                <span className="text-orange-500"> *</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
                placeholder={t.phonePlaceholder}
              />
              {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t.location}
              <span className="text-orange-500"> *</span>
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              placeholder={t.locationPlaceholder}
            />
            {errors.location && <p className="text-red-600 text-xs mt-1">{errors.location}</p>}
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                {t.locationPref}
                <span className="text-orange-500"> *</span>
              </label>
              <input
                type="text"
                value={preferredLocationInput}
                onChange={(e) => setPreferredLocationInput(e.target.value)}
                className="w-full border rounded px-4 py-2"
                placeholder={t.locationPrefPlaceholder}
              />
            </div>
            <button
              type="button"
              onClick={handleAddLocation}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {t.add}
            </button>
          </div>
          {errors.preferredLocations && <p className="text-red-600 text-xs mt-1">{errors.preferredLocations}</p>}
          {preferredLocations.length > 0 && (
            <ul className="list-disc pl-5 text-gray-700 text-sm">
              {preferredLocations.map((loc, index) => (
                <li key={index}>{loc}</li>
              ))}
            </ul>
          )}

          <div className="flex items-center gap-2">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                {t.skills}
                <span className="text-orange-500"> *</span>
              </label>
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                className="w-full border rounded px-4 py-2"
                placeholder={t.skillsPlaceholder}
              />
            </div>
            <button
              type="button"
              onClick={handleAddSkill}
              className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {t.add}
            </button>
          </div>
          {errors.skills && <p className="text-red-600 text-xs mt-1">{errors.skills}</p>}
          {skills.length > 0 && (
            <ul className="list-disc pl-5 text-gray-700 text-sm">
              {skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                {t.idType}
                <span className="text-orange-500"> *</span>
              </label>
              <select
                name="idType"
                value={formData.idType}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
              >
                <option value="">{t.selectIdType}</option>
                <option>{t.aadharCard}</option>
                <option>{t.panCard}</option>
                <option>{t.voterId}</option>
                <option>{t.drivingLicense}</option>
              </select>
              {errors.idType && <p className="text-red-600 text-xs mt-1">{errors.idType}</p>}
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                {t.idNumber}
                <span className="text-orange-500"> *</span>
              </label>
              <input
                type="text"
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
                placeholder={t.idNumberPlaceholder}
              />
              {errors.idNumber && <p className="text-red-600 text-xs mt-1">{errors.idNumber}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t.experienceLevel}
              <span className="text-orange-500"> *</span>
            </label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
            >
              <option value="">{t.selectExperienceLevel}</option>
              <option>{t.beginner}</option>
              <option>{t.intermediate}</option>
              <option>{t.expert}</option>
            </select>
            {errors.experience && <p className="text-red-600 text-xs mt-1">{errors.experience}</p>}
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-orange-600 text-orange-600 rounded hover:bg-orange-100"
            >
              {t.goBack}
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              {t.completeRegistration}
            </button>
          </div>
        </form>

        <div className="text-center text-sm mt-6">
          <p>{t.alreadyRegistered}</p>
          <button onClick={() => setShowJobSeekerModal(true)} className="text-orange-600 font-medium">
            {t.loginDashboard}
          </button>
        </div>
      </div>

      <footer className="text-center mt-10 text-sm text-gray-700">
        <p className="font-semibold">{t.footer1}</p>
        <p className="text-blue-600">{t.footer2}</p>
      </footer>

      {showEmployerModal && <EmployerLoginModal onClose={() => setShowEmployerModal(false)} />}
      {showJobSeekerModal && <JobSeekerLoginModal onClose={() => setShowJobSeekerModal(false)} />}
    </div>
  );
};

export default JobSeekerRegistration;
