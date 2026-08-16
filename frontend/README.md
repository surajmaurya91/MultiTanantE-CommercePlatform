Multi-Tenant E-Commerce Frontend (MVP)

Quick start for the 2-hour sprint — scaffold for frontend team members to work in parallel.

Prereqs:
- Node 18+ and npm installed

Install & run:
1. cd frontend
2. npm install
3. npm run dev

What is included:
- Vite + React + Tailwind scaffold
- Routing (React Router) with placeholder pages:
  - / => Home
  - /products => Product Listing (PLP) with category filter
  - /products/:id => Product Details (PDP)
  - /cart => Cart placeholder
  - /vendor => Vendor Dashboard placeholder
  - /login, /register => Auth placeholders
  - /admin => Super Admin placeholder
- src/mock/products.json — mock data to start building components without the backend.
- API client (src/api/apiClient.js) that points at http://localhost:4000/api by default. Change API_BASE_URL or set process.env.API_BASE_URL when backend is ready.
- API_CONTRACT.md — frozen minimal contract for the team to integrate with backend routes.

Who works on what (map to your team plan):
- Member 2: Storefront & Navigation -> src/components/Navbar.jsx, Home.jsx, ProductList.jsx
- Member 3: Product Details & Cart -> ProductDetails.jsx, Cart.jsx (Redux slice should be added in src/store by Member 3)
- Member 4: Vendor Dashboard -> VendorDashboard.jsx
- Member 5: Auth & Super Admin -> Login.jsx, Register.jsx, SuperAdmin.jsx
- Member 1 (Backend): implement endpoints matching API_CONTRACT.md

Notes / Handoff:
- Frontend uses mock data by default (fetching /src/mock/products.json). When backend is up, replace mock fetch with axios calls to apiClient.
- For protected vendor routes, set localStorage.setItem('token', '<jwt>') after login. apiClient attaches it automatically.

Development tips for a 2-hour sprint:
- Use component-level state and mock json for fast development. Integrate Redux slice only for Cart (Member 3).
- Image uploads: use Image URL input in vendor form to keep it fast.
- Simulate checkout success in frontend and POST to /orders with { orderStatus: 'Paid' } once backend accepts it.

Happy sprinting! 
