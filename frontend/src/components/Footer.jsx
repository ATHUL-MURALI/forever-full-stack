import React from 'react';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';

const Footer = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ amount: 0.2 }}
        >
            <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
                <div>
                    <img src={assets.logo} className='mb-5 w-32' alt='' />
                    <p className='w-full md:w-2/3 text-gray-600'>
                        REALITY brings you the latest in fast fashion, offering a wide range of trendy and affordable apparel, footwear, and accessories. Designed for those who embrace contemporary style, we ensure high-quality pieces that blend comfort with cutting-edge fashion. With a seamless shopping experience, fast delivery, and dedicated customer support, staying ahead of trends has never been easier. Explore the latest collections and redefine your style with us.
                    </p>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>COMPANY</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                <div>
                    <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                    <ul className='flex flex-col gap-1 text-gray-600'>
                        <li>+916969696969</li>
                        <li>contact@reality.in</li>
                    </ul>
                </div>
            </div>

            <div>
                <hr />
                <p className='py-5 text-sm text-center'>Copyright 2025@ reality.in - All Rights Reserved.</p>
            </div>
        </motion.div>
    );
};

export default Footer;
