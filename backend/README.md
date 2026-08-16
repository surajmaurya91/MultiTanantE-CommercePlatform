Backend (MVP) for Multi-Tenant E-Commerce

Quick start (dev):
1. cd backend
2. cp .env.example .env  (set MONGODB_URI and JWT_SECRET as needed)
3. npm install
4. npm run dev

Available endpoints (frozen contract): see frontend/API_CONTRACT.md for the summary. Main routes:
- POST /api/auth/register
- POST /api/auth/login
- GET /api/products?tenantId=
- GET /api/products/:id
- POST /api/products  (protected: vendor)
- GET /api/stores
- POST /api/stores (protected: vendor)
- POST /api/orders (protected)

Notes:
- JWT secret from .env (JWT_SECRET)
- Use tenantId to separate data across stores for the MVP
- For the 2-hour sprint, use image URL in product payload instead of file upload
