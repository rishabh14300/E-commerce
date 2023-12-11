import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Navbar from './components/Navbar';
import Ending from './components/Ending';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShopContextProvider from './context/ShopContext';
import ShopCategory from './pages/ShopCategory';
import men_banner from './components/Assets/banner_mens.png';
import women_banner from './components/Assets/banner_women.png';
import kid_banner from './components/Assets/banner_kids.png';
import ItemDetail from './pages/ItemDetail';
import Cart from './pages/Cart';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
  <ShopContextProvider>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
        <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
        <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
        <Route path='/product'element={<ItemDetail />}>
          <Route path=':productId' element={<ItemDetail />}></Route>
        </Route>
        <Route path='/cart' element={<Cart />} />
        <Route path="/login" Component={Login} />
        <Route path="/signup" Component={Signup} />
        <Route path='/success' Component={Success} />
        <Route path='/cancel' Component={Cancel} />
      </Routes>
      <Ending />
    </BrowserRouter>
    </ShopContextProvider>
    
   

  </React.StrictMode>
);


