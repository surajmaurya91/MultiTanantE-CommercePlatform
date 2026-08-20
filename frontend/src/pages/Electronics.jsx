import React, { useState } from "react";
import { Link } from "react-router-dom";

// Image Imports matching your provided paths
import pic8 from "../image/pic8.png";
import tableImg from "../image/tablet.png";
import dellImg from "../image/dell.png";
import earbudImg from "../image/earbud.png";
import headphoneImg from "../image/headphone.png";
import pixelImg from "../image/pixel.png";

const Electronics = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Electronics Categories
  const categories = [
    { id: "all", name: "All", icon: "✨" },
    { id: "audio", name: "Audio", icon: "🎧" },
    { id: "phones", name: "Smartphones", icon: "📱" },
    { id: "laptops", name: "Laptops & Tabs", icon: "💻" },
  ];

  // Electronics Products with real image mappings
  const products = [
    {
      id: "dell-performance-laptop",
      name: "Dell Performance Laptop",
      category: "laptops",
      price: "$1,299",
      image: dellImg,
      badge: "Best Seller",
      description: "AMD Ryzen 5, 120Hz 15.6\" FHD Display & Radeon Graphics",
    },
    {
      id: "google-pixel-smartphone",
      name: "Google Pixel Smartphone",
      category: "phones",
      price: "$899",
      image: pixelImg,
      badge: "Flagship",
      description: "Advanced camera system with AI performance",
    },
    {
      id: "moto-pad-70-tablet",
      name: "Moto Pad 70 5G Tablet",
      category: "laptops",
      price: "$499",
      image: tableImg,
      badge: "New Arrival",
      description: "12.1\" 2.5K Ultra Immersive Display with Moto Pen",
    },
    {
      id: "studio-pro-headphones",
      name: "Studio Wireless Headphones",
      category: "audio",
      price: "$349",
      image: headphoneImg,
      badge: "Top Rated",
      description: "Over-ear noise-canceling acoustics in forest green",
    },
    {
      id: "champagne-gold-earbuds",
      name: "Techio Gold Earbuds",
      category: "audio",
      price: "$199",
      image: earbudImg,
      badge: "Limited Edition",
      description: "Premium metallic finish with crystal clear audio",
    },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      {/* Hero Banner */}
      <section 
      className="relative text-white py-20 overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${pic8})` }}
    >
      {/* Dark Overlay to make text pop over the background image */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-[2px]" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      {/* Glow Blur Effect */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]" />

      <div className="relative container mx-auto px-6 max-w-7xl text-center z-10">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight leading-[1.1]">
          Premium <br />
          <span className="font-serif italic bg-gradient-to-r from-blue-300 via-white to-blue-300 bg-clip-text text-transparent">
            Technology
          </span>
        </h1>
        <p className="text-slate-300 font-light text-base sm:text-lg max-w-2xl mx-auto mt-4">
          Where cutting-edge innovation meets exquisite craftsmanship
        </p>
      </div>
    </section>

      {/* Category Filter Bar */}
      <section className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 sm:px-6 py-2 rounded-full text-xs tracking-[0.1em] uppercase transition-all duration-300 flex items-center gap-2 ${
                  activeCategory === cat.id
                    ? "bg-slate-900 text-white shadow-lg"
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-xl font-light text-slate-800">
                {filteredProducts.length} Products
              </h2>
              <p className="text-xs text-slate-400 font-light">
                Exclusively curated for you
              </p>
            </div>
            <span className="text-xs text-slate-500 font-light border-b border-slate-300 pb-1">
              ✦ Featured Tech Collection
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-slate-50 flex items-center justify-center p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div
                      className={`absolute top-3 left-3 bg-slate-900 text-white text-[9px] tracking-[0.15em] uppercase font-semibold px-3 py-1 rounded-md transition-all duration-300 ${
                        hoveredProduct === product.id ? "bg-blue-600" : ""
                      }`}
                    >
                      {product.badge}
                    </div>
                  )}

                  {/* Hover Overlay Button */}
                  <div
                    className={`absolute inset-0 bg-slate-900/40 flex items-center justify-center transition-all duration-300 ${
                      hoveredProduct === product.id
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <Link
                      to={`/product/${product.id}`}
                      className="text-white text-xs tracking-[0.15em] uppercase border border-white/80 px-4 py-2 rounded-lg bg-slate-900/60 hover:bg-white hover:text-slate-900 transition-all duration-300 font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Product Meta & Actions */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-slate-800 group-hover:text-blue-600 transition">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-light mt-1.5 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs uppercase text-slate-400 tracking-wider">
                        Price
                      </span>
                      <span className="text-lg font-bold text-slate-900">
                        {product.price}
                      </span>
                    </div>

                    {/* Shop Now Primary Button */}
                    <Link
                      to={`/product/${product.id}`}
                      className="w-full inline-flex items-center justify-center py-2.5 bg-slate-900 text-white text-xs tracking-[0.15em] uppercase rounded-lg hover:bg-blue-600 transition-all duration-300 shadow-md font-medium"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-slate-100">
  <div className="container mx-auto px-6 max-w-7xl">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* Card 1 */}
      <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 hover:bg-blue-50/50 transition-colors duration-300">
        <div className="w-12 h-12 text-blue-600 mb-4">
          <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-slate-900">Guaranteed Authenticity</h3>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          100% factory sealed and sourced straight from official tech vendors.
        </p>
      </div>

      {/* Card 2 */}
      <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 hover:bg-blue-50/50 transition-colors duration-300">
        <div className="w-12 h-12 text-blue-600 mb-4">
          <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-slate-900">Full Tech Protection</h3>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          Includes a complimentary 2-year warranty with 24/7 technical support.
        </p>
      </div>

      {/* Card 3 */}
      <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-slate-50 hover:bg-blue-50/50 transition-colors duration-300">
        <div className="w-12 h-12 text-blue-600 mb-4">
          <svg fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12 0A2.25 2.25 0 0114.25 12h-2.25" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-slate-900">Priority Shipping</h3>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          Insured worldwide express delivery. Free shipping on orders over $500.
        </p>
      </div>

    </div>
  </div>
</section>
    </div>
  );
};

export default Electronics;