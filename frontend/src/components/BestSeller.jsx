// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from './Title';
// import ProductItem from './ProductItem';

// const BestSeller = () => {

//     const {products} = useContext(ShopContext);
//     const [bestSeller,setBestSeller] = useState([]);

//     useEffect(()=>{
//         const bestProduct = products.filter((item)=>(item.bestseller));
//         setBestSeller(bestProduct.slice(0,5))
//     },[products])

//   return (
//     <div className='my-10'>
//       <div className='text-center text-3xl py-8'>
//         <Title text1={'BEST'} text2={'SELLERS'}/>
//         <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
//         Shop our best sellers—proven favorites, timeless style, and must-have trends.
//         </p>
//       </div>

//       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
//         {
//             bestSeller.map((item,index)=>(
//                 <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
//             ))
//         }
//       </div>
//     </div>
//   )
// }

// export default BestSeller


import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestseller);
        setBestSeller(bestProduct.slice(0, 5));
    }, [products]);

    // Animation variants for title and description
    const textVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' }
        }
    };

    // Animation variants for product items
    const itemVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: 'easeOut' }
        }
    };

    return (
        <div className='my-10'>
            {/* Title and Description Animation */}
            <motion.div
                className='text-center text-3xl py-8'
                initial="hidden"
                whileInView="visible"
                exit="hidden"
                viewport={{ once: false, amount: 0.2 }} // Allows fade-out when scrolling up
                variants={textVariants}
            >
                <Title text1={'BEST'} text2={'SELLERS'} />
                <motion.p
                    className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'
                    variants={textVariants}
                >
                    Shop our best sellers—proven favorites, timeless style, and must-have trends.
                </motion.p>
            </motion.div>

            {/* Product Grid with Scroll Animation */}
            <motion.div
                className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'
                initial="hidden"
                whileInView="visible"
                exit="hidden"
                viewport={{ once: false, amount: 0.2 }}
            >
                {bestSeller.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        viewport={{ once: false }}
                    >
                        <ProductItem id={item._id} name={item.name} image={item.image} price={item.price} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default BestSeller;
