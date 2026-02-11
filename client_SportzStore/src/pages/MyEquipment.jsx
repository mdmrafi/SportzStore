import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import ProductCard from './components/ProductCard';
import dummyEquipment from '../assets/dummyEquipment';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/auth';

const MyEquipment = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  console.log("MyEquipment component rendered");
  
  useEffect(() => {
    console.log("Auth effect running");
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      console.log("Firebase auth state changed:", currentUser);
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  },[]);
  
  const [products, setProducts] = useState([]);
  
  useEffect(()=>{
     console.log(user,"I am here - user state:");
     
     if (!user) return; // Don't fetch if user is not logged in
     
     fetch(`http://localhost:5000/api/myequipment/${user.uid}`,{
      method:'GET'
     }).then(
      res=>res.json()
     ).then(
      (data)=>{
        setProducts(data);
        console.log(`${data.length} user fetched sucessful`)
      }
     ) 
  },[user])
  const handleDelete = (id) => {
    // Since we don't have real IDs in dummy data, we'll just alert for now
    // In a real app, we would filter by ID
    const confirm = window.confirm("Are you sure you want to delete this item?");
    if (confirm) {
      alert("Deleted successfully (Simulated)");
      // verify deletion in UI by removing last item for demo
      setProducts(products.slice(0, -1));
    }
  }
  if (loading) return <p>Loading...</p>;
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 py-12 grow">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800">My Equipment Collection</h2>
          <Link to="/addequipment" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors font-semibold shadow-md">
            + Add New
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item, index) => (
            <div key={index} className="relative group">
              <ProductCard item={{ ...item, index }} />

              {/* Overlay/Action Buttons */}
              <div className="mt-4 flex gap-4">
                <Link
                  to={`/update/${index}`}
                  className="flex-1 bg-amber-500 text-white text-center py-2 rounded-lg hover:bg-amber-600 transition-colors font-semibold shadow-sm"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(index)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors font-semibold shadow-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm">
            <p className="text-xl text-gray-500 mb-4">You haven't added any equipment yet.</p>
            <Link to="/addequipment" className="text-blue-600 hover:underline font-semibold">
              Start adding your gear
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyEquipment;