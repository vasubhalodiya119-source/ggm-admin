import React from 'react';
import { FiBell, FiUser } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

function Header({ title }) {
  const { user } = useAuth();
  return (
    <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl font-semibold text-gray-800">{title || 'Dashboard'}</h2>
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-gray-700"><FiBell size={22} /></button>
        <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg">
          <FiUser className="text-green-600" />
          <span className="text-sm font-medium text-gray-700">{user?.name || 'Admin'}</span>
        </div>
      </div>
    </header>
  );
}
export default Header;
