import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetAdminOrderByIdQuery } from '../../redux/features/ordersApi';
import Loading from '../../components/Loading';

const AdminOrderDetails = () => {
  const { id } = useParams();
  const { data: order, isLoading, isError } = useGetAdminOrderByIdQuery(id);

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="text-center text-red-400 mt-10">
        Failed to load order
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-slate-800 rounded-lg shadow-lg text-gray-100">
      <h2 className="text-3xl font-bold mb-6 border-b border-gray-700 pb-2">
        Order Details
      </h2>

      <div className="mb-6 space-y-2">
        <p>
          <span className="font-semibold text-gray-300">Name:</span> {order.name}
        </p>
        <p>
          <span className="font-semibold text-gray-300">Email:</span>{' '}
          {order.email}
        </p>
        <p>
          <span className="font-semibold text-gray-300">Total Price:</span> NPR{' '}
          {order.totalPrice}
        </p>
        <p>
          <span className="font-semibold text-gray-300">Status:</span>{' '}
          {order.isApproved ? (
            <span className="text-green-400">Approved ✅</span>
          ) : (
            <span className="text-yellow-400">Pending ⏳</span>
          )}
        </p>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-lg mb-3 text-gray-200">Products</h3>
        {order.productIds?.length ? (
          <ul className="list-disc pl-6 space-y-1">
            {order.productIds.map((product) => (
              <li key={product._id} className="text-gray-300">
                {product.title}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No products found.</p>
        )}
      </div>

      <Link
        to="/dashboard/manage-orders"
        className="inline-block mt-4 px-5 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
      >
        ← Back to Orders
      </Link>
    </div>
  );
};

export default AdminOrderDetails;
