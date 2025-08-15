import React, { useState, useEffect } from 'react';
import Loading from '../../components/Loading';
import axios from 'axios';
import getBaseUrl from '../../utils/baseURL';
import { MdIncompleteCircle } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${getBaseUrl()}/api/admin`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto p-6">
      {/* Total Books */}
      <Link
        to="/dashboard/manage-books"
        className="flex flex-col items-center bg-slate-800 rounded-lg shadow hover:bg-slate-700 transition p-6"
      >
        <div className="inline-flex items-center justify-center h-16 w-16 bg-purple-100 text-purple-600 rounded-full mb-4">
          📚
        </div>
        <span className="text-2xl font-bold text-gray-100">{data?.totalBooks}</span>
        <span className="text-gray-300 mt-1">Products</span>
      </Link>

      {/* Total Sales */}
      <div className="flex flex-col items-center bg-slate-800 rounded-lg shadow p-6 hover:bg-slate-700 transition">
        <div className="inline-flex items-center justify-center h-16 w-16 bg-green-100 text-green-600 rounded-full mb-4">
          💰
        </div>
        <span className="text-2xl font-bold text-gray-100">NPR.{data?.totalSales}</span>
        <span className="text-gray-300 mt-1">Total Sales</span>
      </div>

      {/* Total Orders */}
      <Link
        to="/dashboard/manage-orders"
        className="flex flex-col items-center bg-slate-800 rounded-lg shadow hover:bg-slate-700 transition p-6"
      >
        <div className="inline-flex items-center justify-center h-16 w-16 bg-blue-100 text-blue-600 rounded-full mb-4">
          <MdIncompleteCircle className="h-6 w-6" />
        </div>
        <span className="text-2xl font-bold text-gray-100">{data?.totalOrders}</span>
        <span className="text-gray-300 mt-1">Total Orders</span>
      </Link>
    </section>
  );
};

export default Dashboard;
