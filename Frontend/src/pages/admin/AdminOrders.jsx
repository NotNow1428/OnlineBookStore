import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading';
import getBaseUrl from '../../utils/baseURL';

const AdminOrders = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${getBaseUrl()}/api/admin/orders`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        console.log("API response:", res.data);
        setOrders(Array.isArray(res.data) ? res.data : res.data.orders || []);
      } catch (error) {
        console.error("Error fetching admin orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="p-6">
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2">Order ID</th>
              <th className="border border-gray-300 p-2">User Email</th>
              <th className="border border-gray-300 p-2">Total Amount</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Order Date</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(orders) ? (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 p-2">{order._id}</td>
                  <td className="border border-gray-300 p-2">{order.userEmail}</td>
                  <td className="border border-gray-300 p-2">NPR. {order.totalAmount}</td>
                  <td className="border border-gray-300 p-2">{order.status}</td>
                  <td className="border border-gray-300 p-2">{new Date(order.createdAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                
                <td colSpan="5" className="text-center p-4">
                  No valid orders data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminOrders;
