// src/components/Header.tsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../store/userStore';

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex space-x-2">
      <button 
        onClick={() => changeLanguage('pt')} 
        className={`px-2 py-1 text-sm rounded-md ${i18n.language.startsWith('pt') ? 'bg-brand-accent text-white' : 'text-brand-text hover:bg-brand-light'}`}
      >
        PT
      </button>
      <button 
        onClick={() => changeLanguage('en')}
        className={`px-2 py-1 text-sm rounded-md ${i18n.language === 'en' ? 'bg-brand-accent text-white' : 'text-brand-text hover:bg-brand-light'}`}
      >
        EN
      </button>
    </div>
  );
};

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-brand-light border-b border-gray-700">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white hover:text-brand-accent transition-colors">
          Cinemix
        </Link>
        
        <div className="flex items-center space-x-4">
          <LanguageSwitcher />
          <div className="w-px h-6 bg-gray-600"></div>
          {isAuthenticated && user ? (
            <>
              <span className="text-brand-text">{t('header.greeting', { name: user.username })}</span>
              <button 
                onClick={handleLogout}
                className="bg-red-600 text-white px-3 py-1 rounded-md text-sm font-semibold hover:bg-red-700 transition-colors"
              >
                {t('header.logout')}
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-brand-text hover:text-white transition-colors"
              >
                {t('header.login')}
              </Link>
              <Link 
                to="/registo" 
                className="bg-brand-accent text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-700 transition-colors"
              >
                {t('header.register')}
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
