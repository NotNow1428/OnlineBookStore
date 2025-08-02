import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";

import avatarImg from "../assets/avatar.png";
import { useState } from "react";
import { useSelector } from "react-redux";

const userNavigation = [
  { name: "Dashboard", href: "/user-dashboard" },
  { name: "Orders", href: "/orders" },
  { name: "Cart Page", href: "/cart" },
  { name: "Check Out", href: "/checkout" },
];

const mainNavigation = [
  { name: "Home", href: "/" },
  { name: "Cantact", href: "/cantact" },
  { name: "About", href: "/about" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItem = useSelector(state => state.cart)
  const currentUser = false;

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-4">
      <nav className="flex justify-between items-center relative">
       
        {/* LEFT: Menu + Nav + Search */}
        <div className="flex items-center gap-4">
         
          {/* Mobile Menu Icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            <HiMiniBars3CenterLeft className="size-6" />
          </button>

          {/* Main Nav Links (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-6 text-base font-medium">
            {mainNavigation.map((item) => (
              <Link key={item.name} to={item.href} className="hover:text-primary">
                {item.name}
              </Link>
            ))}
          </div>

          {/* Search */}
          <div className="relative sm:w-72 w-44 ml-2">
            <IoSearchOutline className="absolute left-3 top-2.5 text-gray-500" />
            <input
              type="text"
              placeholder="Search here"
              className=" border border-[var(--accent)]) w-full py-2 pl-10 pr-4 rounded-md text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* RIGHT: User + Cart */}
        <div className="relative flex items-center gap-2 sm:gap-3">
          {/* Avatar & Dropdown */}
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt=""
                    className="size-8 rounded-full ring-2 ring-blue-500"
                  />
                </button>

                {/* User dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {userNavigation.map((item) => (
                        <li key={item.name} onClick={() => setIsDropdownOpen(false)}>
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <HiOutlineUser className="size-6" />
              </Link>
            )}
          </div>

          {/* Wishlist
          <button className="hidden sm:block">
            <HiOutlineHeart className="size-6" />
          </button> */}

          {/* Cart */}
          <Link
            to="/cart"
            className="text-white p-2 px-4 flex items-center gap-1 rounded-md text-sm bg-[var(--accent)]">
            <HiOutlineShoppingCart className="" />
          {
            cartItem.length > 0 ? <span className="font-semibold">
            {cartItem.length}</span> : <span className="font-semibold">0</span>
          }
          </Link>
        </div>
      </nav>

      {/* Mobile Menu Items */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 bg-white shadow rounded-md p-4">
          {mainNavigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="block py-2 text-base font-medium hover:text-primary"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
