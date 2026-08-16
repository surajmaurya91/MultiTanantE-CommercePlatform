import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('')

  useEffect(() => {
    // Rapid dev: load mock JSON. Replace with API fetch when backend available.
    fetch('/src/mock/products.json')
      .then(r => r.json())
      .then(data => setProducts(data))
  }, [])

  const categories = Array.from(new Set(products.map(p => p.category)))
  const filtered = category ? products.filter(p => p.category === category) : products

  return (
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
      <aside className="md:col-span-1">
        <h4 className="font-semibold">Categories</h4>
        <ul className="mt-2">
          <li>
            <button onClick={() => setCategory('')} className={`text-left w-full py-1 ${category === '' ? 'font-bold' : ''}`}>All</button>
          </li>
          {categories.map(c => (
            <li key={c}>
              <button onClick={() => setCategory(c)} className={`text-left w-full py-1 ${category === c ? 'font-bold' : ''}`}>{c}</button>
            </li>
          ))}
        </ul>
      </aside>

      <section className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(p => (
          <ProductCard key={p._id} product={p} />
        ))}
      </section>
    </div>
  )
}
