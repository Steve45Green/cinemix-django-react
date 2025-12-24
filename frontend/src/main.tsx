import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './styles/globals.css';
import './i18n'; // Importar a configuração do i18next

// --- Páginas ---
import HomePage from './pages/HomePage';
import MovieDetailPage from './pages/MovieDetailPage';
import AppLayout from './components/layout/AppLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/filme/:slug', element: <MovieDetailPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/registo', element: <RegisterPage /> },
    ],
  },
]);

// Componente de fallback para o Suspense
const LoadingFallback = () => (
  <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
    A carregar...
  </div>
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Suspense fallback={<LoadingFallback />}>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>
);
