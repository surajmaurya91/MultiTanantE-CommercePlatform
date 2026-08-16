import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="container mx-auto">
      <header className="py-8">
        <h1 className="text-3xl font-bold">Welcome to MultiStore (MVP)</h1>
        <p className="mt-2 text-gray-600">Select a store or browse products.</p>
        <div className="mt-4 flex gap-3">
          <Link to="/products" className="px-4 py-2 bg-indigo-600 text-white rounded">Browse Products</Link>
          <Link to="/vendor" className="px-4 py-2 bg-gray-200 rounded">Vendor Portal</Link>
        </div>
      </header>
    </div>
  )
}
