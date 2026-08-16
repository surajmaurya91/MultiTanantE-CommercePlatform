import React, { useState } from 'react'
import client, { API_BASE_URL } from '../api/apiClient'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      // Default dev: call backend if available, otherwise simulate
      if (API_BASE_URL.includes('localhost')) {
        const res = await client.post('/auth/login', { email, password })
        localStorage.setItem('token', res.data.token)
        setMessage('Logged in (backend)')
      } else {
        // Simulate
        localStorage.setItem('token', 'mock-token')
        setMessage('Logged in (mock)')
      }
    } catch (err) {
      setMessage('Login failed')
    }
  }

  return (
    <div className="container mx-auto max-w-md">
      <h2 className="text-2xl font-bold">Login</h2>
      <form onSubmit={submit} className="mt-4 bg-white p-4 rounded shadow">
        <label className="block">Email</label>
        <input className="w-full border p-2 rounded mt-1" value={email} onChange={e => setEmail(e.target.value)} />
        <label className="block mt-3">Password</label>
        <input type="password" className="w-full border p-2 rounded mt-1" value={password} onChange={e => setPassword(e.target.value)} />
        <div className="mt-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded">Login</button>
        </div>
        {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
      </form>
    </div>
  )
}
