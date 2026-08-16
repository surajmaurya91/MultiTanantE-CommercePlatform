import React from 'react'

export default function SuperAdmin() {
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold">Super Admin</h2>
      <p className="mt-2 text-gray-600">List of Tenants/Vendors and simple revenue summary.
        Implement listing via /api/stores and /api/vendors when backend is ready.
      </p>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">Tenants list placeholder</div>
        <div className="p-4 bg-white rounded shadow">Revenue summary placeholder</div>
      </div>
    </div>
  )
}
