import React from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineViewGridAdd } from 'react-icons/hi';
import { MdOutlineManageHistory, MdOutlineShoppingCart } from 'react-icons/md';
import fimg from '../../assets/footer-logo.png';
import avatarImg from '../../assets/avatar.png';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('token');

  React.useEffect(() => {
    if (!isLoggedIn) navigate('/admin', { replace: true });
  }, [isLoggedIn, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin', { replace: true });
  };

  const menuItems = [
    { name: 'Dashboard', icon: '🏠', path: '/dashboard' },
    { name: 'Add Book', icon: <HiOutlineViewGridAdd className="h-5 w-5" />, path: '/dashboard/add-new-book' },
    { name: 'Manage Books', icon: <MdOutlineManageHistory className="h-5 w-5" />, path: '/dashboard/manage-books' },
    { name: 'Manage Orders', icon: <MdOutlineShoppingCart className="h-5 w-5" />, path: '/dashboard/manage-orders' },
  ];

  return (
    <section className="flex min-h-screen bg-gray-100">
      <aside className="hidden md:flex md:flex-col w-52 bg-slate-800 text-gray-300">
        <div className="flex items-center justify-center h-20 bg-purple-600 hover:bg-purple-500 rounded-b-lg shadow-md transition">
          <img
            src={fimg}
            alt="logo"
            className="h-10 w-10 object-contain"
          />
        </div>

        <nav className="flex flex-col flex-grow mt-4 space-y-1 px-3">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center p-2 rounded-lg hover:bg-slate-700 transition ${
                location.pathname === item.path ? 'bg-slate-700 text-white' : 'text-gray-300'
              }`}
            >
              <span className="mr-3 text-lg">{item.icon}</span>
              <span className="font-medium text-sm">{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-auto p-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition text-sm cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between h-20 px-6 bg-white shadow">
          <h1 className="text-2xl font-bold text-gray-800">PustakBindu</h1>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="font-semibold text-gray-800">Admin</div>
              <div className="text-sm text-gray-500">Book Store</div>
            </div>
            <img
              src={avatarImg}
              alt="admin avatar"
              className="h-12 w-12 rounded-full object-cover border-2 border-purple-600"
            />
          </div>
        </header>

        <main className="p-6 sm:p-10 space-y-6">
          <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
            <div className="mr-6">
              <h1 className="text-4xl text-gray-600 font-semibold mb-2">Dashboard</h1>
              <h2 className="text-gray-600 ml-0.5">Book Store Inventory</h2>
            </div>
            <div className="flex flex-col md:flex-row items-start justify-end -mb-3">
              <Link
                to="/dashboard/manage-books"
                className="inline-flex px-5 py-3 text-purple-600 hover:text-purple-700 focus:text-purple-700 hover:bg-purple-100 focus:bg-purple-100 border border-purple-600 rounded-md mb-3"
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Manage Books
              </Link>
              <Link
                to="/dashboard/add-new-book"
                className="inline-flex px-5 py-3 text-white bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 rounded-md ml-6 mb-3"
              >
                <svg
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add New Book
              </Link>
            </div>
          </div>
          <Outlet />
        </main>
      </div>
    </section>
  );
};

export default AdminDashboard;
