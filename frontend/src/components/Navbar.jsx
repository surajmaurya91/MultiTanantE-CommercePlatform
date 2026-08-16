import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  // Simple role-based nav placeholder. Frontend leads can wire actual role from auth state.
  return (
    <nav className="bg-white shadow">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold text-lg">MultiStore</Link>
          <Link to="/products" className="text-sm text-gray-600">Products</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/cart" className="text-sm text-gray-600">Cart</Link>
          <Link to="/vendor" className="text-sm text-gray-600">Vendor</Link>
          <Link to="/admin" className="text-sm text-gray-600">Admin</Link>
          <Link to="/login" className="text-sm text-indigo-600">Login</Link>
        </div>
      </div>
    </nav>
  )
}
