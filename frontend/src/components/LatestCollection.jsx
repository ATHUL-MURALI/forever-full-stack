// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from './Title';
// import ProductItem from './ProductItem';

// const LatestCollection = () => {

//     const { products } = useContext(ShopContext);
//     const [latestProducts,setLatestProducts] = useState([]);

//     useEffect(()=>{
//         setLatestProducts(products.slice(0,10));
//     },[products])

//   return (
//     <div className='my-10'>
//       <div className='text-center py-8 text-3xl'>
//           <Title text1={'LATEST'} text2={'COLLECTIONS'} />
//           <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
//           Discover fresh styles and new trends with our latest collection—fashion that keeps you ahead.
//           </p>
//       </div>

//       {/* Rendering Products */}
//       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
//         {
//           latestProducts.map((item,index)=>(
//             <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
//           ))
//         }
//       </div>
//     </div>
//   )
// }

// export default LatestCollection


import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { motion } from 'framer-motion';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0, 10));
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
                className='text-center py-8 text-3xl'
                initial="hidden"
                whileInView="visible"
                exit="hidden"
                viewport={{ once: false, amount: 0.2 }} // Fade out when scrolling up
                variants={textVariants}
            >
                <Title text1={'LATEST'} text2={'COLLECTIONS'} />
                <motion.p
                    className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'
                    variants={textVariants}
                >
                    Discover fresh styles and new trends with our latest collection—fashion that keeps you ahead.
                </motion.p>
            </motion.div>

            {/* Product Grid with Animation */}
            <motion.div
                className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'
                initial="hidden"
                whileInView="visible"
                exit="hidden"
                viewport={{ once: false, amount: 0.2 }}
            >
                {latestProducts.map((item, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        viewport={{ once: false }}
                    >
                        <ProductItem id={item._id} image={item.image} name={item.name} price={item.price} />
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
};

export default LatestCollection;
