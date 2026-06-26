import React, { useState, useEffect } from 'react';
import API from '../axios';
import toast from 'react-hot-toast';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const res = await API.get('/orders/admin/all', config);
        setOrders(res.data);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load orders');
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const updatePayment = async (id, amount) => {
    try {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await API.put(`/orders/${id}/payment`, { amount, paymentType: 'cash' }, config);
      toast.success('Payment updated!');
      const res = await API.get('/orders/admin/all', config);
      setOrders(res.data);
    } catch (error) {
      toast.error('Failed');
    }
  };

  const filtered = orders.filter(o => filter === 'all' ? true : o.paymentStatus === filter);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">📋 Orders</h1>
      <div className="flex gap-3 mb-4">
        <button onClick={() => setFilter('all')} className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>All</button>
        <button onClick={() => setFilter('pending')} className={`px-4 py-2 rounded ${filter === 'pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}>Pending</button>
        <button onClick={() => setFilter('paid')} className={`px-4 py-2 rounded ${filter === 'paid' ? 'bg-green-500 text-white' : 'bg-gray-200'}`}>Paid</button>
      </div>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Order#</th>
              <th>Shop</th>
              <th>Amount</th>
              <th>Due</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map(o => (
              <tr key={o._id}>
                <td className="px-6 py-4">{o.orderNumber}</td>
                <td>{o.shopName}</td>
                <td>₹{o.totalAmount}</td>
                <td className="text-red-500 font-bold">₹{o.dueAmount}</td>
                <td><span className={`px-2 py-1 rounded text-xs ${o.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{o.paymentStatus}</span></td>
                <td>
                  {o.dueAmount > 0 && (
                    <button onClick={() => updatePayment(o._id, o.dueAmount)} className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600">Pay Now</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Orders;
