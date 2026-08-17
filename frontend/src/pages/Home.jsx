import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import client from '../api/apiClient'

export default function Home() {
  const [products, setProducts] = useState([])
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        // Try to fetch from backend, fallback to mock
        try {
          const productsRes = await client.get('/products')
          setProducts(productsRes.data.slice(0, 6)) // Show first 6 products
        } catch (err) {
          // Fallback to mock data
          const mockRes = await fetch('/src/mock/products.json')
          const mockData = await mockRes.json()
          setProducts(mockData.slice(0, 6))
        }

        try {
          const storesRes = await client.get('/stores')
          setStores(storesRes.data.slice(0, 3))
        } catch (err) {
          // Fallback empty stores
          setStores([])
        }
      } catch (err) {
        console.error('Error loading home data:', err)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  return (
    <div className="container mx-auto">
      {/* Hero Section */}
      <section className="py-12 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg mb-12">
        <div className="px-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to MultiStore 🛍️</h1>
          <p className="text-lg mb-6 opacity-90">Shop from multiple vendors in one place. Secure, Fast, Reliable.</p>
          <div className="flex gap-3">
            <Link to="/products" className="px-6 py-3 bg-white text-indigo-600 rounded font-semibold hover:bg-gray-100">
              Browse Products
            </Link>
            <Link to="/register" className="px-6 py-3 bg-indigo-700 text-white rounded font-semibold hover:bg-indigo-800">
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Stores Section */}
      {stores.length > 0 && (
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Featured Stores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stores.map(store => (
              <div key={store._id} className="border rounded-lg p-6 bg-white shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">{store.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{store.metadata?.description || 'Premium products'}</p>
                <Link to="/products" className="text-indigo-600 hover:text-indigo-700 font-medium">
                  Visit Store →
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6">Featured Products</h2>
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No products available yet</p>
            <Link to="/vendor" className="text-indigo-600 hover:text-indigo-700">
              Become a vendor and add products →
            </Link>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="mt-12 py-12 bg-gray-50 rounded-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Want to Sell?</h2>
        <p className="text-gray-600 mb-6">Join as a vendor and reach thousands of customers</p>
        <Link to="/register" className="px-6 py-3 bg-indigo-600 text-white rounded font-semibold hover:bg-indigo-700">
          Become a Vendor
        </Link>
      </section>
    </div>
  )
}
