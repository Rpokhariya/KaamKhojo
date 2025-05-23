import React, { useState } from 'react';
import { useTranslation } from '../i18n';
import { useNavigate, Link } from 'react-router-dom';
import OTPModal from '../components/EmployerLoginModal';
import JobSeekerLoginModal from '../components/JobSeekerLoginModal';

const EmployerRegistration = () => {
  const { t, language, setLanguage } = useTranslation();
  const isEnglish = language === 'en';
  const navigate = useNavigate();

  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showJobSeekerModal, setShowJobSeekerModal] = useState(false);

  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    phone: '',
    location: '',
    idType: '',
    idNumber: '',
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: '' })); // Clear error on input
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'contactPerson':
        if (!value.trim()) return t.requiredContact || 'Contact person is required';
        break;
      case 'phone':
        if (!/^\d{10}$/.test(value)) return t.invalidPhone || 'Enter a valid 10-digit phone number';
        break;
      case 'location':
        if (!value.trim()) return t.requiredLocation || 'Location is required';
        break;
      case 'idType':
        if (!value) return t.requiredIdType || 'Select an ID type';
        break;
      case 'idNumber':
        if (!value.trim() || value.length < 6) return t.requiredIdNumber || 'Enter a valid ID number';
        break;
      default:
        return '';
    }
    return '';
  };

  const validateAllFields = () => {
    const errors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'companyName') return; // Optional
      const error = validateField(key, value);
      if (error) errors[key] = error;
    });
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateAllFields();
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      navigate('/otp-verification');
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
          <button onClick={() => setShowJobSeekerModal(true)} className="hover:text-blue-600 text-black">
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
        </nav>
      </header>

      <div className="bg-white shadow-md rounded-lg p-6 max-w-3xl w-full">
        <h2 className="text-xl font-bold text-blue-600 mb-3">{t.registrationTitle}</h2>
        <p className="text-sm text-gray-600 mb-6">{t.registrationDesc}</p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                {t.companyName} <span className="text-gray-400">({t.optional})</span>
              </label>
              <input
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
                placeholder={t.companyPlaceholder}
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                {t.contactPerson} <span className="text-red-500">*</span>
              </label>
              <input
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
                placeholder={t.contactPlaceholder}
              />
              {formErrors.contactPerson && <p className="text-red-500 text-xs mt-1">{formErrors.contactPerson}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t.phoneLabel} <span className="text-red-500">*</span>
            </label>
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              placeholder={t.phonePlaceholder}
            />
            {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              {t.location} <span className="text-red-500">*</span>
            </label>
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded px-4 py-2"
              placeholder={t.locationPlaceholder}
            />
            {formErrors.location && <p className="text-red-500 text-xs mt-1">{formErrors.location}</p>}
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                {t.idType} <span className="text-red-500">*</span>
              </label>
              <select
                name="idType"
                value={formData.idType}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
              >
                <option value="">{t.selectIdType}</option>
                <option value="aadhar">{t.aadharCard}</option>
                <option value="pan">{t.panCard}</option>
                <option value="voter">{t.voterId}</option>
                <option value="dl">{t.drivingLicense}</option>
              </select>
              {formErrors.idType && <p className="text-red-500 text-xs mt-1">{formErrors.idType}</p>}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">
                {t.idNumber} <span className="text-red-500">*</span>
              </label>
              <input
                name="idNumber"
                value={formData.idNumber}
                onChange={handleChange}
                className="w-full border rounded px-4 py-2"
                placeholder={t.idNumberPlaceholder}
              />
              {formErrors.idNumber && <p className="text-red-500 text-xs mt-1">{formErrors.idNumber}</p>}
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-100"
            >
              {t.goBack}
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              {t.completeRegistration}
            </button>
          </div>
        </form>

        <div className="text-center text-sm mt-6">
          <p>{t.alreadyRegistered}</p>
          <button onClick={() => setShowOTPModal(true)} className="text-blue-600 font-medium">
            {t.loginDashboard}
          </button>
        </div>
      </div>

      <footer className="text-center mt-10 text-sm text-gray-700">
        <p className="font-semibold">{t.footer1}</p>
        <p className="text-blue-600">{t.footer2}</p>
      </footer>

      {showOTPModal && <OTPModal onClose={() => setShowOTPModal(false)} />}
      {showJobSeekerModal && <JobSeekerLoginModal onClose={() => setShowJobSeekerModal(false)} />}
    </div>
  );
};

export default EmployerRegistration;
