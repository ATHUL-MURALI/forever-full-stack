import React from 'react';
import { motion } from 'framer-motion';

const NewsletterBox = () => {
    const onSubmitHandler = (event) => {
        event.preventDefault();
    };

    return (
        <motion.div
            className='text-center'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ amount: 0.2 }} // Triggers when 20% of element is in view
        >
            <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>
            <p className='text-gray-400 mt-3'>
                Subscribe to our newsletter for the latest updates, exclusive insights, and special offers. Join now and never miss out!
            </p>
            <motion.form
                onSubmit={onSubmitHandler}
                className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3 rounded-full overflow-hidden'
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <input
                    className='w-full sm:flex-1 outline-none py-3 px-4 rounded-full'
                    type='email'
                    placeholder='Enter your email'
                    required
                />
                <button type='submit' className='bg-black text-white text-xs px-10 py-4 rounded-full'>
                    SUBSCRIBE
                </button>
            </motion.form>
        </motion.div>
    );
};

export default NewsletterBox;
