import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ item }) => {
  return (
    <div className='bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer'>
      <div className='relative h-64 overflow-hidden bg-gray-100'>
        <img
          src={item.image}
          alt={item.product_name}
          className='w-full h-full object-cover transition-transform duration-300 hover:scale-110'
        />
        <div className='absolute top-3 right-3'>
          <span className='bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold'>
            {item.stock_status}
          </span>
        </div>
      </div>
      <div className='p-5'>
        <h3 className='text-xl font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors'>
          {item.product_name}
        </h3>
        <p className='text-sm text-gray-500 mb-3'>{item.category}</p>
        <div className='flex items-center mb-3'>
          <div className='flex items-center'>
            <span className='text-yellow-400 mr-1'>★</span>
            <span className='font-semibold text-gray-700'>{item.rating}</span>
            <span className='text-gray-400 text-sm ml-1'>/5</span>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <p className='text-2xl font-bold text-blue-600'>{item.price}</p>
          <Link to={`/details/${item.id || item.index}`} className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold'>
            View
          </Link>
        </div>
        {item.customization && (
          <p className='text-xs text-gray-500 mt-3 italic'>Customization: {item.customization}</p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;