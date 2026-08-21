import React, { useState } from "react";
import { Link } from "react-router-dom";

// Image Imports matching your specified paths - KEEPING YOUR ORIGINAL
import cargoImg from "../image/cargo.png";
import tshirt1Img from "../image/tshirt1.png";
import tshirt2Img from "../image/tshirt2.png";
import kurtaImg from "../image/kurta.png";
import pic7 from "../image/pic7.png";

const MenFashionPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Filter Categories
  const categories = [
    { id: "all", name: "All Collection", icon: "✨" },
    { id: "casual", name: "Casual & Tees", icon: "👕" },
    { id: "hoodies", name: "Hoodies & Sweatshirts", icon: "🧥" },
    { id: "bottoms", name: "Cargo & Pants", icon: "👖" },
    { id: "ethnic", name: "Ethnic & Festive", icon: "🕌" },
  ];

  // Products Dataset mapped to your images - KEEPING YOUR ORIGINAL
  const products = [
    {
      _id: "anime-graphic-tee",
      name: "Graphic Oversized Tee",
      category: "casual",
      price: 39,
      image: tshirt1Img,
      badge: "Trending",
      description: "Cream white drop-shoulder oversized graphic t-shirt with anime print design.",
      metadata: {
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['White', 'Black', 'Grey'],
        brand: 'Urban Threads',
        material: '100% Cotton'
      }
    },
    {
      _id: "la-oversized-hoodie",
      name: "LA California Green Hoodie",
      category: "hoodies",
      price: 65,
      image: tshirt2Img,
      badge: "Best Seller",
      description: "Premium fleece-lined forest green graphic hoodie with classic varsity lettering.",
      metadata: {
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Green', 'Black', 'Navy'],
        brand: 'Cozy Wear',
        material: 'Cotton Blend'
      }
    },
    {
      _id: "relaxed-olive-cargos",
      name: "Olive Green Cargo Pants",
      category: "bottoms",
      price: 58,
      image: cargoImg,
      badge: "New",
      description: "Relaxed fit utility cargo trousers with spacious side flap pockets.",
      metadata: {
        sizes: ['28', '30', '32', '34', '36'],
        colors: ['Olive', 'Black', 'Khaki'],
        brand: 'Cargo Co.',
        material: 'Cotton Twill'
      }
    },
    {
      _id: "chikan-embroidered-kurta",
      name: "Dusty Pink Embroidered Kurta",
      category: "ethnic",
      price: 72,
      image: kurtaImg,
      badge: "Festive Special",
      description: "Intricate Chikankari sequin embroidered designer short kurta with Mandarin collar.",
      metadata: {
        sizes: ['S', 'M', 'L', 'XL'],
        colors: ['Pink', 'White', 'Blue'],
        brand: 'Ethnic Studio',
        material: 'Pure Cotton'
      }
    },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-900 font-sans">
      {/* Compact Hero Banner - KEEPING YOUR ORIGINAL */}
      <section className="relative py-8 md:py-12 bg-[#F3ECE0] text-slate-900 overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-3 text-left">
              <span className="inline-block text-[10px] tracking-[0.2em] uppercase text-stone-600 font-semibold border-b border-stone-300 pb-0.5">
                Autumn / Winter '26
              </span>
              <h1 className="text-4xl sm:text-5xl font-extralight leading-tight text-slate-900">
                Crafted <span className="font-serif italic text-amber-900">Comfort</span>
              </h1>
              <p className="text-slate-600 font-light text-xs sm:text-sm max-w-md leading-relaxed">
                Discover lightweight layers, relaxed cargo bottoms, and timeless daily attire.
              </p>
              <div className="pt-1">
                <a
                  href="#catalog"
                  className="inline-block px-6 py-2.5 bg-slate-900 text-stone-100 text-xs tracking-wider uppercase font-bold rounded-full hover:bg-amber-950 transition-all shadow-sm"
                >
                  View Products
                </a>
              </div>
            </div>

            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div className="relative w-full max-w-[240px] h-48 sm:h-56 rounded-2xl overflow-hidden shadow-md border border-stone-300/70 bg-stone-200">
                <img src={pic7} alt="Style Highlight" className="w-full h-full object-cover object-top" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Category Bar - KEEPING YOUR ORIGINAL */}
      <section className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200 py-3">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs tracking-wider uppercase transition-all duration-300 flex items-center gap-1.5 ${
                  activeCategory === cat.id
                    ? "bg-slate-900 text-amber-50 shadow-md font-semibold"
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

      {/* Product Catalog - KEEPING YOUR ORIGINAL */}
      <section id="catalog" className="py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-light text-slate-900">Men's Wardrobe</h2>
              <p className="text-xs text-slate-500 font-light">
                Showing {filteredProducts.length} items
              </p>
            </div>
            <span className="text-xs text-slate-500 font-light border-b border-stone-300 pb-0.5">
              ✦ Handpicked Styles
            </span>
          </div>

          {/* Cards Grid - KEEPING YOUR ORIGINAL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                onMouseEnter={() => setHoveredProduct(product._id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Image Container */}
                <div className="relative h-72 overflow-hidden bg-stone-50 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-slate-900/90 text-amber-300 text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-md">
                      {product.badge}
                    </div>
                  )}

                  {/* Quick View Button Overlay - NOW LINKS TO PRODUCT DETAILS */}
                  <div
                    className={`absolute inset-0 bg-slate-900/30 flex items-center justify-center transition-all duration-300 ${
                      hoveredProduct === product._id
                        ? "opacity-100"
                        : "opacity-0 pointer-events-none"
                    }`}
                  >
                    <Link
                      to={`/product/${product._id}`}
                      className="text-slate-900 bg-white/90 text-xs tracking-wider uppercase border border-white px-4 py-2 rounded-lg hover:bg-slate-900 hover:text-white transition-all font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>

                {/* Product Meta Info */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 group-hover:text-amber-800 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-light mt-1 line-clamp-2">
                      {product.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-stone-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] uppercase text-slate-400 tracking-wider">
                        Price
                      </span>
                      <span className="text-base font-bold text-slate-900">
                        ${product.price}
                      </span>
                    </div>

                    {/* Shop Button - NOW LINKS TO PRODUCT DETAILS */}
                    <Link
                      to={`/product/${product._id}`}
                      className="w-full inline-flex items-center justify-center py-2 bg-slate-900 text-white text-xs tracking-wider uppercase rounded-lg hover:bg-amber-900 transition-all font-medium shadow-sm"
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

      {/* Trust Badges - KEEPING YOUR ORIGINAL */}
      <section className="py-10 bg-white border-t border-stone-200">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <span className="text-2xl block mb-2">🧵</span>
              <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                Premium Fabrics
              </h4>
              <p className="text-xs text-slate-500 font-light mt-0.5">
                100% breathable cotton and durable blends
              </p>
            </div>
            <div className="text-center">
              <span className="text-2xl block mb-2">🚚</span>
              <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                Fast Delivery
              </h4>
              <p className="text-xs text-slate-500 font-light mt-0.5">
                Standard dispatch within 24-48 hours
              </p>
            </div>
            <div className="text-center">
              <span className="text-2xl block mb-2">🔄</span>
              <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                Easy Returns
              </h4>
              <p className="text-xs text-slate-500 font-light mt-0.5">
                Hassle-free 15-day exchange policy
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MenFashionPage;