// src/pages/LoginPage.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { login, getMe } from '../lib/api';
import { useUserStore } from '../store/userStore';

// Componente para a animação de loading
const Spinner: React.FC = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
    }
  }, [location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await login({ username, password });
      const userData = await getMe();
      setUser(userData);
      navigate('/');
    } catch (err) {
      setError('Login falhou. Verifique o seu nome de utilizador e password.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-brand-light rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white">{t('loginPage.title')}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-400 text-sm text-center p-2 bg-red-900/50 rounded-md">{error}</p>}
          {successMessage && <p className="text-green-400 text-sm text-center p-2 bg-green-900/50 rounded-md">{successMessage}</p>}
          <div>
            <label htmlFor="username">{t('loginPage.username')}</label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-white bg-brand-dark border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="password">{t('loginPage.password')}</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 text-white bg-brand-dark border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent"
              disabled={loading}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 font-semibold text-white bg-brand-accent rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors flex justify-center items-center"
              disabled={loading}
            >
              {loading ? <Spinner /> : t('loginPage.submit')}
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-brand-text">
          {t('loginPage.noAccount')}{' '}
          <Link to="/registo" className="font-medium text-brand-accent hover:underline">
            {t('registerPage.loginHere')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
