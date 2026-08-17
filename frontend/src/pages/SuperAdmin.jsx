import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import client from '../api/apiClient'

export default function SuperAdmin() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [stores, setStores] = useState([])
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [stats, setStats] = useState({
    totalStores: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  })

  // Redirect if not admin
  useEffect(() => {
    if (user && user.role !== 'admin' && user.role !== 'superadmin') {
      navigate('/')
    }
  }, [user, navigate])

  // Load admin data
  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')

      // Load stores
      const storesRes = await client.get('/stores')
      setStores(storesRes.data)

      // Load all products
      const productsRes = await client.get('/products')
      setProducts(productsRes.data)

      // Try to load orders
      try {
        const ordersRes = await client.get('/orders')
        setOrders(ordersRes.data)
      } catch (err) {
        // Orders might fail if not authenticated as admin in that route
        console.log('Could not load orders')
        setOrders([])
      }

      // Calculate stats
      const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0)
      
      setStats({
        totalStores: storesRes.data.length,
        totalProducts: productsRes.data.length,
        totalOrders: orders.length,
        totalRevenue: totalRevenue
      })
    } catch (err) {
      setError('Failed to load admin data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-12 text-center">
        <p className="text-gray-600 text-lg">Loading admin dashboard...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">👨‍💼 Admin Dashboard</h1>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-lg shadow p-6">
          <div className="text-4xl font-bold">{stats.totalStores}</div>
          <p className="text-indigo-100 mt-2">Total Stores</p>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-lg shadow p-6">
          <div className="text-4xl font-bold">{stats.totalProducts}</div>
          <p className="text-green-100 mt-2">Total Products</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-purple-700 text-white rounded-lg shadow p-6">
          <div className="text-4xl font-bold">{stats.totalOrders}</div>
          <p className="text-purple-100 mt-2">Total Orders</p>
        </div>

        <div className="bg-gradient-to-br from-orange-600 to-orange-700 text-white rounded-lg shadow p-6">
          <div className="text-4xl font-bold">${stats.totalRevenue.toFixed(2)}</div>
          <p className="text-orange-100 mt-2">Total Revenue</p>
        </div>
      </div>

      {/* Stores Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">📦 All Stores ({stores.length})</h2>
        
        {stores.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Store Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tenant ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Owner</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {stores.map(store => (
                  <tr key={store._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{store.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{store.tenantId}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{store.ownerId?.name || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {store.createdAt ? new Date(store.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No stores yet</p>
          </div>
        )}
      </section>

      {/* Products Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">📊 All Products ({products.length})</h2>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map(product => (
              <div key={product._id} className="bg-white rounded-lg shadow p-4">
                <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded mb-3" />
                <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                <p className="text-gray-600 text-xs mb-2">{product.category}</p>
                <p className="text-indigo-600 font-bold">${product.price.toFixed(2)}</p>
                <p className="text-xs text-gray-500 mt-2">Store: {product.tenantId}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No products yet</p>
          </div>
        )}

        {products.length > 8 && (
          <p className="text-center text-gray-600 mt-4 text-sm">
            ...and {products.length - 8} more products
          </p>
        )}
      </section>

      {/* Orders Section */}
      <section>
        <h2 className="text-3xl font-bold mb-6">📋 Recent Orders ({orders.length})</h2>
        
        {orders.length > 0 ? (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {orders.slice(0, 10).map(order => (
                  <tr key={order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-mono">{order._id?.slice(0, 8)}...</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.customerId?.name || 'Guest'}</td>
                    <td className="px-6 py-4 font-semibold">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === 'Paid' ? 'bg-green-100 text-green-800' :
                        order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No orders yet</p>
          </div>
        )}
      </section>
    </div>
  )
}
