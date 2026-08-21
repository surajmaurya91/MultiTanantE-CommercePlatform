import React, { useState } from "react";
import { Link } from "react-router-dom";

// Image Imports matching your specified paths
import sunglass1Img from "../image/sunglass1.png";
import sunglass2Img from "../image/sunglass2.png";
import sunglass3Img from "../image/sunglass3.png";

const SunglassesPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Categories
  const categories = [
    { id: "all", name: "All Frames", icon: "🕶️" },
    { id: "aviator", name: "Aviator", icon: "✈️" },
    { id: "wayfarer", name: "Wayfarer", icon: "😎" },
    { id: "round", name: "Retro Round", icon: "⭕" },
  ];

  // Sunglasses Catalog
  const products = [
    {
      id: "classic-gold-aviator",
      name: "Classic Gold Aviator",
      category: "aviator",
      price: "$149",
      rating: "4.9",
      image: sunglass1Img,
      badge: "Best Seller",
      description: "Polarized metal frame aviators with signature tear-drop UV400 lenses.",
    },
    {
      id: "matte-black-wayfarer",
      name: "Matte Black Wayfarer",
      category: "wayfarer",
      price: "$129",
      rating: "4.8",
      image: sunglass2Img,
      badge: "Trending",
      description: "Lightweight acetate square frames with anti-reflective dark lenses.",
    },
    {
      id: "vintage-round-tortoise",
      name: "Vintage Round Eyewear",
      category: "round",
      price: "$159",
      rating: "4.7",
      image: sunglass3Img,
      badge: "New Arrival",
      description: "Retro tortoiseshell keyhole bridge sunglasses with green tinted lenses.",
    },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-900 font-sans">
      
      {/* Compact Warm Hero Banner */}
      <section className="relative py-8 md:py-12 bg-gradient-to-r from-amber-100 via-stone-100 to-amber-50 text-slate-900 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Left Content */}
            <div className="md:col-span-7 space-y-3 text-left">
              <span className="inline-block text-[10px] tracking-[0.25em] uppercase text-amber-900 font-semibold border-b border-amber-800/20 pb-0.5">
                Summer Eyewear '26
              </span>
              <h1 className="text-4xl sm:text-5xl font-extralight leading-tight text-slate-900">
                Shade & <span className="font-serif italic text-amber-900">Shine</span>
              </h1>
              <p className="text-stone-700 font-light text-xs sm:text-sm max-w-md leading-relaxed">
                Discover premium UV400 polarized shades crafted with ultra-lightweight titanium and hand-polished acetate frames.
              </p>
              <div className="pt-1">
                <a
                  href="#eyewear-catalog"
                  className="inline-block px-6 py-2.5 bg-amber-900 text-amber-50 text-xs tracking-wider uppercase font-semibold rounded-full hover:bg-slate-900 transition-all shadow-sm"
                >
                  Explore Frames
                </a>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div className="relative w-full max-w-[240px] h-48 sm:h-56 rounded-2xl overflow-hidden shadow-lg border border-amber-200/60 bg-amber-50 p-4 flex items-center justify-center">
                <img
                  src={sunglass1Img}
                  alt="Featured Sunglasses"
                  className="max-h-full max-w-full object-contain transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <section className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200 py-3">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? "bg-amber-900 text-amber-50 shadow-md font-semibold"
                    : "bg-stone-100 text-slate-600 hover:bg-stone-200 border border-stone-200"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sunglasses Catalog */}
      <section id="eyewear-catalog" className="py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-light text-slate-900">Luxury Shades</h2>
              <p className="text-xs text-slate-500 font-light">
                Showing {filteredProducts.length} designs
              </p>
            </div>
            <span className="text-xs text-slate-500 font-light border-b border-stone-300 pb-0.5">
              ✦ 100% UV Protection
            </span>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden bg-stone-50 flex items-center justify-center p-6">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-full max-w-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-amber-950/90 text-amber-300 text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-md">
                      {product.badge}
                    </div>
                  )}

                  {/* Rating Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 text-slate-900 text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 border border-stone-200">
                    <span className="text-amber-500 text-xs">★</span> {product.rating}
                  </div>

                  {/* Hover Quick View Overlay */}
                  <div
                    className={`absolute inset-0 bg-slate-900/30 flex items-center justify-center transition-all duration-300 ${
                      hoveredProduct === product.id
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <Link
                      to={`/product/${product.id}`}
                      className="text-slate-900 bg-white/95 text-xs tracking-wider uppercase border border-white px-4 py-2 rounded-lg hover:bg-amber-900 hover:text-white transition-all font-medium shadow-md"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Meta Details & Action */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-slate-800 group-hover:text-amber-900 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-light mt-1.5 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] uppercase text-slate-400 tracking-wider">
                        Price
                      </span>
                      <span className="text-base font-bold text-slate-900">
                        {product.price}
                      </span>
                    </div>

                    {/* Shop Button */}
                    <Link
                      to={`/product/${product.id}`}
                      className="w-full inline-flex items-center justify-center py-2.5 bg-slate-900 text-amber-50 text-xs tracking-wider uppercase rounded-lg hover:bg-amber-900 transition-all font-medium shadow-sm"
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

      {/* Feature Highlights */}
      <section className="py-10 bg-white border-t border-stone-200">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <span className="text-2xl block mb-2">☀️</span>
              <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                100% UV400 Protection
              </h4>
              <p className="text-xs text-slate-500 font-light mt-0.5">
                Blocks 100% of harmful UVA & UVB rays
              </p>
            </div>
            <div className="text-center">
              <span className="text-2xl block mb-2">💎</span>
              <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                Scratch Resistant
              </h4>
              <p className="text-xs text-slate-500 font-light mt-0.5">
                Multi-layer protective lens coating
              </p>
            </div>
            <div className="text-center">
              <span className="text-2xl block mb-2">📦</span>
              <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                Includes Leather Case
              </h4>
              <p className="text-xs text-slate-500 font-light mt-0.5">
                Comes with branded case & microfiber cloth
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SunglassesPage;