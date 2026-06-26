import React, { useState, useEffect } from 'react';
import API from '../axios';
import toast from 'react-hot-toast';

function DueTracker() {
  const [shops, setShops] = useState([]);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await API.get('/shops', config);
        const withDue = res.data.filter(s => s.dueAmount > 0);
        setShops(withDue);
      } catch (error) {
        toast.error('Failed to load dues');
      }
    };
    fetchShops();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">💰 Due Tracker</h1>
      <div className="grid gap-4">
        {shops.map(s => (
          <div key={s._id} className="bg-white p-4 rounded-xl shadow flex justify-between items-center">
            <div>
              <p className="font-bold">{s.shopName}</p>
              <p className="text-sm text-gray-500">{s.phone}</p>
            </div>
            <div className="text-right">
              <p className="text-red-500 font-bold text-xl">₹{s.dueAmount}</p>
              <p className="text-xs text-gray-400">Limit: ₹{s.creditLimit}</p>
            </div>
          </div>
        ))}
        {shops.length === 0 && <p className="text-center text-gray-500 py-10">🎉 No dues pending!</p>}
      </div>
    </div>
  );
}
export default DueTracker;
