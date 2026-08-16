import React from 'react'
import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  return (
    <div className="border rounded p-3 bg-white">
      <img src={product.image} alt={product.name} className="h-40 w-full object-cover mb-2" />
      <h3 className="font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-600">{product.category}</p>
      <div className="mt-2 flex justify-between items-center">
        <div className="font-bold">${product.price}</div>
        <Link to={`/products/${product._id}`} className="text-indigo-600 text-sm">View</Link>
      </div>
    </div>
  )
}
