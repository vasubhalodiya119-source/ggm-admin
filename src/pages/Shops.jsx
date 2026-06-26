import React, { useState, useEffect } from 'react';
import API from '../axios';
import toast from 'react-hot-toast';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

function Shops() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await API.get('/shops', config);
        setShops(res.data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load shops');
        setLoading(false);
      }
    };
    fetchShops();
  }, []);

  const updateCredit = async (id, currentLimit) => {
    const newLimit = prompt('Enter new credit limit:', currentLimit);
    if (newLimit) {
      try {
        const token = localStorage.getItem('adminToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        await API.put(`/shops/${id}/credit`, { creditLimit: parseInt(newLimit) }, config);
        toast.success('Credit limit updated');
        const res = await API.get('/shops', config);
        setShops(res.data);
      } catch (error) {
        toast.error('Failed');
      }
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">🛒 Shops</h1>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Shop Name</th>
              <th>Phone</th>
              <th>Credit Limit</th>
              <th>Due</th>
              <th>Orders</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {shops.map(s => (
              <tr key={s._id}>
                <td className="px-6 py-4 font-semibold">{s.shopName}</td>
                <td>{s.phone}</td>
                <td>₹{s.creditLimit}</td>
                <td className={s.dueAmount > s.creditLimit ? 'text-red-500 font-bold' : ''}>₹{s.dueAmount}</td>
                <td>{s.totalOrders}</td>
                <td>
                  <button onClick={() => updateCredit(s._id, s.creditLimit)} className="text-blue-500 mr-3"><FiEdit2 /></button>
                  <button className="text-red-500"><FiTrash2 /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Shops;
