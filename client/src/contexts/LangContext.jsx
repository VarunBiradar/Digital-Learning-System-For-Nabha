import { createContext, useContext, useState, useEffect } from 'react';

const translations = {
  en: {
    appName: 'Learning Platform',
    tagline: 'Digital Education for Every Student',
    home: 'Home', lessons: 'Lessons', dashboard: 'Dashboard',
    progress: 'My Progress', settings: 'Settings', logout: 'Logout',
    login: 'Login', register: 'Register', getStarted: 'Get Started',
    learnMore: 'Learn More', startLesson: 'Start Lesson',
    continueLesson: 'Continue', completed: 'Completed',
    search: 'Search lessons...', filter: 'Filter',
    grade: 'Grade', subject: 'Subject', difficulty: 'Difficulty',
    beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced',
    minutes: 'min', students: 'Students', teachers: 'Teachers', lessons_: 'Lessons',
    quiz: 'Quiz', submitQuiz: 'Submit Quiz', nextLesson: 'Next Lesson',
    score: 'Score', xp: 'XP Points', badges: 'Badges',
    welcome: 'Welcome back', totalProgress: 'Total Progress',
    announcements: 'Announcements',
  },
  pa: {
    appName: 'ਲਰਨਿੰਗ ਪਲੇਟਫਾਰਮ',
    tagline: 'ਹਰ ਵਿਦਿਆਰਥੀ ਲਈ ਡਿਜੀਟਲ ਸਿੱਖਿਆ',
    home: 'ਮੁੱਖ ਪੰਨਾ', lessons: 'ਪਾਠ', dashboard: 'ਡੈਸ਼ਬੋਰਡ',
    progress: 'ਮੇਰੀ ਤਰੱਕੀ', settings: 'ਸੈਟਿੰਗਾਂ', logout: 'ਬਾਹਰ ਜਾਓ',
    login: 'ਲੌਗਇਨ', register: 'ਰਜਿਸਟਰ', getStarted: 'ਸ਼ੁਰੂ ਕਰੋ',
    learnMore: 'ਹੋਰ ਸਿੱਖੋ', startLesson: 'ਪਾਠ ਸ਼ੁਰੂ ਕਰੋ',
    continueLesson: 'ਜਾਰੀ ਰੱਖੋ', completed: 'ਪੂਰਾ ਹੋਇਆ',
    search: 'ਪਾਠ ਖੋਜੋ...', filter: 'ਫਿਲਟਰ',
    grade: 'ਜਮਾਤ', subject: 'ਵਿਸ਼ਾ', difficulty: 'ਮੁਸ਼ਕਲ ਪੱਧਰ',
    beginner: 'ਮੁੱਢਲਾ', intermediate: 'ਮੱਧਮ', advanced: 'ਉੱਨਤ',
    minutes: 'ਮਿੰਟ', students: 'ਵਿਦਿਆਰਥੀ', teachers: 'ਅਧਿਆਪਕ', lessons_: 'ਪਾਠ',
    quiz: 'ਕੁਇਜ਼', submitQuiz: 'ਕੁਇਜ਼ ਜਮ੍ਹਾਂ ਕਰੋ', nextLesson: 'ਅਗਲਾ ਪਾਠ',
    score: 'ਸਕੋਰ', xp: 'XP ਅੰਕ', badges: 'ਬੈਜ',
    welcome: 'ਸੁਆਗਤ ਹੈ', totalProgress: 'ਕੁੱਲ ਤਰੱਕੀ',
    announcements: 'ਐਲਾਨ',
  }
};

const LangContext = createContext(null);

export const LangProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.body.classList.toggle('lang-pa', lang === 'pa');
  }, [lang]);

  const t = (key) => translations[lang][key] || translations.en[key] || key;
  const toggle = () => setLang(l => l === 'en' ? 'pa' : 'en');

  return (
    <LangContext.Provider value={{ lang, setLang, t, toggle }}>
      {children}
    </LangContext.Provider>
  );
};

export const useLang = () => useContext(LangContext);
