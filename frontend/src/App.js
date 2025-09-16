import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Home from './components/proveedor/Home';
import EditProveedor from './components/proveedor/EditProveedor';
import AddProveedor from './components/proveedor/AddProveedor';
import HomeProduct from './components/product/HomeProduct';
import EditProduct from './components/product/EditProduct';
import AddProduct from './components/product/AddProduct';


const App = () => {
  return (
    <>
      <blockquote className="text-2xl font-semibold italic text-center text-blue-500 my-10">
        <span className="mx-2 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-400 relative inline-block">
          <span className="relative text-white"> CRUD App </span>
        </span>
        with React Hooks
      </blockquote>
      
      {/* Navegación entre secciones */}
      <nav className="flex justify-center space-x-4 mb-8">
        <Link 
          to="/" 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Proveedor
        </Link>
        <Link 
          to="/products" 
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Products
        </Link>
      </nav>

      <Routes>
        {/* Rutas para Users */}
        <Route path='/' element={<Home />} />
        <Route path='/edit/:id' element={<EditProveedor />} />
        <Route path='/create' element={<AddProveedor />} />
        
        {/* Rutas para Products */}
        <Route path='/products' element={<HomeProduct />} />
        <Route path='/products/edit/:id' element={<EditProduct />} />
        <Route path='/products/create' element={<AddProduct />} />
      </Routes>
    </>
  );
}

export default App;