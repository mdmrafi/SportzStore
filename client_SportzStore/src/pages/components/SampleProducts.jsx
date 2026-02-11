import ProductCard from './ProductCard';

const SampleProducts = ({products}) => {
  return (
    <div className='container mx-auto px-4 py-12'>
      <div className='text-center mb-10'>
        <h2 className='text-4xl font-bold text-gray-800 mb-3'>Our Products</h2>
        <p className='text-gray-600 text-lg'>Discover premium sports equipment for every athlete</p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {
          products.map((item, index)=>{
            return(
              <div key={index}>
                <ProductCard item={item}/>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default SampleProducts;