import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import client from '../api/apiClient'

export default function ProductDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [product, setProduct] = useState(null)
  const [qty, setQty] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [addingToCart, setAddingToCart] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true)
        setError('')
        
        try {
          // Try backend first
          const res = await client.get(`/products/${id}`)
          setProduct(res.data)
        } catch (err) {
          // Fallback to mock
          const mockRes = await fetch('/src/mock/products.json')
          const list = await mockRes.json()
          const found = list.find(p => p._id === id)
          if (!found) throw new Error('Product not found')
          setProduct(found)
        }
      } catch (err) {
        console.error('Error loading product:', err)
        setError('Product not found')
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

  const handleAddToCart = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    try {
      setAddingToCart(true)
      setError('')

      // Get cart from localStorage
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      
      // Check if product already in cart
      const existingItem = cart.find(item => item.productId === product._id)
      if (existingItem) {
        existingItem.qty += qty
      } else {
        cart.push({
          productId: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty
        })
      }

      localStorage.setItem('cart', JSON.stringify(cart))
      setSuccessMsg(`Added ${qty} ${product.name}(s) to cart!`)
      setQty(1)
      
      setTimeout(() => {
        setSuccessMsg('')
      }, 3000)
    } catch (err) {
      setError('Failed to add to cart')
    } finally {
      setAddingToCart(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-12 text-center">
        <p className="text-gray-600 text-lg">Loading product...</p>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="container mx-auto py-12 text-center">
        <p className="text-red-600 text-lg mb-4">{error || 'Product not found'}</p>
        <button 
          onClick={() => navigate('/products')}
          className="text-indigo-600 hover:text-indigo-700 font-semibold"
        >
          ← Back to Products
        </button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <button 
        onClick={() => navigate('/products')}
        className="text-indigo-600 hover:text-indigo-700 font-semibold mb-6"
      >
        ← Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-sm text-indigo-600 font-semibold">{product.category}</span>
            <h1 className="text-4xl font-bold mt-2">{product.name}</h1>
            
            <div className="mt-6">
              <div className="text-4xl font-bold text-indigo-600">${product.price.toFixed(2)}</div>
            </div>

            <p className="text-gray-600 text-lg mt-6 leading-relaxed">
              {product.description}
            </p>

            {product.metadata && (
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Store ID:</strong> {product.tenantId}
                </p>
              </div>
            )}
          </div>

          {/* Add to Cart Section */}
          <div className="mt-8 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {successMsg && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                ✓ {successMsg}
              </div>
            )}

            <div className="flex items-center gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <input 
                  type="number"
                  min="1"
                  max="100"
                  value={qty}
                  onChange={e => setQty(Math.max(1, parseInt(e.target.value)))}
                  className="w-20 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
                />
              </div>
              <div>
                <button 
                  onClick={handleAddToCart}
                  disabled={addingToCart || !user}
                  className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 transition"
                >
                  {addingToCart ? 'Adding...' : '🛒 Add to Cart'}
                </button>
              </div>
            </div>

            {!user && (
              <p className="text-sm text-gray-600">
                <button 
                  onClick={() => navigate('/login')}
                  className="text-indigo-600 hover:text-indigo-700 font-semibold"
                >
                  Sign in
                </button>
                {' '}to add items to cart
              </p>
            )}

            <button 
              onClick={() => navigate('/cart')}
              className="w-full px-6 py-3 border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition"
            >
              🛍️ View Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
