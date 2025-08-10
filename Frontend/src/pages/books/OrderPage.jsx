import React from 'react';
import { useGetOrderByEmailQuery } from '../../redux/features/ordersApi';
import { useAuth } from '../../firebase/Authcontext';
import { Link } from 'react-router-dom';

const OrderPage = () => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return (
            <div className="text-center text-gray-300 mt-10 text-lg">
                Please login to view your orders.
            </div>
        );
    }

    const { data: orders = [], isLoading, isError } = useGetOrderByEmailQuery(currentUser.email);

    if (isLoading) return <div className="text-center mt-10 text-gray-300">Loading...</div>;
    if (isError) return <div className="text-center mt-10 text-red-500">Error getting orders data</div>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h2 className="text-3xl font-bold text-white mb-6">Your Orders</h2>

            {orders.length === 0 ? (
                <div className="text-gray-400 text-center">No orders found!</div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order, index) => (
                        <div
                            key={order._id}
                            className="bg-slate-800 rounded-lg shadow-lg p-5 border border-slate-700"
                        >
                            {/* Order Number */}
                            <div className="flex justify-between items-center mb-4">
                                <p className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                    Order #{index + 1}
                                </p>
                                <span className="text-gray-400 text-sm">
                                    {order.createdAt
                                        ? new Date(order.createdAt).toLocaleDateString()
                                        : 'Unknown Date'}
                                </span>
                            </div>

                            {/* Order Info */}
                            <h3 className="text-lg font-bold text-white">Order ID: {order._id}</h3>
                            <p className="text-gray-300">Name: {order.name}</p>
                            <p className="text-gray-300">Email: {order.email}</p>
                            <p className="text-gray-300">Phone: {order.phone}</p>

                            {/* Price & Status */}
                            <div className="flex justify-between items-center mt-4">
                                <p className="text-purple-400 font-bold text-lg">
                                    Total: NPR. {order.totalPrice}
                                </p>
                            </div>

                            {/* Address */}
                            <div className="mt-4">
                                <h4 className="font-semibold text-white">Shipping Address</h4>
                                <p className="text-gray-300">
                                    {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                                </p>
                            </div>

                            {/* Product List */}
                            <div className="mt-4">
                                <h4 className="font-semibold text-white">Products</h4>
                                <ul className="list-disc list-inside text-gray-300">
                                    {order.productIds.map((productId) => (
                                        <li key={productId} className="hover:text-purple-400 cursor-pointer">
                                            {productId}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Actions */}
                            <div className="mt-5 flex justify-end">
                                <Link to ={`/orders/${order._id}`}>
                                <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white transition">
                                    View Details
                                </button></Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderPage;
