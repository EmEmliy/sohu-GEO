import { createContext, useContext, useState, useCallback } from 'react';
import { translations, DEFAULT_LANG } from '../i18n/translations';

export const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    // 优先读取 localStorage 中保存的语言偏好
    try {
      const saved = localStorage.getItem('dp_lang');
      if (saved && translations[saved]) return saved;
    } catch {
      // ignore
    }
    // 根据浏览器语言自动判断
    const browserLang = navigator.language || '';
    if (browserLang.startsWith('ja')) return 'ja';
    if (browserLang.startsWith('es')) return 'es';
    if (browserLang.startsWith('en')) return 'en';
    return DEFAULT_LANG;
  });

  const switchLang = useCallback((code) => {
    if (!translations[code]) return;
    setLang(code);
    try {
      localStorage.setItem('dp_lang', code);
    } catch {
      // ignore
    }
  }, []);

  const t = translations[lang] || translations[DEFAULT_LANG];

  return (
    <LanguageContext.Provider value={{ lang, switchLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
