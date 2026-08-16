import React, { useState } from 'react'
import client from '../api/apiClient'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('customer')
  const [message, setMessage] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      // Backend call if available, otherwise simulate
      await client.post('/auth/register', { name, email, password, role })
      setMessage('Registered (check backend or mock)')
    } catch (err) {
      setMessage('Registration failed or backend not available')
    }
  }

  return (
    <div className="container mx-auto max-w-md">
      <h2 className="text-2xl font-bold">Register</h2>
      <form onSubmit={submit} className="mt-4 bg-white p-4 rounded shadow">
        <label className="block">Name</label>
        <input className="w-full border p-2 rounded mt-1" value={name} onChange={e => setName(e.target.value)} />
        <label className="block mt-3">Email</label>
        <input className="w-full border p-2 rounded mt-1" value={email} onChange={e => setEmail(e.target.value)} />
        <label className="block mt-3">Password</label>
        <input type="password" className="w-full border p-2 rounded mt-1" value={password} onChange={e => setPassword(e.target.value)} />
        <label className="block mt-3">Role</label>
        <select value={role} onChange={e => setRole(e.target.value)} className="w-full border p-2 rounded">
          <option value="customer">Customer</option>
          <option value="vendor">Vendor</option>
        </select>
        <div className="mt-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded">Register</button>
        </div>
        {message && <p className="mt-2 text-sm text-green-600">{message}</p>}
      </form>
    </div>
  )
}
