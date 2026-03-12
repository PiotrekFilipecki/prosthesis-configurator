import React from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const handleToggle = (): void => {
    const next = i18n.language === 'en' ? 'pl' : 'en';
    i18n.changeLanguage(next);
  };

  return (
    <button
      type="button"
      className="language-switcher"
      onClick={handleToggle}
      aria-label={`Switch to ${i18n.language === 'en' ? 'Polish' : 'English'}`}
      title={`Switch to ${i18n.language === 'en' ? 'Polish' : 'English'}`}
    >
      {i18n.language === 'en' ? 'PL' : 'EN'}
    </button>
  );
};
