import './App.css'
import Navbar from './pages/components/NavBar'
import Slider from './pages/components/Slider'
import MostPopular from './pages/components/MostPopular'
import Newest from './pages/components/Newest'
import SampleProducts from './pages/components/SampleProducts'
import Footer from './pages/components/Footer'

function App() {

  return (
    <>
      <div>
        <Navbar/>
      </div>
      <div>
        <Slider/>
      </div>
      <div>
        <SampleProducts/>
      </div>
      <div>
        <div>
          <MostPopular/>
        </div>
        <div>
          <Newest/>
        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </>
  )
}

export default App
