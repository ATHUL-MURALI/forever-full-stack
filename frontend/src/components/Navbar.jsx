import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  const redirectToAnotherProject = () => {
    window.location.href = 'https://your-other-project-url.com';
  };

  // Hover effect for buttons and links
  const hoverEffect = {
    scale: 1.05,
    transition: { duration: 0.2, ease: 'easeOut' },
  };

  // Slower and more subtle slide-in animation from the top
  const slideInFromTop = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: 'easeOut' } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={slideInFromTop}
      className='flex items-center justify-between py-5 font-medium'
    >
      {/* Logo - Redirects to Home */}
      <Link to='/'>
        <img src={assets.logo} className='w-36' alt='Logo' />
      </Link>

      {/* Navigation Links */}
      <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
        {['/', '/collection', '/about', '/contact'].map((path, index) => (
          <NavLink
            key={index}
            to={path}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 cursor-pointer ${
                isActive ? 'text-black font-semibold' : 'text-gray-700'
              }`
            }
          >
            <p className='capitalize tracking-wide text-base'>{path === '/' ? 'Home' : path.slice(1)}</p>
            <motion.hr
              className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${
                path === window.location.pathname ? 'block' : 'hidden'
              }`}
              whileHover={{ width: '100%' }}
              transition={{ duration: 0.2 }}
            />
          </NavLink>
        ))}
      </ul>

      {/* Icons & Buttons */}
      <div className='flex items-center gap-6'>
        <motion.img
          whileHover={hoverEffect}
          onClick={() => {
            setShowSearch(true);
            navigate('/collection');
          }}
          src={assets.search_icon}
          className='w-5 cursor-pointer'
          alt='Search'
        />

        {/* Profile Dropdown */}
        <div className='group relative'>
          <motion.img
            whileHover={hoverEffect}
            onClick={() => (token ? null : navigate('/login'))}
            className='w-5 cursor-pointer'
            src={assets.profile_icon}
            alt='Profile'
          />
          {token && (
            <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded'>
                <motion.p whileHover={hoverEffect} className='cursor-pointer hover:text-black'>
                  My Profile
                </motion.p>
                <motion.p
                  whileHover={hoverEffect}
                  onClick={() => navigate('/orders')}
                  className='cursor-pointer hover:text-black'
                >
                  Orders
                </motion.p>
                <motion.p whileHover={hoverEffect} onClick={logout} className='cursor-pointer hover:text-black'>
                  Logout
                </motion.p>
              </div>
            </div>
          )}
        </div>

        {/* Cart Icon */}
        <Link to='/cart' className='relative'>
          <motion.img whileHover={hoverEffect} src={assets.cart_icon} className='w-5 min-w-5' alt='Cart' />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <motion.img
          whileHover={hoverEffect}
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className='w-5 cursor-pointer sm:hidden'
          alt='Menu'
        />
      </div>

      {/* 3D Customizer Button */}
      <motion.button
        whileHover={hoverEffect}
        onClick={redirectToAnotherProject}
        className='bg-red-500 text-white py-2 px-4 rounded-full'
      >
        3D Customizer
      </motion.button>
    </motion.div>
  );
};

export default Navbar;
