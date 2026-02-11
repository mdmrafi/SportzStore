import './App.css'
import Navbar from './pages/components/NavBar'
import Slider from './pages/components/Slider'
import MostPopular from './pages/components/MostPopular'
import Newest from './pages/components/Newest'
import SampleProducts from './pages/components/SampleProducts'
import Footer from './pages/components/Footer'
import { useState, useEffect } from 'react'
import dummyEquipment from './assets/dummyEquipment'

function App() {
  const [popularProduct, setPopularProduct] = useState(null);
  const [products] = useState(dummyEquipment);
  const [newestItem,setNewest] = useState(null);
  
  useEffect(() => {
    const findNewest = () =>{
      let newest = products[0];
      let latestAdded = new Date(products[0]?.dateAdded || 0)
      for(let item of products){
        const itemDate = new Date(item.dateAdded);
        if(itemDate > latestAdded){
          newest = item;
          latestAdded = itemDate;
        }
      }
      setNewest(newest);
    }
    
    const mostPopular = () => {
      let max = products[0];
      let max_rating = products[0]?.rating || 0;
      
      for(let item of products) {
        if(item.rating > max_rating) {
          max_rating = item.rating;
          max = item;
        }
      }
      setPopularProduct(max);
    }
    
    mostPopular();
    findNewest();
  }, [products]);

  return (
    <div className='min-h-screen bg-gray-50'>
      <Navbar/>
      
      <div className='mb-8'>
        <Slider/>
      </div>
      
      <SampleProducts products={products}/>
      
      <div className='container mx-auto px-4 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <MostPopular item={popularProduct}/>
          <Newest item={newestItem}/>
        </div>
      </div>
      
      <Footer/>
    </div>
  )
}

export default App