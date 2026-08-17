import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import client from '../api/apiClient'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        setError('')
        
        try {
          // Try to fetch from backend first
          const res = await client.get('/products')
          setProducts(res.data)
        } catch (err) {
          // Fallback to mock data
          console.log('Backend not available, using mock data')
          const mockRes = await fetch('/src/mock/products.json')
          if (!mockRes.ok) throw new Error('Mock data not found')
          const mockData = await mockRes.json()
          setProducts(mockData)
        }
      } catch (err) {
        console.error('Error loading products:', err)
        setError('Failed to load products. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const categories = Array.from(new Set(products.map(p => p.category)))
  const filtered = category ? products.filter(p => p.category === category) : products

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Browse Products</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar - Categories */}
        <aside className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-20">
            <h4 className="font-bold text-lg mb-4">Categories</h4>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setCategory('')}
                  className={`text-left w-full py-2 px-3 rounded transition ${
                    category === '' 
                      ? 'bg-indigo-600 text-white font-semibold' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  All Categories
                </button>
              </li>
              {categories.map(c => (
                <li key={c}>
                  <button 
                    onClick={() => setCategory(c)}
                    className={`text-left w-full py-2 px-3 rounded transition ${
                      category === c 
                        ? 'bg-indigo-600 text-white font-semibold' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {c}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Products Grid */}
        <section className="md:col-span-3">
          {error && (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">Loading products...</p>
            </div>
          ) : filtered.length > 0 ? (
            <>
              <p className="text-gray-600 mb-6">Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map(p => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">No products found in this category.</p>
              <button 
                onClick={() => setCategory('')}
                className="text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                View all products
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
