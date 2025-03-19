import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link
            onClick={() => scrollTo(0, 0)}
            className='text-gray-700 cursor-pointer'
            to={`/product/${id}`}
        >
            {/* Product container with subtle glow and softened shadow */}
            <div
                className='rounded-2xl overflow-hidden bg-transparent'
                style={{
                    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)', // Softer default shadow
                    transition: 'all 0.3s ease-out',
                    borderRadius: '20px',
                }}
                onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                        '0px 10px 25px rgba(0, 0, 0, 0.25), 0px 0px 20px rgba(255, 255, 255, 0.1)'; // Balanced black shadow + glow
                    e.currentTarget.style.transform = 'scale(1.03)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0px 5px 15px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.transform = 'scale(1)';
                }}
            >
                {/* Image perfectly aligned with container’s rounded corners */}
                <img
                    className='w-full h-full object-cover rounded-2xl'
                    src={image[0]}
                    alt={name}
                />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
        </Link>
    );
};

export default ProductItem;
