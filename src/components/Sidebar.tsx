import React from 'react';
import { useAuthStore } from '../store/authStore';
import * as FiIcons from 'react-icons/fi';
import { IconType } from 'react-icons';

const links: { label: string; path: string; icon: keyof typeof FiIcons; permission: any }[] = [
  { label: 'Dashboard', path: '/dashboard', icon: 'FiHome', permission: null },
  { label: 'Tours', path: '/tours', icon: 'FiList', permission: { action: 'read', subject: 'Tour' } },
  { label: 'Clientes', path: '/clientes', icon: 'FiUsers', permission: { action: 'read', subject: 'Client' } },
  { label: 'Reportes', path: '/reportes', icon: 'FiBarChart2', permission: { action: 'read', subject: 'Report' } },
  { label: 'Usuarios', path: '/usuarios', icon: 'FiUser', permission: { action: 'manage', subject: 'User' } },
];

const Sidebar: React.FC<{ onNavigate: (path: string) => void; current: string }> = ({ onNavigate, current }) => {
  const permissions = useAuthStore(s => s.permissions);
  const can = (action: string, subject: string) => permissions?.some((p: any) => typeof p === 'object' && p.action === action && p.subject === subject);

  return (
    <aside className="w-60 bg-gradient-to-b from-blue-900 to-blue-700 text-white h-full flex flex-col py-6 shadow-lg">
      <div className="text-2xl font-bold px-6 mb-8 tracking-wide">Agencia Tours</div>
      <nav className="flex flex-col gap-1">
        {links.map(link => {
          if (link.permission && !can(link.permission.action, link.permission.subject)) return null;
          const Icon = FiIcons[link.icon] as React.ComponentType<any>;
          return (
            <button
              key={link.path}
              onClick={() => onNavigate(link.path)}
              className={`flex items-center gap-3 px-6 py-3 rounded-l-full transition-all duration-200 hover:bg-blue-800 ${current === link.path ? 'bg-blue-800 font-semibold' : ''}`}
            >
              {Icon && React.createElement(Icon, { size: 22 })}
              <span>{link.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="flex-1" />
      <div className="px-6 text-xs text-blue-200 opacity-60">© {new Date().getFullYear()} Agencia Tours</div>
    </aside>
  );
};

export default Sidebar;
