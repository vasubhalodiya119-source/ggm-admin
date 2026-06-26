import React, { useState, useEffect } from 'react';
import API from '../axios';
import toast from 'react-hot-toast';
import { FiPackage, FiShoppingBag, FiUsers, FiDollarSign } from 'react-icons/fi';

function Dashboard() {
  const [stats, setStats] = useState({ totalProducts: 0, totalOrders: 0, totalShops: 0, totalRevenue: 0, pendingDue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const [products, orders, shops] = await Promise.all([
          API.get('/products', config),
          API.get('/orders/admin/all', config),
          API.get('/shops', config)
        ]);
        const orderList = orders.data;
        setStats({
          totalProducts: products.data.length,
          totalOrders: orderList.length,
          totalShops: shops.data.length,
          totalRevenue: orderList.reduce((s, o) => s + o.totalAmount, 0),
          pendingDue: orderList.reduce((s, o) => s + (o.dueAmount || 0), 0)
        });
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load dashboard');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">📊 Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={FiPackage} label="Total Products" value={stats.totalProducts} color="bg-blue-500" />
        <StatCard icon={FiShoppingBag} label="Total Orders" value={stats.totalOrders} color="bg-green-500" />
        <StatCard icon={FiUsers} label="Total Shops" value={stats.totalShops} color="bg-purple-500" />
        <StatCard icon={FiDollarSign} label="Pending Due" value={`₹${stats.pendingDue}`} color="bg-orange-500" />
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
      <div className={`${color} p-4 rounded-lg text-white`}><Icon size={24} /></div>
      <div><p className="text-sm text-gray-500">{label}</p><p className="text-2xl font-bold">{value}</p></div>
    </div>
  );
}
export default Dashboard;
