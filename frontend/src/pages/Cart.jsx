import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
    const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);

    const [cartData, setCartData] = useState([]);

    useEffect(() => {
        if (products.length > 0) {
            const tempData = [];
            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        tempData.push({
                            _id: items,
                            size: item,
                            quantity: cartItems[items][item]
                        });
                    }
                }
            }
            setCartData(tempData);
        }
    }, [cartItems, products]);

    const handleRemoveItem = (id, size) => {
        // Add fade-out effect when removing a product
        const updatedCart = cartData.filter(item => !(item._id === id && item.size === size));
        setCartData(updatedCart);
        setTimeout(() => updateQuantity(id, size, 0), 300); // Delay actual removal for smooth animation
    };

    return (
        <div className='border-t pt-14'>
            <div className='text-2xl mb-3'>
                <Title text1={'YOUR'} text2={'CART'} />
            </div>

            {cartData.length === 0 ? (
                <div className='text-center text-gray-500 mt-10 text-lg'>
                    🛒 Your cart is empty
                </div>
            ) : (
                <div>
                    {cartData.map((item, index) => {
                        const productData = products.find((product) => product._id === item._id);

                        return (
                            <div
                                key={index}
                                className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4 transition-all duration-300 ease-in-out hover:bg-gray-50'
                            >
                                <div className='flex items-start gap-6'>
                                    <img className='w-16 sm:w-20 rounded-lg' src={productData.image[0]} alt="" />
                                    <div>
                                        <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                                        <div className='flex items-center gap-5 mt-2'>
                                            <p>{currency}{productData.price}</p>
                                            <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50 rounded-lg'>{item.size}</p>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))}
                                    className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1 rounded-lg'
                                    type="number"
                                    min={1}
                                    defaultValue={item.quantity}
                                />
                                <img
                                    onClick={() => handleRemoveItem(item._id, item.size)}
                                    className='w-4 sm:w-5 cursor-pointer transform transition-transform duration-200 hover:scale-110'
                                    src={assets.bin_icon}
                                    alt=""
                                />
                            </div>
                        );
                    })}
                </div>
            )}

            {cartData.length > 0 && (
                <div className='flex justify-end my-20'>
                    <div className='w-full sm:w-[450px]'>
                        <CartTotal />
                        <div className='w-full text-end'>
                            <button
                                onClick={() => navigate('/place-order')}
                                className='bg-black text-white text-sm my-8 px-8 py-3 rounded-full transition-transform duration-300 transform hover:scale-105 hover:bg-gray-800 hover:shadow-lg'
                            >
                                PROCEED TO CHECKOUT
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
