import { useState } from "react";
import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { HiOutlineUser, HiOutlineShoppingCart } from "react-icons/hi";

import { useSelector } from "react-redux";
import fimg from '../assets/footer-logo.png';
import { useAuth } from "../firebase/Authcontext";
import avatarImg from "../assets/avatar.png"

const userNavigation = [
  { name: "Dashboard", href: "/user-dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const mainNavigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/Products" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);

  const { currentUser, logout } = useAuth()
  const handleLogOut = () => {
    logout()
  }

  return (
    <header className="w-full shadow-sm bg-[#0b1220] border-b border-white">
      <nav className="max-w-screen-2xl mx-auto flex justify-between items-center px-4 py-4 relative">

        {/* LEFT: Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-purple-700 text-white p-2 rounded-md md:h-11 ">
            <img src={fimg} alt="logo" className=' mb-4 h-4 md:h-7' />
          </div>
          <span className="font-bold text-xl">PustakBindu</span>
        </div>

        {/* CENTER: Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-base font-medium">
          {mainNavigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="hover:text-purple-700 transition relative"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* RIGHT: Cart + Login */}
        <div className="flex items-center gap-6">

          {/* Cart */}
          <Link to="/cart" className="text-white p-2 px-4 flex items-center gap-1 rounded-md text-sm bg-[var(--accent)]">
            <HiOutlineShoppingCart size={28} className="" />
            {
              cartItems.length > 0 ? <span className="font-semibold">
                {cartItems.length}</span> : <span className="font-semibold">0</span>
            }
          </Link>

          {/* Login */}
          <div className="relative">
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt="User"
                    className="w-8 h-8 rounded-full ring-2 ring-purple-700"
                  />
                </button>

                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-[var(--card-bg)] text-white shadow-lg rounded-md z-50 ">
                    <ul className="py-2">
                      {userNavigation.map((item) => (
                        <li key={item.name}>
                          <Link
                            to={item.href}
                            onClick={() => setIsDropdownOpen(false)}
                            className="block px-4 py-2 text-sm hover:bg-[var(--link-hover)]"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button
                          onClick={() => {
                            handleLogOut();
                            setIsDropdownOpen(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--link-hover)]">
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1 hover:text-purple-700"
              >
                <HiOutlineUser size={24} />
                <span className="hidden sm:inline">Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden cursor-pointer">
            <HiMiniBars3CenterLeft size={28} />
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 shadow rounded-md p-4">
          {mainNavigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block py-2 text-base font-medium hover:text-purple-700"
              onClick={() => setIsMobileMenuOpen(false)}>
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
