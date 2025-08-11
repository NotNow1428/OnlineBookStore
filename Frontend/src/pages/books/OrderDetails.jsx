import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGetOrderByIdQuery } from '../../redux/features/ordersApi';
import { useFetchBookByIdQuery } from '../../redux/features/booksApi'; // For getting book details
import { FiArrowLeft } from 'react-icons/fi';
import Products from '../../components/Products';
import { getImgUrl } from '../../utils/getImgUrl';

const OrderDetails = () => {
  const { id } = useParams();
  const { data: order, isLoading, isError } = useGetOrderByIdQuery(id);

  if (isLoading) return <div className="text-center mt-10 text-gray-300">Loading...</div>;
  if (isError || !order) return <div className="text-center mt-10 text-red-500">Order not found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Back button */}
      <Link to="/orders" className="flex items-center text-purple-400 hover:underline mb-6">
        <FiArrowLeft className="mr-2" /> Back to Orders
      </Link>

      {/* Order Summary */}
      <div className="bg-slate-800 rounded-lg shadow-lg p-6 border border-slate-700">
        <h1 className="text-2xl font-bold text-white mb-4">Order Details</h1>

        <div className="text-gray-300 space-y-1">
          <p><span className="font-semibold text-white">Order ID:</span> {order._id}</p>
          <p><span className="font-semibold text-white">Date:</span> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}</p>
          <p><span className="font-semibold text-white">Total:</span> NPR. {order.totalPrice}</p>
          <p><span className="font-semibold text-white">Payment:</span> Cash on Delivery</p>
        </div>

        {/* Shipping Address */}
        <div className="mt-6">
          <h2 className="text-lg font-semibold text-white">Shipping Address</h2>
          <p className="text-gray-300">{order.name}</p>
          <p className="text-gray-300">{order.phone}</p>
          <p className="text-gray-300">
            {order.address.city}, {order.address.state}, {order.address.country} - {order.address.zipcode}
          </p>

        </div>

        {/* Product List */}
        {/* Product List */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold text-white">Ordered Products</h2>
            <p className={`font-semibold ${order.isApproved ? 'text-green-400' : 'text-yellow-400'}`}>
              {order.isApproved ? 'Success' : 'Pending'}
            </p>
          </div>

          <div className="space-y-4">
            {order.productIds.map((productId) => (
              <OrderProduct key={productId} productId={productId} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Component to fetch and display each product
const OrderProduct = ({ productId }) => {
  const { data: product, isLoading } = useFetchBookByIdQuery(productId);

  if (isLoading) {
    return <div className="text-gray-400">Loading product...</div>;
  }

  if (!product) {
    return <div className="text-red-400">Product not found</div>;
  }

  return (
    <div className="flex items-center bg-slate-900 p-3 rounded-lg shadow">
      <img
        src={product.coverImage ? getImgUrl(product.coverImage) : '/placeholder.jpg'}
        alt={product.title}
        className="w-16 h-20 object-cover rounded mr-4"
      />
      <div>
        <p className="text-white font-semibold">{product.title}</p>
        <p className="text-gray-400">NPR. {product.Price}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
