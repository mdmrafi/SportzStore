import React from 'react';

const Newest = ({item}) => {
  // Add null check - return loading state or null if item doesn't exist yet
  if (!item) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Latest Product</h2>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img 
          src={item.image} 
          alt={item.product_name} 
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{item.product_name}</h3>
          <p className="text-sm text-gray-600 mb-3">{item.category}</p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-blue-600">{item.price}</span>
            <span className="text-yellow-500 flex items-center">
              <span className="mr-1">⭐</span>
              <span className="font-semibold">{item.rating}</span>
            </span>
          </div>
          <button className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-semibold">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
export default Newest;