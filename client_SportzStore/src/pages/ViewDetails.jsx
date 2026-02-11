import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import dummyEquipment from '../assets/dummyEquipment';

const ViewDetails = () => {
  const { id } = useParams();
  const equipment = dummyEquipment()[id];

  if (!equipment) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h2>
            <Link to="/allequipment" className="text-blue-600 hover:underline">
              Return to All Equipment
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 flex-grow">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 gap-0">
          <div className="h-full bg-gray-100 flex items-center justify-center p-8">
            <img
              src={equipment.image}
              alt={equipment.product_name}
              className="w-full max-h-[500px] object-contain hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="p-8 lg:p-12 flex flex-col justify-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{equipment.product_name}</h2>
            <div className="flex items-center space-x-4 mb-6">
              <span className="bg-blue-100 text-blue-800 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide">
                {equipment.category}
              </span>
              <div className="flex items-center text-yellow-500">
                <span className="text-xl mr-1">★</span>
                <span className="font-semibold text-gray-700">{equipment.rating}</span>
                <span className="text-gray-400 text-sm ml-1">/ 5</span>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <h3 className="font-bold text-gray-700 mb-2">Description:</h3>
              <ul className="list-disc list-outside ml-5 space-y-2 text-gray-600 leading-relaxed">
                {Array.isArray(equipment.description)
                  ? equipment.description.map((point, index) => <li key={index}>{point}</li>)
                  : <li>{equipment.description}</li>
                }
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 p-6 bg-gray-50 rounded-xl">
              <div className="mb-4 sm:mb-0">
                <p className="text-sm text-gray-500 mb-1">Price</p>
                <span className="text-3xl font-bold text-blue-600">{equipment.price}</span>
              </div>
              <button className="w-full sm:w-auto bg-blue-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200">
                Contact Seller
              </button>
            </div>

            <div className="grid grid-cols-2 gap-6 text-sm">
              <div className="bg-green-50 p-4 rounded-lg">
                <span className="font-bold text-green-800 block mb-1">Stock Status</span>
                <span className="text-green-700">{equipment.stock_status}</span>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <span className="font-bold text-purple-800 block mb-1">Processing Time</span>
                <span className="text-purple-700">{equipment.processingTime || 'Standard Shipping (3-5 Days)'}</span>
              </div>

              {equipment.customization && (
                <div className="col-span-2 bg-orange-50 p-4 rounded-lg">
                  <span className="font-bold text-orange-800 block mb-1">Customization Available</span>
                  <span className="text-orange-700">{equipment.customization}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewDetails;