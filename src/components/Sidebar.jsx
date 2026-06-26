import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiHome, FiPackage, FiShoppingBag, FiUsers, FiBell, FiSettings, FiDollarSign, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

function Sidebar() {
  const { logout } = useAuth();
  const links = [
    { to: '/', icon: FiHome, label: 'Dashboard' },
    { to: '/products', icon: FiPackage, label: 'Products' },
    { to: '/orders', icon: FiShoppingBag, label: 'Orders' },
    { to: '/shops', icon: FiUsers, label: 'Shops' },
    { to: '/due', icon: FiDollarSign, label: 'Due Tracker' },
    { to: '/alerts', icon: FiBell, label: 'Alerts' },
    { to: '/settings', icon: FiSettings, label: 'Settings' },
  ];
  return (
    <div className="bg-green-700 text-white w-64 flex-shrink-0 flex flex-col">
      <div className="p-6 border-b border-green-600">
        <h1 className="text-2xl font-bold">🛒 GGM&S WHOLSALE</h1>
        <p className="text-sm text-green-200">WHOLESALE</p>
      </div>
      <nav className="flex-1 px-4 py-4">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink key={to} to={to} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition ${isActive ? 'bg-green-800 text-white' : 'hover:bg-green-600'}`}>
            <Icon size={20} /><span>{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-green-600">
        <button onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-600 w-full">
          <FiLogOut size={20} /><span>Logout</span>
        </button>
      </div>
    </div>
  );
}
export default Sidebar;
