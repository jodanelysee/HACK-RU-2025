import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCar, FaXmark, FaBars } from "react-icons/fa6";
import { MdOutlineFoodBank } from "react-icons/md";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Nav items
  const navItems = [
    { link: "Home", path: "/home" },
    { link: "Save Recipes", path: "/saved" },
    { link: "About", path: "/about" },
  ];

  return (
    <header className='w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300'>
      <nav className={`py-4 lg:px-24 px-4`}>
        <div className='flex justify-between items-center text-base gap-8'>
          <Link to="/" className='text-2x1 font-bold text-green-600 flex items-center gap-2'>
            <MdOutlineFoodBank className='inline-block' />PrepNGo
          </Link>

          {/* Nav items for large screens */}
          <ul className='md:flex space-x-12 hidden'>
            {navItems.map(({ link, path }) => (
              <Link key={path} to={path} className='block text-base text-gray-500 cursor-pointer hover:text-black'>
                {link}
              </Link>
            ))}
          </ul>

          {/* Username and Logout button for large screens */}
          <div className='space-x-4 hidden lg:flex items-center'>
            <span className='text-base font-semibold text-black'>{username}</span>
            <button
              onClick={handleLogout}
              className='text-base font-semibold text-gray-500 hover:text-black border px-4 py-2 rounded-md border-green-600 bg-white hover:bg-green-600'
            >
              Logout
            </button>
          </div>

          {/* Menu button for small screens */}
          <div className='md:hidden'>
            <button onClick={toggleMenu} className='text-black focus:outline-none'>
              {isMenuOpen ? <FaXmark className='h-5 w-5 text-black' /> : <FaBars className='h-5 w-5 text-black' />}
            </button>
          </div>
        </div>

        {/* Nav items for small devices */}
        <div className={`space-y-4 px-4 mt-16 py-7 bg-gray-500 ${isMenuOpen ? "block fixed top-0 right-0 left-0 z-50" : "hidden"}`}>
          {navItems.map(({ link, path }) => (
            <Link key={path} to={path} className='block text-base text-black uppercase cursor-pointer'>
              {link}
            </Link>
          ))}
          {/* Username and Logout button for small screens */}
          <span className='block text-base text-black uppercase cursor-pointer mt-4'>{username}</span>
          <button
            onClick={handleLogout}
            className='block text-base text-black uppercase cursor-pointer mt-4 hover:text-green-600'
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
