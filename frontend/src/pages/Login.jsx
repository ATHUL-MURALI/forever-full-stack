import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(backendUrl + '/api/user/register', { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + '/api/user/login', { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  const hoverEffect = {
    scale: 1.02,
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    transition: { duration: 0.2 }
  };

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 rounded-lg p-6 bg-white shadow-lg'
    >
      <motion.div
        className='inline-flex items-center gap-2 mb-2 mt-6'
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className='prata-regular text-3xl'>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </motion.div>
      {currentState === 'Login' ? '' : (
        <motion.input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type='text'
          className='w-full px-3 py-2 border border-gray-800 rounded-lg'
          placeholder='Name'
          required
          whileFocus={{ scale: 1.02, transition: { duration: 0.1 } }}
        />
      )}
      <motion.input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type='email'
        className='w-full px-3 py-2 border border-gray-800 rounded-lg'
        placeholder='Email'
        required
        whileFocus={{ scale: 1.02, transition: { duration: 0.1 } }}
      />
      <motion.input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type='password'
        className='w-full px-3 py-2 border border-gray-800 rounded-lg'
        placeholder='Password'
        required
        whileFocus={{ scale: 1.02, transition: { duration: 0.1 } }}
      />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer hover:text-gray-500 transition duration-200'>Forgot your password?</p>
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer hover:text-gray-500 transition duration-200'>
            Create account
          </p>
        ) : (
          <p onClick={() => setCurrentState('Login')} className='cursor-pointer hover:text-gray-500 transition duration-200'>
            Login Here
          </p>
        )}
      </div>
      <motion.button
        type='submit'
        className='bg-black text-white font-light px-8 py-2 mt-4 rounded-full'
        whileHover={hoverEffect}
      >
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </motion.button>
    </motion.form>
  );
};

export default Login;
