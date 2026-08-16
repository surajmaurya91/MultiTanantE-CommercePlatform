import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import VendorDashboard from './pages/VendorDashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import SuperAdmin from './pages/SuperAdmin'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/vendor" element={<VendorDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<SuperAdmin />} />
        </Routes>
      </main>
    </div>
  )
}
