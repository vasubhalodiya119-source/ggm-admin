import React, { useState, useEffect } from 'react';
import API from '../axios';
import toast from 'react-hot-toast';

function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await API.get('/products');
      setProducts(res.data);
    };
    fetch();
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">🛍 Products</h1>
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left">Name</th><th>Category</th><th>Price</th><th>Stock</th></tr></thead>
          <tbody className="divide-y">
            {products.map(p => (
              <tr key={p._id}><td className="px-6 py-4">{p.name}</td><td>{p.category}</td><td>₹{p.price}</td><td>{p.stock}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Products;
