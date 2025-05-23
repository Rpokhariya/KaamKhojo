import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    titleLine1: "Connecting Workers",
    titleLine2: "with Jobs Instantly",
    hire: "I Want to Hire",
    job: "I Want a Job",
    employerLogin: "Employer Login",
    jobSeekerLogin: "Job Seeker Login",
    footer1: "The identity of hard work, a new opportunity every day",
    footer2: "मेहनत की पहचान, हर दिन एक नया अवसर।",

    // OTP and Login
    phoneLabel: "Phone Number",
    phonePlaceholder: "Enter your phone number",
    sendOtp: "Send OTP",
    otpLabel: "Enter OTP",
    otpPlaceholder: "6-digit OTP",
    invalidPhone: "Please enter a valid phone number",
    invalidOtp: "Please enter a valid 6-digit OTP",

    // Employer Registration
    registrationTitle: "Employer Registration",
    registrationDesc: "Fill out your details to get started.",
    companyName: "Company Name",
    contactPerson: "Contact Person",
    location: "Location",
    idType: "ID Type",
    idNumber: "ID Number",
    optional: "optional",
    companyPlaceholder: "Company or shop name",
    contactPlaceholder: "Full name of contact person",
    locationPlaceholder: "Enter your area or address",
    idNumberPlaceholder: "Enter ID number",
    selectIdType: "Select ID Type",
    aadharCard: "Aadhar Card",
    panCard: "PAN Card",
    voterId: "Voter ID",
    drivingLicense: "Driving License",
    goBack: "Go Back",
    completeRegistration: "Complete Registration & Continue",
    alreadyRegistered: "Already Registered?",
    loginDashboard: "Login to Dashboard",

    // Job Seeker Registration
    jobSeekerRegistration: "Job Seeker Registration",
    jobSeekerDesc: "Please provide your details to find the best job opportunities for you",
    fullNameLabel: "Full Name",
    fullNamePlaceholder: "Your full name",
    locationPref: "Location Preferences",
    locationPrefPlaceholder: "Type location and press Enter",
    add: "Add",
    skills: "Your Skills",
    skillsPlaceholder: "Type skill and press Enter",
    selectExperienceLevel: "Select your experience level",
    experienceLevel: "Experience Level",
    beginner: "Beginner",
    intermediate: "Intermediate",
    expert: "Expert",

    otpVerificationTitle: "OTP Verification",
    enterOtpSent: "Enter the 6-digit OTP sent to your phone",
    verifyOtp: "Verify OTP",
    didntReceiveOtp: "Didn't receive the OTP?",
    resend: "Resend",

    requiredContact: 'Contact Person is required',
    // invalidPhone: 'Enter a valid 10-digit phone number',
    requiredLocation: 'Location is required',
    requiredIdType: 'Please select an ID type',
    requiredIdNumber: 'Enter a valid ID number',

    // Employer Dashboard
    employerDashboard: "Employer Dashboard",
    postNewJob: "Post New Job",
    home: "Home",
    searchPlaceholder: "Search jobs by description or location...",
    yourPostedJobs: "Your Posted Jobs",
    noJobsYet: "You haven't posted any jobs yet.",
    active: "Active",
    hireWorkers: "Hire Workers",
    hiredWorkers: "Hired Workers",
    workersNeeded: "workers needed",
    perDay: "/day",
    negotiable: "(Negotiable)",

    jobTitlePlaceholder: "Job Title",
    wagePlaceholder: "Wage (e.g. ₹600/day)",
    workersNeededPlaceholder: "Workers Needed",
    phonePlaceholder: "Phone Number",
    jobStatusActive: "Active",
    // hiredWorkers: "Hired Workers",
    noWorkersHired: "No workers hired yet.",
    postJob: "Post Job",
    cancel: "Cancel",
    requiredField: 'This field is required',
    invalidPhone: 'Enter a valid 10-digit phone number',
    invalidWage: 'Enter a valid wage amount',
    invalidWorkersNeeded: 'Enter a valid number of workers',
    jobStatusExpired: "Expired",

    jobTimePlaceholder: "Select time",
    smsContentPlaceholder: "Enter 5 words SMS content",
    invalidTime: "Time is required",
    invalidSmsContent: "Enter at least 5 words",

    //Job Seeker Dashboard
    dashboardWelcome: 'Welcome to KaamKhojo!',
    jobSeekerDashboardMessage: 'Thanks for registering. You will receive messages if any work is there in your selected location preference',
  },

  hi: {
    titleLine1: "कामगारों से जुड़ाव",
    titleLine2: "तुरंत नौकरी के साथ",
    hire: "मैं नौकरी देना चाहता हूँ",
    job: "मैं नौकरी चाहता हूँ",
    employerLogin: "नियोक्ता लॉगिन",
    jobSeekerLogin: "नौकरी चाहने वाले का लॉगिन",
    footer1: "मेहनत की पहचान, हर दिन एक नया अवसर।",
    footer2: "The identity of hard work, a new opportunity every day",

    // OTP and Login
    phoneLabel: "फ़ोन नंबर",
    phonePlaceholder: "अपना फ़ोन नंबर दर्ज करें",
    sendOtp: "ओटीपी भेजें",
    otpLabel: "ओटीपी दर्ज करें",
    otpPlaceholder: "6 अंकों का ओटीपी",
    invalidPhone: "कृपया एक मान्य फोन नंबर दर्ज करें",
    invalidOtp: "कृपया 6 अंकों का वैध ओटीपी दर्ज करें",

    // Employer Registration
    registrationTitle: "नियोक्ता पंजीकरण",
    registrationDesc: "शुरू करने के लिए अपना विवरण भरें।",
    companyName: "कंपनी का नाम",
    contactPerson: "संपर्क व्यक्ति",
    location: "स्थान",
    idType: "पहचान पत्र प्रकार",
    idNumber: "पहचान पत्र संख्या",
    optional: "वैकल्पिक",
    companyPlaceholder: "कंपनी या दुकान का नाम",
    contactPlaceholder: "संपर्क व्यक्ति का पूरा नाम",
    locationPlaceholder: "अपना क्षेत्र या पता दर्ज करें",
    idNumberPlaceholder: "पहचान संख्या दर्ज करें",
    selectIdType: "पहचान पत्र चुनें",
    aadharCard: "आधार कार्ड",
    panCard: "पैन कार्ड",
    voterId: "वोटर आईडी",
    drivingLicense: "ड्राइविंग लाइसेंस",
    goBack: "वापस जाएं",
    completeRegistration: "पंजीकरण पूरा करें और जारी रखें",
    alreadyRegistered: "पहले से पंजीकृत हैं?",
    loginDashboard: "डैशबोर्ड में लॉगिन करें",




    // Job Seeker Registration
    jobSeekerRegistration: "नौकरी चाहने वाले का पंजीकरण",
    jobSeekerDesc: "कृपया अपने विवरण दें ताकि हम आपके लिए सर्वोत्तम नौकरी के अवसर खोज सकें",
    fullNameLabel: "पूरा नाम",
    fullNamePlaceholder: "आपका पूरा नाम",
    locationPref: "स्थान वरीयताएँ",
    locationPrefPlaceholder: "स्थान टाइप करें और एंटर दबाएँ",
    add: "जोड़ें",
    skills: "आपके कौशल",
    skillsPlaceholder: "कौशल टाइप करें और एंटर दबाएँ",
    selectExperienceLevel: "अपना अनुभव स्तर चुनें",
    experienceLevel: "अनुभव स्तर",
    beginner: "शुरुआती",
    intermediate: "मध्यम",
    expert: "विशेषज्ञ",

    //otp verification for registration
    otpVerificationTitle: "ओटीपी सत्यापन",
    enterOtpSent: "अपने फ़ोन पर भेजा गया 6-अंकों का ओटीपी दर्ज करें",
    verifyOtp: "ओटीपी सत्यापित करें",
    didntReceiveOtp: "ओटीपी नहीं मिला?",
    resend: "फिर से भेजें",

    requiredContact: 'संपर्क व्यक्ति आवश्यक है',
    // invalidPhone: '10 अंकों का सही फोन नंबर दर्ज करें',
    requiredLocation: 'स्थान आवश्यक है',
    requiredIdType: 'कृपया पहचान प्रकार चुनें',
    requiredIdNumber: 'सही पहचान संख्या दर्ज करें',

    // Employer Dashboard
    employerDashboard: "नियोक्ता डैशबोर्ड",
    postNewJob: "नई नौकरी पोस्ट करें",
    home: "होम",
    searchPlaceholder: "नौकरी विवरण या स्थान द्वारा खोजें...",
    yourPostedJobs: "आपकी पोस्ट की गई नौकरियाँ",
    noJobsYet: "आपने अभी तक कोई नौकरी पोस्ट नहीं की है।",
    active: "सक्रिय",
    hireWorkers: "मजदूरों को भर्ती करें",
    hiredWorkers: "नियुक्त मजदूर",
    workersNeeded: "मजदूरों की आवश्यकता",
    perDay: "/दिन",
    negotiable: "(बातचीत योग्य)",

    jobTitlePlaceholder: "काम का शीर्षक",
    wagePlaceholder: "मजदूरी (जैसे ₹600/दिन)",
    workersNeededPlaceholder: "आवश्यक श्रमिकों की संख्या",
    phonePlaceholder: "फोन नंबर",
    jobStatusActive: "सक्रिय",
    // hiredWorkers: "नियुक्त श्रमिक",
    noWorkersHired: "अभी तक कोई श्रमिक नियुक्त नहीं हुआ है।",
    postJob: "नौकरी पोस्ट करें",
    cancel: "रद्द करें",
    requiredField: 'यह फ़ील्ड आवश्यक है',
    invalidPhone: 'मान्य 10-अंकों का फ़ोन नंबर दर्ज करें',
    invalidWage: 'कृपया सही मजदूरी राशि दर्ज करें',
    invalidWorkersNeeded: 'मान्य श्रमिकों की संख्या दर्ज करें',
    jobStatusExpired: "समाप्त",

    jobTimePlaceholder: "समय चुनें",
    smsContentPlaceholder: "5 शब्दों वाला एसएमएस सामग्री दर्ज करें",
    invalidTime: "समय आवश्यक है",
    invalidSmsContent: "कम से कम 5 शब्द दर्ज करें",

    //Job Seeker Dashboard
    dashboardWelcome: 'काम खोजो में आपका स्वागत है!',
    jobSeekerDashboardMessage: 'पंजीकरण के लिए धन्यवाद। यदि आपके चुने गए स्थान पर कोई काम होगा, तो आपको संदेश प्राप्त होंगे।',


  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => useContext(LanguageContext);
