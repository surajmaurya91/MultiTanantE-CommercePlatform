import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import client from '../api/apiClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await client.post('/auth/login', { email, password })
      const { user, token } = res.data
      login(user, token)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed. Please check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  // Demo credentials
  const demoLogin = (email, password) => {
    setEmail(email)
    setPassword(password)
  }

  return (
    <div className="container mx-auto max-w-md py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-2">Login</h2>
        <p className="text-gray-600 mb-6">Sign in to your account</p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6">
          <p className="text-gray-600 text-sm text-center mb-4">Don't have an account? <Link to="/register" className="text-indigo-600 hover:text-indigo-700 font-semibold">Register</Link></p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 pt-6 border-t">
          <p className="text-xs text-gray-500 mb-3 font-semibold">Demo Credentials:</p>
          <div className="space-y-2">
            <button
              type="button"
              onClick={() => demoLogin('admin@multitenant.com', 'admin123')}
              className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 text-gray-700"
            >
              <span className="font-medium">Admin:</span> admin@multitenant.com
            </button>
            <button
              type="button"
              onClick={() => demoLogin('vendor1@store.com', 'vendor123')}
              className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 text-gray-700"
            >
              <span className="font-medium">Vendor:</span> vendor1@store.com
            </button>
            <button
              type="button"
              onClick={() => demoLogin('customer@example.com', 'customer123')}
              className="w-full text-left px-3 py-2 text-sm bg-gray-50 hover:bg-gray-100 rounded border border-gray-200 text-gray-700"
            >
              <span className="font-medium">Customer:</span> customer@example.com
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
