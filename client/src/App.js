import './App.css';
import Navbar from './components/header/navbar';
import Newnav from './components/newnavbar/Newnav';
import Maincomp from './components/Home/Maincomp';
import Footer from './components/footer/Footer';
import Sign_in from './components/signup_sign/Sign_in';
import SignUp from './components/signup_sign/SignUp';
import Cart from './components/cart/Cart';
import { Routes, Route } from 'react-router-dom';
import Buynow from './components/buynow/Buynow';
import CircularProgress from '@mui/material/CircularProgress';
import { useState,useEffect } from 'react';


function App() {
const [data,setData] = useState(false)

useEffect(() => {
  setTimeout(() => {
    setData(true);
  }, 2000);
}, [])

  return (
   <>
   {
    data ? (
      <>
      <Navbar />
      <Newnav />
      <Routes>
        <Route path='/' element={<Maincomp />} />
        <Route path='/login' element={<Sign_in />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/getproductsone/:id' element={<Cart />} />
        <Route path='/buynow' element={<Buynow />} />
      </Routes>
      <Footer />
      </>
    ):(
      <div className='circle'>
      <CircularProgress />
      <h2>Loading..</h2>
      </div>
    )
   }
      
    </>
  );
}
export default App;
