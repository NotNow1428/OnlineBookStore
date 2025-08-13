import React from 'react';
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from '../../redux/features/ordersApi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const AdminOrders = () => {
  const navigate = useNavigate();
  const { data: orders = [], isLoading, isError, refetch } = useGetAllOrdersQuery();
  const [updateStatus] = useUpdateOrderStatusMutation();

  const handleApprove = async (orderId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You are about to approve this order!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#10B981',
      cancelButtonColor: '#6B7280',
      confirmButtonText: 'Yes, approve it!'
    });

    if (result.isConfirmed) {
      try {
        await updateStatus({ id: orderId, status: 'approved' }).unwrap();
        await refetch(); // Refresh the list after approval
        Swal.fire({
          icon: 'success',
          title: 'Order Approved!',
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error approving order',
          text: error?.data?.message || 'Something went wrong',
        });
      }
    }
  };

  const handleView = (orderId) => {
    navigate(`/dashboard/orders/${orderId}`);
  };

  if (isLoading) return <div className="text-center text-gray-300 mt-10">Loading...</div>;
  if (isError) return <div className="text-center text-red-500 mt-10">Error fetching orders</div>;

  const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved':
        return <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded-full text-xs font-semibold">Approved</span>;
      default:
        return <span className="bg-yellow-900/30 text-yellow-400 px-2 py-1 rounded-full text-xs font-semibold">Pending</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">All Orders</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-slate-800 border border-slate-700 rounded-lg">
          <thead>
            <tr className="bg-slate-700 text-gray-300">
              <th className="px-4 py-3 text-left">#</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-center">Items</th>
              <th className="px-4 py-3 text-right">Total (NPR)</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Date</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedOrders.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center text-gray-400 py-4">
                  No orders found.
                </td>
              </tr>
            ) : (
              sortedOrders.map((order, index) => (
                <tr
                  key={order._id}
                  className="border-b border-slate-700 hover:bg-slate-700/50 transition"
                >
                  <td className="px-4 py-3 text-gray-300">{index + 1}</td>
                  <td className="px-4 py-3 text-gray-300">
                    <div className="font-medium">{order.name}</div>
                    <div className="text-sm text-gray-400">{order.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{order.email}</td>
                  <td className="px-4 py-3 text-center text-gray-300">
                    {order.productIds?.length || 0}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-purple-400">
                    {order.totalPrice?.toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-400 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleView(order._id)}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white text-sm"
                      >
                        Details
                      </button>
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleApprove(order._id)}
                          className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-white text-sm"
                        >
                          Approve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;