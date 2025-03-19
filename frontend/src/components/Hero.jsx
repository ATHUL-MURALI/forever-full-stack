import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { assets } from '../assets/assets';

// Dummy images for slideshow — add more if needed
const slideshowImages = [
    assets.hero_img,
    assets.hero_img_2,
    assets.hero_img_3,
];

const Hero = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Automatic slideshow effect
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length);
        }, 4000); // Change image every 4 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            className='flex flex-col sm:flex-row overflow-hidden w-full h-[500px] rounded-3xl'
            style={{
                background: 'transparent',
            }}
            initial={{ scale: 1, boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)' }} // Soft shadow by default
            whileHover={{
                scale: 1.02, // Slightly pops out on hover
                boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.2)', // Deeper shadow for 3D effect
                filter: 'brightness(1.05)', // Slight glow effect
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
        >
            {/* Inner container with white background */}
            <div className='bg-white rounded-3xl w-full h-full flex flex-col sm:flex-row'>
                {/* Hero Left Side */}
                <motion.div
                    className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                >
                    <div className='text-[#414141]'>
                        <div className='flex items-center gap-2'>
                            <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                            <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
                        </div>
                        <h1 className='inter text-3xl sm:py-3 lg:text-5xl leading-relaxed font-medium'>Latest Arrivals</h1>
                        <div className='flex items-center gap-2'>
                            <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                            <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                        </div>
                    </div>
                </motion.div>

                {/* Hero Right Side (Image Slideshow) */}
                <div className='w-full sm:w-1/2 h-full relative  overflow-hidden'>
                    <AnimatePresence mode='wait'>
                        <motion.img
                            key={slideshowImages[currentImageIndex]}
                            src={slideshowImages[currentImageIndex]}
                            alt='Hero Slideshow'
                            className='w-full h-full object-cover'
                            initial={{ opacity: 0, scale: 1 }}
                            animate={{ opacity: 1, scale: 1.05 }}
                            exit={{ opacity: 0, scale: 1 }}
                            transition={{ duration: 1.5, ease: 'easeOut' }}
                        />
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default Hero;
