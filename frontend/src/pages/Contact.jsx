import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  return (
    <div>
      {/* Title Section */}
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Contact Info Section */}
      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>Jyothi College <br /> Thrissur</p>
          <p className='text-gray-500'>Tel: 6969696969 <br /> Email: reality@reality.in</p>
          
          <p className='font-semibold text-xl text-gray-600'>Careers at Reality</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          
          {/* Explore Jobs Button */}
          <button className='border border-black px-8 py-4 text-sm rounded-full transition-all duration-300 transform hover:bg-black hover:text-white hover:scale-105'>
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Newsletter Subscription Section */}
      <NewsletterBox />
    </div>
  );
};

export default Contact;
