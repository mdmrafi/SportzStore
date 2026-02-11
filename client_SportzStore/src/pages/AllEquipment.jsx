import React, { useState } from 'react';
import ProductCard from './components/ProductCard';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import { useEffect } from 'react';

const AllEquipment = () => {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState('default');
  useEffect(()=>{
    fetch('http://localhost:5000/api/allequipments',{
      method:'GET'
    }).then(res=>res.json())
    .then((data)=>{
      setProducts(data);
      console.log("Product fetching successful")
    })
  },[])

  const handleSort = (e) => {
    const value = e.target.value;
    setSortOrder(value);

    let sortedProducts = [...products];
    if (value === 'price-asc') {
      sortedProducts.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    } else if (value === 'price-desc') {
      sortedProducts.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    } else {
      setProducts(products);
      return;
    }
    setProducts(sortedProducts);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-8 grow">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">All Equipment</h1>
          <div className="flex items-center space-x-2">
            <label htmlFor="sort" className="text-gray-700 font-medium">Sort by:</label>
            <select
              id="sort"
              value={sortOrder}
              onChange={handleSort}
              className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="default">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((item, index) => (
            <ProductCard key={index} item={{ ...item, index }} />
          ))}
        </div>

        {products.length === 0 && (
          <div className='text-center py-20'>
            <p className='text-xl text-gray-500'>No equipment found.</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default AllEquipment;