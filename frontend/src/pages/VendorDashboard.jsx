import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import client from '../api/apiClient'

export default function VendorDashboard() {
  const navigate = useNavigate()
  const { user } = useContext(AuthContext)
  const [products, setProducts] = useState([])
  const [stores, setStores] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showAddProduct, setShowAddProduct] = useState(false)
  const [showAddStore, setShowAddStore] = useState(false)
  const [successMsg, setSuccessMsg] = useState('')

  // Form states
  const [productForm, setProductForm] = useState({
    name: '',
    category: '',
    price: '',
    image: '',
    description: ''
  })

  const [storeForm, setStoreForm] = useState({
    name: '',
    description: ''
  })

  // Redirect if not vendor
  useEffect(() => {
    if (user && user.role !== 'vendor' && user.role !== 'admin' && user.role !== 'superadmin') {
      navigate('/')
    }
  }, [user, navigate])

  // Load products and stores
  useEffect(() => {
    if (user?.tenantId) {
      loadData()
    }
  }, [user])

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')

      // Load products for this vendor
      const productsRes = await client.get(`/products?tenantId=${user.tenantId}`)
      setProducts(productsRes.data)

      // Load stores
      const storesRes = await client.get('/stores')
      const vendorStores = storesRes.data.filter(s => s.tenantId === user.tenantId)
      setStores(vendorStores)
    } catch (err) {
      setError('Failed to load data')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    try {
      setError('')
      
      if (!productForm.name || !productForm.price || !productForm.image) {
        setError('Please fill all required fields')
        return
      }

      const res = await client.post('/products', {
        ...productForm,
        price: parseFloat(productForm.price),
        tenantId: user.tenantId
      })

      setProducts([...products, res.data])
      setProductForm({ name: '', category: '', price: '', image: '', description: '' })
      setShowAddProduct(false)
      setSuccessMsg('Product added successfully!')
      
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to add product')
    }
  }

  const handleAddStore = async (e) => {
    e.preventDefault()
    try {
      setError('')
      
      if (!storeForm.name) {
        setError('Store name is required')
        return
      }

      const res = await client.post('/stores', {
        name: storeForm.name,
        tenantId: user.tenantId,
        metadata: { description: storeForm.description }
      })

      setStores([...stores, res.data])
      setStoreForm({ name: '', description: '' })
      setShowAddStore(false)
      setSuccessMsg('Store added successfully!')
      
      setTimeout(() => setSuccessMsg(''), 3000)
    } catch (err) {
      setError(err.response?.data?.msg || 'Failed to add store')
    }
  }

  const deleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await client.delete(`/products/${productId}`)
        setProducts(products.filter(p => p._id !== productId))
        setSuccessMsg('Product deleted!')
        setTimeout(() => setSuccessMsg(''), 3000)
      } catch (err) {
        setError('Failed to delete product')
      }
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto py-12 text-center">
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">🏪 Vendor Dashboard</h1>
        <div className="text-right">
          <p className="text-gray-600">Store: <span className="font-semibold">{user?.tenantId}</span></p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      {successMsg && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
          ✓ {successMsg}
        </div>
      )}

      {/* Stores Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Stores</h2>
          <button
            onClick={() => setShowAddStore(!showAddStore)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
          >
            {showAddStore ? '✕ Cancel' : '+ Add Store'}
          </button>
        </div>

        {showAddStore && (
          <form onSubmit={handleAddStore} className="bg-white rounded-lg shadow p-6 mb-6 space-y-4">
            <input
              type="text"
              placeholder="Store Name"
              value={storeForm.name}
              onChange={e => setStoreForm({ ...storeForm, name: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            />
            <textarea
              placeholder="Store Description"
              value={storeForm.description}
              onChange={e => setStoreForm({ ...storeForm, description: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded-lg"
              rows="3"
            />
            <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">
              Create Store
            </button>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stores.map(store => (
            <div key={store._id} className="bg-white rounded-lg shadow p-6">
              <h3 className="text-xl font-semibold mb-2">{store.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{store.metadata?.description}</p>
              <p className="text-xs text-gray-500">ID: {store.tenantId}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Products</h2>
          <button
            onClick={() => setShowAddProduct(!showAddProduct)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
          >
            {showAddProduct ? '✕ Cancel' : '+ Add Product'}
          </button>
        </div>

        {showAddProduct && (
          <form onSubmit={handleAddProduct} className="bg-white rounded-lg shadow p-6 mb-6 space-y-4">
            <input
              type="text"
              placeholder="Product Name *"
              value={productForm.name}
              onChange={e => setProductForm({ ...productForm, name: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            />
            <input
              type="text"
              placeholder="Category"
              value={productForm.category}
              onChange={e => setProductForm({ ...productForm, category: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded-lg"
            />
            <input
              type="number"
              placeholder="Price *"
              value={productForm.price}
              onChange={e => setProductForm({ ...productForm, price: e.target.value })}
              step="0.01"
              min="0"
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            />
            <input
              type="url"
              placeholder="Image URL *"
              value={productForm.image}
              onChange={e => setProductForm({ ...productForm, image: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded-lg"
              required
            />
            <textarea
              placeholder="Description"
              value={productForm.description}
              onChange={e => setProductForm({ ...productForm, description: e.target.value })}
              className="w-full border border-gray-300 p-3 rounded-lg"
              rows="3"
            />
            <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 w-full">
              Add Product
            </button>
          </form>
        )}

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <div key={product._id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600 text-sm">{product.category}</p>
                  <p className="text-indigo-600 font-bold text-lg mt-2">${product.price.toFixed(2)}</p>
                  <p className="text-gray-600 text-xs mt-2">{product.description}</p>
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="w-full mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-600">No products yet. Add your first product!</p>
          </div>
        )}
      </section>
    </div>
  )
}
