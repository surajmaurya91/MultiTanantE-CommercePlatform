import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <Link to="/" className="font-bold text-xl text-indigo-600">🏪 MultiStore</Link>
          <Link to="/products" className="text-gray-700 hover:text-indigo-600 font-medium">Products</Link>
          <Link to="/about" className="text-gray-700 hover:text-indigo-600 font-medium">About</Link>
          <Link to="/electronics" className="text-gray-700 hover:text-indigo-600 font-medium">Electronics</Link>
        </div>
        
        <div className="flex items-center gap-4">
          <Link to="/cart" className="text-gray-700 hover:text-indigo-600 font-medium">🛒 Cart</Link>

          {user ? (
            <>
              {user.role === 'vendor' && (
                <Link to="/vendor" className="text-gray-700 hover:text-indigo-600 font-medium">Vendor Dashboard</Link>
              )}
              {(user.role === 'admin' || user.role === 'superadmin') && (
                <Link to="/admin" className="text-gray-700 hover:text-indigo-600 font-medium">Admin</Link>
              )}
              
              <div className="flex items-center gap-3 pl-4 border-l">
                <span className="text-sm text-gray-600">{user.name}</span>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">{user.role}</span>
                <button 
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">Login</Link>
              <Link to="/register" className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 font-medium">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
