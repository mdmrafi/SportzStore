import React from 'react';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import { getAuth } from 'firebase/auth';

const AddEquipments = () => {
  
  const normalizeStockStatus = (value) => {
    const normalized = value.trim().toLowerCase();
    if (normalized === 'in stock' || normalized === 'instock' || normalized === 'in-stock') {
      return 'In-stock';
    }
    if (normalized === 'out of stock' || normalized === 'out-of-stock') {
      return 'Out of stock';
    }
    if (normalized === 'made to order' || normalized === 'made-to-order') {
      return 'Made to Order';
    }
    return value;
  };

  const handleAddEquipment = async (event) => {
    event.preventDefault();
    const form = event.target;
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      alert('Please log in before adding equipment.');
      return;
    }

    const image = form.image.value;
    const itemName = form.itemName.value;
    const category = form.category.value;
    const description = form.description.value;
    const price = form.price.value;
    const rating = form.rating.value;
    const customization = form.customization.value;
    const processingTime = form.processingTime.value;
    const stockStatus = form.stockStatus.value;
  
    const newEquipment = {
      userId: user.uid,
      image,
      product_name: itemName,
      category,
      description: description.split('\n'),
      price,
      rating,
      customization,
      processingTime,
      stock_status: normalizeStockStatus(stockStatus)
    };
    try {
      const idToken = await user.getIdToken();
      const response = await fetch('http://localhost:5000/api/equipment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${idToken}`
        },
        body: JSON.stringify(newEquipment)
      });

      if (!response.ok) {
        throw new Error('Failed to add equipment');
      }

      console.log(newEquipment);
      alert('Equipment Added Successfully (Console Logged)');
      form.reset();
    } catch (error) {
      console.error('Add equipment failed:', error);
      alert('Failed to add equipment. Check the console for details.');
    }
  }

  return (
    <div className='bg-gray-50 min-h-screen'>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-blue-600 py-6 px-8">
            <h2 className="text-3xl font-bold text-white text-center">Add New Equipment</h2>
            <p className="text-blue-100 text-center mt-2">Share your sports gear with the community</p>
          </div>

          <form onSubmit={handleAddEquipment} className="p-8 space-y-6">
            {/* Image URL & Item Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label block mb-2 text-sm font-semibold text-gray-700">
                  <span className="label-text">Image URL</span>
                </label>
                <input type="text" name="image" placeholder="https://example.com/image.jpg" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" required />
              </div>
              <div className="form-control">
                <label className="label block mb-2 text-sm font-semibold text-gray-700">
                  <span className="label-text">Item Name</span>
                </label>
                <input type="text" name="itemName" placeholder="e.g. Cricket Bat" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" required />
              </div>
            </div>

            {/* Category & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label block mb-2 text-sm font-semibold text-gray-700">
                  <span className="label-text">Category Name</span>
                </label>
                <input type="text" name="category" placeholder="e.g. Cricket, Football" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" required />
              </div>
              <div className="form-control">
                <label className="label block mb-2 text-sm font-semibold text-gray-700">
                  <span className="label-text">Price (BDT)</span>
                </label>
                <input type="text" name="price" placeholder="e.g. 5000" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" required />
              </div>
            </div>

            {/* Rating & Customization */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label block mb-2 text-sm font-semibold text-gray-700">
                  <span className="label-text">Rating (0-5)</span>
                </label>
                <input type="number" name="rating" placeholder="e.g. 4.5" step="0.1" min="0" max="5" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" required />
              </div>
              <div className="form-control">
                <label className="label block mb-2 text-sm font-semibold text-gray-700">
                  <span className="label-text">Customization</span>
                </label>
                <input type="text" name="customization" placeholder="e.g. Bat name engraving" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" />
              </div>
            </div>

            {/* Processing Time & Stock Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label block mb-2 text-sm font-semibold text-gray-700">
                  <span className="label-text">Processing Time</span>
                </label>
                <input type="text" name="processingTime" placeholder="e.g. 3-5 days" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" required />
              </div>
              <div className="form-control">
                <label className="label block mb-2 text-sm font-semibold text-gray-700">
                  <span className="label-text">Stock Status</span>
                </label>
                <input type="text" name="stockStatus" placeholder="e.g. In Stock, Made to Order" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none" required />
              </div>
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label block mb-2 text-sm font-semibold text-gray-700">
                <span className="label-text">Description</span>
              </label>
              <textarea name="description" rows="4" placeholder="Detailed description of the equipment (enter each point on a new line)" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none resize-none" required></textarea>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 hover:shadow-lg transform transition-all duration-200 active:scale-95">
                Add Equipment
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AddEquipments;