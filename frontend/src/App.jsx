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
import WomenFashionPage from './pages/WomenFashionPage';
import MenFashionPage from './pages/MenFashionPage';
import About from "./pages/About";
import Electronics from './pages/Electronics';
import SunglassesPage from './pages/SunglassesPage';
import BagsPage from './pages/BagsPage';
import JewelryPage from './pages/JewelryPage';
import WatchesPage from './pages/WatchesPage';
import FootwearPage from './pages/FootwearPage';

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/vendor" element={<VendorDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<SuperAdmin />} />
          <Route path="/WomenFashionPage" element={<WomenFashionPage />} />
          <Route path="/MenFashionPage" element={<MenFashionPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/SunglassesPage" element={<SunglassesPage />} />
          <Route path="/BagsPage" element={<BagsPage />} />
          <Route path="/JewelryPage" element={<JewelryPage />} />
          <Route path="/WatchesPage" element={<WatchesPage />} />
          <Route path="/FootwearPage" element={<FootwearPage />} />
        </Routes>
      </main>
    </div>
  )
}
