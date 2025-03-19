import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';

const OurPolicy = () => {
    // Animation variants for the policy items (fade from right)
    const policyVariants = {
        hidden: { opacity: 0, x: 50 }, // Starts off to the right
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.8, ease: 'easeOut' }
        }
    };

    return (
        <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
            {/* Policy 1 */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                exit="hidden"
                viewport={{ once: false, amount: 0.2 }} // Triggers fade-out when scrolling up
                variants={policyVariants}
            >
                <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
                <p className='font-semibold'>Easy Exchange Policy</p>
                <p className='text-gray-400'>We offer hassle-free exchange policy</p>
            </motion.div>

            {/* Policy 2 */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                exit="hidden"
                viewport={{ once: false, amount: 0.2 }}
                variants={policyVariants}
            >
                <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
                <p className='font-semibold'>7 Days Return Policy</p>
                <p className='text-gray-400'>We provide 7 days free return policy</p>
            </motion.div>

            {/* Policy 3 */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                exit="hidden"
                viewport={{ once: false, amount: 0.2 }}
                variants={policyVariants}
            >
                <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
                <p className='font-semibold'>Best Customer Support</p>
                <p className='text-gray-400'>We provide 24/7 customer support</p>
            </motion.div>
        </div>
    );
};

export default OurPolicy;
