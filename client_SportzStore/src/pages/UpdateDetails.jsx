import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import dummyEquipment from '../assets/dummyEquipment';

const UpdateDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [existingData, setExistingData] = useState(null);

  useEffect(() => {
    const data = dummyEquipment()[id];
    if (data) {
      setExistingData(data);
    }
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;
    const image = form.image.value;
    const itemName = form.itemName.value;
    const category = form.category.value;
    const description = form.description.value;
    const price = form.price.value;
    const rating = form.rating.value;
    const customization = form.customization.value;
    const processingTime = form.processingTime.value;
    const stockStatus = form.stockStatus.value;

    const updatedEquipment = {
      image,
      product_name: itemName,
      category,
      description: description.split('\n'),
      price,
      rating,
      customization,
      processingTime,
      stock_status: stockStatus
    };

    console.log("Updated Data:", updatedEquipment);
    alert('Equipment Updated Successfully (Console Logged)');
    navigate('/myequipment');
  }

  if (!existingData) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className='bg-gray-50 min-h-screen'>
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-amber-500 py-6 px-8">
            <h2 className="text-3xl font-bold text-white text-center">Update Equipment</h2>
            <p className="text-amber-100 text-center mt-2">Edit your equipment details</p>
          </div>

          <form onSubmit={handleUpdate} className="p-8 space-y-6">
            {/* Image URL & Item Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label block mb-2 text-sm font-semibold text-gray-700">
                  <span className="label-text">Image URL</span>
                </label>
                <input type="text" name="image" defaultValue={existingData.image} placeholder="https://example.com/image.jpg" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none" required />
              </div>
              <div className="form-control">
                <label className="label block mb-2 text-sm font-semibold text-gray-700">
                  <span className="label-text">Item Name</span>
                </label>
                <input type="text" name="itemName" defaultValue={existingData.product_name} placeholder="e.g. Cricket Bat" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none" required />
              </div>
            </div>

            {/* Category & Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label block mb-2 text-sm font-semibold text-gray-700">
                  <span className="label-text">Category Name</span>
                </label>
                <input type="text" name="category" defaultValue={existingData.category} placeholder="e.g. Cricket, Football" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none" required />
              </div>
              <div className="form-control">
                <label className="label block mb-2 text-sm font-semibold text-gray-700">
                  <span className="label-text">Price (BDT)</span>
                </label>
                <input type="text" name="price" defaultValue={existingData.price} placeholder="e.g. 5000" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none" required />
              </div>
            </div>

            {/* Rating & Customization */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label block mb-2 text-sm font-semibold text-gray-700">
                  <span className="label-text">Rating (0-5)</span>
                </label>
                <input type="number" name="rating" defaultValue={existingData.rating} placeholder="e.g. 4.5" step="0.1" min="0" max="5" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none" required />
              </div>
              <div className="form-control">
                <label className="label block mb-2 text-sm font-semibold text-gray-700">
                  <span className="label-text">Customization</span>
                </label>
                <input type="text" name="customization" defaultValue={existingData.customization} placeholder="e.g. Bat name engraving" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none" />
              </div>
            </div>

            {/* Processing Time & Stock Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="form-control">
                <label className="label block mb-2 text-sm font-semibold text-gray-700">
                  <span className="label-text">Processing Time</span>
                </label>
                <input type="text" name="processingTime" defaultValue={existingData.processingTime || '3-5 days'} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none" required />
              </div>
              <div className="form-control">
                <label className="label block mb-2 text-sm font-semibold text-gray-700">
                  <span className="label-text">Stock Status</span>
                </label>
                <input type="text" name="stockStatus" defaultValue={existingData.stock_status} placeholder="e.g. In Stock, Made to Order" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none" required />
              </div>
            </div>

            {/* Description */}
            <div className="form-control">
              <label className="label block mb-2 text-sm font-semibold text-gray-700">
                <span className="label-text">Description</span>
              </label>
              <textarea
                name="description"
                rows="4"
                defaultValue={Array.isArray(existingData.description) ? existingData.description.join('\n') : existingData.description}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all outline-none resize-none"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button className="w-full bg-amber-500 text-white font-bold py-4 rounded-lg hover:bg-amber-600 hover:shadow-lg transform transition-all duration-200 active:scale-95">
                Update Equipment
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateDetails;