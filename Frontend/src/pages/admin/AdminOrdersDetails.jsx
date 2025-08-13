import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetAdminOrderByIdQuery } from '../../redux/features/ordersApi';
import Loading from '../../components/Loading';

const AdminOrderDetails = () => {
  const { id } = useParams();
  const { data: order, isLoading, isError } = useGetAdminOrderByIdQuery(id);

  if (isLoading) return <Loading />;
  if (isError) return <div className="text-center text-red-500 mt-10">Failed to load order</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      <div className="mb-4">
        <p><b>Name:</b> {order.name}</p>
        <p><b>Email:</b> {order.email}</p>
        <p><b>Total Price:</b> NPR {order.totalPrice}</p>
        <p><b>Status:</b> {order.isApproved ? 'Approved ✅' : 'Pending ⏳'}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-semibold mb-2">Products</h3>
        {order.productIds?.length ? (
          <ul className="list-disc pl-5">
            {order.productIds.map(product => (
              <li key={product._id}>
                {product.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>No products found.</p>
        )}
      </div>

      <Link
        to="/dashboard/admin-orders"
        className="inline-block mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Back to Orders
      </Link>
    </div>
  );
};

export default AdminOrderDetails;
