import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import ToursPage from '../pages/ToursPage';
import * as FiIcons from 'react-icons/fi';
import { IconType } from 'react-icons';

const Dashboard = () => {
  const cards: { label: string; value: number; desc: string; icon: keyof typeof FiIcons; color: string }[] = [
    { label: 'Tours', value: 12, desc: 'Activos', icon: 'FiList', color: 'from-blue-500 to-blue-700' },
    { label: 'Clientes', value: 34, desc: 'Registrados', icon: 'FiUsers', color: 'from-green-500 to-green-700' },
    { label: 'Reportes', value: 5, desc: 'Generados', icon: 'FiBarChart2', color: 'from-yellow-400 to-yellow-600' },
    { label: 'Usuarios', value: 3, desc: 'Administradores', icon: 'FiUser', color: 'from-pink-500 to-pink-700' },
  ];
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, i) => {
        const Icon = FiIcons[card.icon] as React.ComponentType<any>;
        return (
          <div key={card.label} className={`bg-gradient-to-br ${card.color} text-white rounded-xl shadow-lg p-6 flex flex-col items-start gap-2 animate-fade-in`}>
            {Icon && React.createElement(Icon, { size: 36 })}
            <div className="text-2xl font-bold">{card.label}</div>
            <div className="text-3xl font-extrabold">{card.value}</div>
            <div className="text-xs opacity-70">{card.desc}</div>
          </div>
        );
      })}
    </div>
  );
};

const pages: { [key: string]: React.ReactNode } = {
  '/dashboard': <Dashboard />,
  '/tours': <ToursPage />,
  '/clientes': <div className="p-8 text-lg">Clientes (en desarrollo)</div>,
  '/reportes': <div className="p-8 text-lg">Reportes (en desarrollo)</div>,
  '/usuarios': <div className="p-8 text-lg">Usuarios (en desarrollo)</div>,
};

const PrivateLayout: React.FC = () => {
  const [current, setCurrent] = useState('/dashboard');

  return (
    <div className="flex h-screen bg-blue-50">
      <Sidebar onNavigate={setCurrent} current={current} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto animate-fade-in">
          {pages[current] || <div className="p-8">Página no encontrada</div>}
        </main>
      </div>
    </div>
  );
};

export default PrivateLayout;
