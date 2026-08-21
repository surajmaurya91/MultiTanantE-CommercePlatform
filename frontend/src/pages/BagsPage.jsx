import React, { useState } from "react";
import { Link } from "react-router-dom";

// Image Imports matching your exact paths
import wallet2Img from "../image/wallet2.png";
import bag1Img from "../image/bag1.png";
import bag2Img from "../image/bag2.png";
import bag3Img from "../image/bag3.png";
import wallet1Img from "../image/wallet1.png";

const BagsPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // Bag & Accessory Categories
  const categories = [
    { id: "all", name: "All Carryware", icon: "✨" },
    { id: "handbags", name: "Crossbody & Handbags", icon: "👜" },
    { id: "travel", name: "Duffels & Travel", icon: "🧳" },
    { id: "kids", name: "Backpacks", icon: "🎒" },
    { id: "wallets", name: "Wallets & Clutches", icon: "👛" },
  ];

  // Products Dataset - IDs match the seed data
  const products = [
    {
      id: "lavie-paris-monogram-wallet",
      name: "Lavie Paris Monogram Zip Wallet",
      category: "wallets",
      price: "$48",
      rating: "4.9",
      image: wallet2Img,
      badge: "Best Seller",
      description: "Elegant textured black clutch wallet with gold hardware and snap closure.",
    },
    {
      id: "cream-crossbody-handbag",
      name: "Cream Leatherette Crossbody Bag",
      category: "handbags",
      price: "$89",
      rating: "4.8",
      image: bag3Img,
      badge: "Trending",
      description: "Off-white structured handbag featuring metallic buckle accent and thick webbed strap.",
    },
    {
      id: "rugged-olive-canvas-duffel",
      name: "Olive Canvas Travel Holdall Duffel",
      category: "travel",
      price: "$125",
      rating: "4.9",
      image: bag2Img,
      badge: "Top Rated",
      description: "Heavy-duty canvas weekend duffel with dark brown leather trims and double handles.",
    },
    {
      id: "london-alley-leather-wallet",
      name: "London Alley Leather Men's Wallet",
      category: "wallets",
      price: "$52",
      rating: "4.7",
      image: wallet1Img,
      badge: "Gift Box",
      description: "Handcrafted dark green distressed leather bifold wallet with embossed stag design.",
    },
    {
      id: "cute-character-kids-backpack",
      name: "American Tourister Character Mini Pack",
      category: "kids",
      price: "$35",
      rating: "4.8",
      image: bag1Img,
      badge: "New Arrival",
      description: "Adorable light blue character backpack designed with soft ears for daily adventures.",
    },
  ];

  const filteredProducts =
    activeCategory === "all"
      ? products
      : products.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-slate-900 font-sans">
      
      {/* Compact Warm Hero Banner */}
      <section className="relative py-8 md:py-12 bg-gradient-to-r from-amber-100 via-stone-100 to-amber-50 text-slate-900 overflow-hidden border-b border-amber-200/50">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Hero Text */}
            <div className="md:col-span-7 space-y-3 text-left">
              <span className="inline-block text-[10px] tracking-[0.25em] uppercase text-amber-900 font-semibold border-b border-amber-800/20 pb-0.5">
                Bags & Accessories '26
              </span>
              <h1 className="text-4xl sm:text-5xl font-extralight leading-tight text-slate-900">
                Crafted <span className="font-serif italic text-amber-900">Carries</span>
              </h1>
              <p className="text-stone-700 font-light text-xs sm:text-sm max-w-md leading-relaxed">
                From luxury leather wallets to spacious travel duffels and everyday handbags—style engineered for every journey.
              </p>
              <div className="pt-1">
                <a
                  href="#bag-catalog"
                  className="inline-block px-6 py-2.5 bg-amber-900 text-amber-50 text-xs tracking-wider uppercase font-semibold rounded-full hover:bg-slate-900 transition-all shadow-sm"
                >
                  Explore Collection
                </a>
              </div>
            </div>

            {/* Hero Featured Showcase */}
            <div className="md:col-span-5 flex justify-center md:justify-end">
              <div className="relative w-full max-w-[240px] h-48 sm:h-56 rounded-2xl overflow-hidden shadow-md border border-amber-200/60 bg-white p-2">
                <img
                  src={bag3Img}
                  alt="Featured Handbag"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Category Filter Navigation */}
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

      {/* Product Catalog Grid */}
      <section id="bag-catalog" className="py-12">
        <div className="container mx-auto px-6 max-w-7xl">
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-light text-slate-900">Bags & Wallets</h2>
              <p className="text-xs text-slate-500 font-light">
                Showing {filteredProducts.length} items
              </p>
            </div>
            <span className="text-xs text-slate-500 font-light border-b border-stone-300 pb-0.5">
              ✦ Genuine Quality Guaranteed
            </span>
          </div>

          {/* Cards Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-stone-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
              >
                {/* Product Image Container */}
                <div className="relative h-64 overflow-hidden bg-stone-50 flex items-center justify-center p-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center rounded-xl transform group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-5 left-5 bg-slate-900/90 text-amber-300 text-[10px] tracking-widest uppercase font-semibold px-2.5 py-1 rounded-md shadow-sm">
                      {product.badge}
                    </div>
                  )}

                  {/* Rating Tag */}
                  <div className="absolute top-5 right-5 bg-white/90 text-slate-900 text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1 border border-stone-200">
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

                {/* Meta Information & CTA */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-800 group-hover:text-amber-900 transition-colors">
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

                    {/* Shop Button - Links to Product Details */}
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

      {/* Feature Badges */}
      <section className="py-10 bg-white border-t border-stone-200">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <span className="text-2xl block mb-2">💼</span>
              <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                Handcrafted Precision
              </h4>
              <p className="text-xs text-slate-500 font-light mt-0.5">
                Stitched using premium fabrics, canvas, and fine leathers
              </p>
            </div>
            <div className="text-center">
              <span className="text-2xl block mb-2">🛡️</span>
              <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                1-Year Hardware Guarantee
              </h4>
              <p className="text-xs text-slate-500 font-light mt-0.5">
                Covers zippers, buckles, and shoulder strap fittings
              </p>
            </div>
            <div className="text-center">
              <span className="text-2xl block mb-2">✈️</span>
              <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">
                Free Express Delivery
              </h4>
              <p className="text-xs text-slate-500 font-light mt-0.5">
                Complimentary shipping on all bag purchases over $40
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default BagsPage;