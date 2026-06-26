import React, { useState, useEffect } from 'react';
import API from '../axios';
import toast from 'react-hot-toast';

function Settings() {
  const [settings, setSettings] = useState({ headline: '', paymentOptions: { cash: true, qr: true, udhhar: true } });
  const [headline, setHeadline] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await API.get('/settings');
        setSettings(res.data);
        setHeadline(res.data.headline || '');
      } catch (error) {
        toast.error('Failed to load settings');
      }
    };
    fetchSettings();
  }, []);

  const updateHeadline = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await API.put('/settings/headline', { headline }, config);
      toast.success('Headline updated!');
    } catch (error) {
      toast.error('Failed');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">⚙️ Settings</h1>
      <div className="bg-white p-6 rounded-xl shadow max-w-2xl">
        <div className="mb-6">
          <label className="block font-semibold mb-2">🏷️ Headline (ઉપરનું ટાઈટલ)</label>
          <div className="flex gap-3">
            <input value={headline} onChange={(e) => setHeadline(e.target.value)} className="flex-1 border px-4 py-2 rounded" />
            <button onClick={updateHeadline} className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">Update</button>
          </div>
        </div>
        <div className="border-t pt-4">
          <h3 className="font-semibold mb-3">💳 Payment Options</h3>
          <div className="flex gap-6">
            {['cash', 'qr', 'udhhar'].map(key => (
              <label key={key} className="flex items-center gap-2">
                <input type="checkbox" checked={settings.paymentOptions?.[key] || false} onChange={() => {}} disabled />
                {key.toUpperCase()}
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Settings;
