import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function ProductDetails() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => {
    fetch('/src/mock/products.json')
      .then(r => r.json())
      .then(list => setProduct(list.find(p => p._id === id)))
  }, [id])

  if (!product) return <div>Loading...</div>

  return (
    <div className="container mx-auto grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1">
        <img src={product.image} alt={product.name} className="w-full object-cover" />
      </div>
      <div className="md:col-span-2">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <div className="mt-4">
          <div className="font-bold text-xl">${product.price}</div>
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded">Add to Cart (mock)</button>
        </div>
      </div>
    </div>
  )
}
