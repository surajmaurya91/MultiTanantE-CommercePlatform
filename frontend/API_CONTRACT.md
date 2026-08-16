# API Contract (MVP) - quick reference

This file freezes the minimal API contract for frontend <-> backend integration during the 2-hour sprint.

Base URL: http://localhost:4000/api  (backend may run on port 4000)

1) Auth
- POST /auth/register
  Request: { name, email, password, role (customer|vendor|admin), tenantId? }
  Response: 201 { user: { _id, name, email, role, tenantId? }, token: "<jwt>" }

- POST /auth/login
  Request: { email, password }
  Response: 200 { user: { _id, name, email, role, tenantId? }, token: "<jwt>" }

2) Products
- GET /products?tenantId=<tenantId>
  Response: 200 [ { _id, name, category, price, image, description, tenantId } ]

- POST /products  (protected: vendor)
  Request: { name, category, price, image (url), description, tenantId }
  Response: 201 { product }

- GET /products/:id
  Response: 200 { product }

3) Stores/Tenants
- GET /stores
  Response: 200 [ { _id, name, ownerId, metadata... } ]

- POST /stores (protected: vendor)
  Request: { name, tenantId, ownerId }
  Response: 201 { store }

4) Orders / Checkout (MVP simplified)
- POST /orders
  Request: { items: [{ productId, qty }], total, customerId, tenantId, payment: { method: "mock" } }
  Response: 201 { order: { _id, status: "Paid" } }

Notes:
- Protected routes accept header: Authorization: Bearer <token>
- Auth returns token and user object; store token in localStorage as 'token'

Frontend behavior:
- Start with mock JSON (/src/mock/products.json) until backend endpoints are live.
- When backend is available, update API_BASE_URL in src/api/apiClient.js or set env var API_BASE_URL.
