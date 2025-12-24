// src/pages/RegisterPage.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { register } from '../lib/api';
import PasswordInput from '../features/auth/components/PasswordInput';

// Componente para a animação de loading
const Spinner: React.FC = () => (
  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const RegisterPage: React.FC = () => {
  const { t } = useTranslation();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setFieldErrors({});

    try {
      await register({ username, email, password, password2 });
      navigate('/login', {
        state: { message: 'Registo bem-sucedido! Faça o login.' },
      });
    } catch (err: any) {
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        if (typeof errorData === 'string') {
          setError(errorData);
        } else {
          setFieldErrors(errorData);
          setError("Por favor, corrija os erros no formulário.");
        }
      } else {
        setError('Ocorreu um erro inesperado. Tente novamente.');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const isSubmitDisabled = loading || !isPasswordValid || password !== password2;

  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-brand-light rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white">{t('registerPage.title')}</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <p className="text-red-400 text-sm text-center p-2 bg-red-900/50 rounded-md">{error}</p>}
          
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300">{t('registerPage.username')}</label>
            <input id="username" type="text" required value={username} onChange={(e) => setUsername(e.target.value)} className={`w-full px-3 py-2 mt-1 text-white bg-brand-dark border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent ${fieldErrors.username ? 'border-red-500' : 'border-gray-600'}`} disabled={loading} />
            {fieldErrors.username && <p className="text-red-400 text-xs mt-1">{fieldErrors.username[0]}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">{t('registerPage.email')}</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={`w-full px-3 py-2 mt-1 text-white bg-brand-dark border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent ${fieldErrors.email ? 'border-red-500' : 'border-gray-600'}`} disabled={loading} />
            {fieldErrors.email && <p className="text-red-400 text-xs mt-1">{fieldErrors.email[0]}</p>}
          </div>
          
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} onValidityChange={setIsPasswordValid} disabled={loading} />

          <div>
            <label htmlFor="password2" className="block text-sm font-medium text-gray-300">{t('registerPage.confirmPassword')}</label>
            <input id="password2" type="password" required value={password2} onChange={(e) => setPassword2(e.target.value)} className={`w-full px-3 py-2 mt-1 text-white bg-brand-dark border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent ${password && password2 && password !== password2 ? 'border-red-500' : 'border-gray-600'}`} disabled={loading} />
            {password && password2 && password !== password2 && <p className="text-red-400 text-xs mt-1">{t('registerPage.passwordMismatch')}</p>}
            {fieldErrors.password && <p className="text-red-400 text-xs mt-1">{fieldErrors.password[0]}</p>}
          </div>

          <div>
            <button
              type="submit"
              className="w-full px-4 py-3 font-semibold text-white bg-brand-accent rounded-md hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex justify-center items-center"
              disabled={isSubmitDisabled}
            >
              {loading ? <Spinner /> : t('registerPage.submit')}
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-brand-text">
          {t('registerPage.hasAccount')}{' '}
          <Link to="/login" className="font-medium text-brand-accent hover:underline">
            {t('registerPage.loginHere')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
