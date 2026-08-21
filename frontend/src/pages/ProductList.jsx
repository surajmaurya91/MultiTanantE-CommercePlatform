import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import client from '../api/apiClient'

// Import local images
import dressImg from "../image/dress.png";
import topImg from "../image/top.png";
import trouserImg from "../image/trouser.png";
import anarkaliImg from "../image/anarkali.png";
import tshirt1Img from "../image/tshirt1.png";
import tshirt2Img from "../image/tshirt2.png";
import cargoImg from "../image/cargo.png";
import kurtaImg from "../image/kurta.png";
import dellImg from "../image/dell.png";
import pixelImg from "../image/pixel.png";
import tableImg from "../image/tablet.png";
import headphoneImg from "../image/headphone.png";
import earbudImg from "../image/earbud.png";
import sunglass1Img from "../image/sunglass1.png";
import sunglass2Img from "../image/sunglass2.png";
import sunglass3Img from "../image/sunglass3.png";
import wallet2Img from "../image/wallet2.png";
import bag1Img from "../image/bag1.png";
import bag2Img from "../image/bag2.png";
import bag3Img from "../image/bag3.png";
import wallet1Img from "../image/wallet1.png";
import pandent1Img from "../image/pandent1.png";
import pandent2Img from "../image/pandent2.png";
import bracelet1Img from "../image/bracelet1.png";
import bracelet2Img from "../image/bracelet2.png";
import watch1Img from "../image/watch1.png";
import watch2Img from "../image/watch2.png";
import watch3Img from "../image/watch3.png";
import shoes1Img from "../image/shoes1.png";
import shoes2Img from "../image/shoes2.png";
import heel1Img from "../image/heel1.png";
import heel2Img from "../image/heel2.png";
import footwearImg from "../image/footwear.png";

export default function ProductList() {
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Local images mapping for ALL products
  const localImages = {
    // Women's
    'featured-dress-01': dressImg,
    'featured-top-02': topImg,
    'featured-trouser-03': trouserImg,
    'featured-anarkali-04': anarkaliImg,
    // Men's
    'anime-graphic-tee': tshirt1Img,
    'la-oversized-hoodie': tshirt2Img,
    'relaxed-olive-cargos': cargoImg,
    'chikan-embroidered-kurta': kurtaImg,
    // Electronics
    'dell-performance-laptop': dellImg,
    'google-pixel-smartphone': pixelImg,
    'moto-pad-70-tablet': tableImg,
    'studio-pro-headphones': headphoneImg,
    'champagne-gold-earbuds': earbudImg,
    // Sunglasses
    'classic-gold-aviator': sunglass1Img,
    'matte-black-wayfarer': sunglass2Img,
    'vintage-round-tortoise': sunglass3Img,
    // Bags
    'lavie-paris-monogram-wallet': wallet2Img,
    'cream-crossbody-handbag': bag3Img,
    'rugged-olive-canvas-duffel': bag2Img,
    'london-alley-leather-wallet': wallet1Img,
    'cute-character-kids-backpack': bag1Img,
    // Jewelry
    'celestial-silver-pendant-set': pandent1Img,
    'gold-textured-link-bracelet': bracelet2Img,
    'purple-beaded-bow-jewelry-set': bracelet1Img,
    'bullet-pendant-steel-chain': pandent2Img,
    // Watches
    'lois-caron-emerald-steel': watch1Img,
    'rose-gold-butterfly-crystal': watch3Img,
    'monogram-r-silver-quartz': watch2Img,
    // Footwear
    'patent-leather-loafer': shoes2Img,
    'strappy-stiletto-mules': heel1Img,
    'embellished-ethnic-jutti': heel2Img,
    'cushioned-runner-sneaker': shoes1Img,
    'classic-oxford-brogue': footwearImg,
  };

  // Fallback products - SHOWS IMMEDIATELY if API fails
  const fallbackProducts = [
    { _id: 'featured-dress-01', name: 'Off-Shoulder Silk Evening Gown', category: 'Dresses', price: 450, image: dressImg, description: 'Sculpted drape bodice with an asymmetric train.' },
    { _id: 'featured-top-02', name: 'Draped Mesh Wrap Top', category: 'Tops', price: 180, image: topImg, description: 'Sheer pleated overlay in rich wine hue.' },
    { _id: 'featured-trouser-03', name: 'Pleated Wide-Leg Trousers', category: 'Trousers', price: 220, image: trouserImg, description: 'High-waisted silhouette in mocha wool blend.' },
    { _id: 'featured-anarkali-04', name: 'Printed Silk Anarkali Set', category: 'Ethnic', price: 320, image: anarkaliImg, description: 'Floral block print paired with sheer dupatta.' },
    { _id: 'anime-graphic-tee', name: 'Graphic Oversized Tee', category: 'casual', price: 39, image: tshirt1Img, description: 'Cream white oversized graphic t-shirt.' },
    { _id: 'la-oversized-hoodie', name: 'LA California Green Hoodie', category: 'hoodies', price: 65, image: tshirt2Img, description: 'Premium fleece-lined forest green hoodie.' },
    { _id: 'dell-performance-laptop', name: 'Dell Performance Laptop', category: 'laptops', price: 1299, image: dellImg, description: 'AMD Ryzen 5, 120Hz FHD Display.' },
    { _id: 'classic-gold-aviator', name: 'Classic Gold Aviator', category: 'aviator', price: 149, image: sunglass1Img, description: 'Polarized metal frame aviators.' },
    { _id: 'lavie-paris-monogram-wallet', name: 'Lavie Paris Monogram Wallet', category: 'wallets', price: 48, image: wallet2Img, description: 'Elegant textured black clutch wallet.' },
    { _id: 'celestial-silver-pendant-set', name: 'Celestial Crystal Pendant Set', category: 'pendants', price: 75, image: pandent1Img, description: 'Delicate silver chains with crystal pendants.' },
    { _id: 'lois-caron-emerald-steel', name: 'Lois Caron Emerald Quartz Watch', category: 'mens', price: 119, image: watch1Img, description: 'Stainless steel bracelet with emerald dial.' },
    { _id: 'patent-leather-loafer', name: 'Classic Deep Brown Patent Loafers', category: 'formal', price: 129, image: shoes2Img, description: 'Polished patent leather slip-on loafers.' },
  ];

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true)
        setError('')
        
        console.log('🔄 Fetching products from API...')
        const res = await client.get('/products')
        console.log('✅ Products fetched:', res.data.length)
        
        // Map local images to products
        const mappedProducts = res.data.map(product => ({
          ...product,
          image: localImages[product._id] || product.image || 'https://via.placeholder.com/300x400?text=Product'
        }))
        
        setProducts(mappedProducts)
      } catch (err) {
        console.error('❌ API Error:', err.message)
        setError('Could not connect to database. Showing sample products.')
        // Use fallback products immediately
        setProducts(fallbackProducts)
      } finally {
        setLoading(false)
      }
    }

    loadProducts()
  }, [])

  const categories = Array.from(new Set(products.map(p => p.category)))
  const filtered = category ? products.filter(p => p.category === category) : products

  const getImage = (product) => {
    if (product._id && localImages[product._id]) return localImages[product._id]
    return product.image || 'https://via.placeholder.com/300x400?text=Product'
  }

  // Show loading only for a moment, then fallback
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-amber-800 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-amber-800 mt-2">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-2xl font-light text-amber-950 mb-6">Browse Products</h1>
        
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-2 rounded-lg text-sm mb-4">
            ⚠️ {error}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-4 sticky top-20">
              <h4 className="font-light text-amber-950 text-sm mb-3">Categories</h4>
              <ul className="space-y-1">
                <li>
                  <button 
                    onClick={() => setCategory('')}
                    className={`text-left w-full py-1.5 px-3 rounded-lg text-sm transition ${
                      category === '' 
                        ? 'bg-amber-900 text-white' 
                        : 'text-slate-600 hover:bg-stone-100'
                    }`}
                  >
                    All Categories
                  </button>
                </li>
                {categories.map(c => (
                  <li key={c}>
                    <button 
                      onClick={() => setCategory(c)}
                      className={`text-left w-full py-1.5 px-3 rounded-lg text-sm transition ${
                        category === c 
                          ? 'bg-amber-900 text-white' 
                          : 'text-slate-600 hover:bg-stone-100'
                      }`}
                    >
                      {c}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Products Grid */}
          <section className="md:col-span-3">
            <p className="text-slate-400 text-sm mb-4">
              Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
              {error && ' (using sample data)'}
            </p>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((product) => (
                  <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                  >
                    <div className="relative bg-stone-100 h-64 overflow-hidden">
                      <img 
                        src={getImage(product)}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x400?text=Product'
                        }}
                      />
                      <span className="absolute top-2 right-2 bg-stone-900/80 text-white text-[8px] uppercase px-2 py-0.5 rounded">
                        {product.category || 'New'}
                      </span>
                    </div>
                    <div className="p-3">
                      <h3 className="font-light text-amber-950 text-sm truncate">
                        {product.name}
                      </h3>
                      <p className="text-slate-400 text-xs truncate mt-0.5">
                        {product.description || ''}
                      </p>
                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-stone-100">
                        <span className="text-sm font-medium text-amber-800">
                          ${product.price?.toFixed(2)}
                        </span>
                        <span className="text-[10px] text-amber-800/60 group-hover:text-amber-800 transition">
                          View →
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl">
                <p className="text-slate-400">No products found in this category</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}