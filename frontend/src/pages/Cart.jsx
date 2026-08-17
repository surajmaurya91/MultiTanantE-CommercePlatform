import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import client from '../api/apiClient'

export default function Cart() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')

  useEffect(() => {
    // Load cart from localStorage
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  const updateQty = (productId, newQty) => {
    if (newQty <= 0) {
      removeItem(productId)
    } else {
      const updated = cartItems.map(item =>
        item.productId === productId ? { ...item, qty: newQty } : item
      )
      setCartItems(updated)
      localStorage.setItem('cart', JSON.stringify(updated))
    }
  }

  const removeItem = (productId) => {
    const updated = cartItems.filter(item => item.productId !== productId)
    setCartItems(updated)
    localStorage.setItem('cart', JSON.stringify(updated))
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('cart')
  }

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0)
  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    try {
      setLoading(true)
      setError('')

      // Create order via API
      const orderItems = cartItems.map(item => ({
        productId: item.productId,
        qty: item.qty
      }))

      const res = await client.post('/orders', {
        items: orderItems,
        total: total,
        tenantId: user.tenantId || 'general',
        payment: { method: 'mock', status: 'completed' }
      })

      setSuccessMsg('Order placed successfully! 🎉')
      clearCart()
      
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">🛒 Your Cart</h1>
          <p className="text-gray-600 text-lg mb-6">Your cart is empty</p>
          <Link to="/products" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">🛒 Your Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item.productId} className="bg-white rounded-lg shadow p-6 flex gap-4">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-24 h-24 object-cover rounded"
              />
              
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600 text-lg font-bold mt-2">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex flex-col items-end gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQty(item.productId, item.qty - 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={e => updateQty(item.productId, Math.max(1, parseInt(e.target.value)))}
                    className="w-12 text-center border border-gray-300 rounded p-1"
                  />
                  <button
                    onClick={() => updateQty(item.productId, item.qty + 1)}
                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <div className="text-lg font-bold">
                  ${(item.price * item.qty).toFixed(2)}
                </div>

                <button
                  onClick={() => removeItem(item.productId)}
                  className="text-red-600 hover:text-red-700 text-sm font-semibold"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-semibold text-sm"
          >
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow p-6 h-fit sticky top-24">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

          <div className="space-y-3 mb-6 border-b pb-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tax (10%)</span>
              <span className="font-semibold">${tax.toFixed(2)}</span>
            </div>
          </div>

          <div className="flex justify-between text-xl font-bold mb-6">
            <span>Total</span>
            <span className="text-indigo-600">${total.toFixed(2)}</span>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
              {error}
            </div>
          )}

          {successMsg && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm mb-4">
              ✓ {successMsg}
            </div>
          )}

          <button
            onClick={handleCheckout}
            disabled={loading || !user}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 transition"
          >
            {loading ? 'Processing...' : '💳 Checkout'}
          </button>

          {!user && (
            <p className="text-sm text-gray-600 mt-3 text-center">
              <button
                onClick={() => navigate('/login')}
                className="text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                Sign in
              </button>
              {' '}to checkout
            </p>
          )}

          <button
            onClick={() => navigate('/products')}
            className="w-full py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 mt-3 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  )
}
