import React from 'react';
import { useAuthStore } from '../store/authStore';
import * as FiIcons from 'react-icons/fi';

const Header: React.FC = () => {
  const user = useAuthStore(s => s.user);
  const logout = useAuthStore(s => s.logout);

  return (
    <header className="flex items-center justify-between bg-white px-8 py-4 shadow-md border-b">
      <div className="font-bold text-xl tracking-wide text-blue-900">Panel de Administración</div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1 rounded-full">
          {React.createElement(FiIcons.FiUser as React.ComponentType<any>, { className: "text-blue-700", size: 28 })}
          <span className="text-blue-900 font-medium">{user?.name || user?.email}</span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-all"
        >
          {React.createElement(FiIcons.FiLogOut as React.ComponentType<any>, { size: 20 })}
          <span className="hidden sm:inline">Salir</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
