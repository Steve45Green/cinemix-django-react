// src/components/layout/AppLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header.tsx';

const AppLayout: React.FC = () => {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <Header />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
      {/* Footer pode ser adicionado aqui */}
    </div>
  );
};

export default AppLayout;
