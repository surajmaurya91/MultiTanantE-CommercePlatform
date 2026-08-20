import React from "react";
import { Link } from "react-router-dom";
import pic7 from "../image/pic7.png";

const MenFashionSection = () => {
  return (
    <section className="relative py-12 bg-white overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute -top-24 -right-24 w-[400px] h-[400px] bg-blue-100/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-amber-100/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left - Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-lg shadow-xl">
              <img 
                src={pic7} 
                alt="Men's Fashion Collection" 
                className="w-full h-[300px] sm:h-[380px] lg:h-[420px] object-cover transition-transform duration-700 hover:scale-105"
              />
              
              {/* Floating Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded shadow-md">
                <span className="text-[9px] tracking-[0.2em] uppercase font-medium text-amber-800">
                  New Arrival
                </span>
              </div>
            </div>
          </div>

          {/* Right - Content */}
          <div className="order-1 lg:order-2 space-y-4 text-center lg:text-left">
            {/* Tag */}
            <div className="inline-block">
              <span className="text-[10px] tracking-[0.3em] uppercase text-blue-700 font-medium border-b border-blue-300 pb-1.5">
                Men's Collection
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1] text-amber-950">
              Tailored <br />
              <span className="font-serif italic font-normal text-blue-700">
                Excellence
              </span>
            </h2>

            {/* Description */}
            <p className="text-amber-900/70 font-light leading-relaxed text-sm sm:text-base max-w-lg mx-auto lg:mx-0">
              The Autumn/Winter 2026 collection redefines modern masculinity 
              with sharp tailoring, luxurious fabrics, and timeless craftsmanship. 
              From structured blazers to refined casualwear, each piece is 
              designed for the discerning gentleman who values quality and 
              sophistication.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-1">
              <span className="text-xs text-amber-700/60">✦ Premium Wool</span>
              <span className="text-xs text-amber-700/60">✦ Italian Leather</span>
              <span className="text-xs text-amber-700/60">✦ Bespoke Fit</span>
            </div>

            {/* Shop Now Button */}
            <div className="pt-2">
              <Link
                to="/products?category=men"
                className="inline-block px-8 py-3 bg-blue-800 text-white font-light text-xs tracking-[0.15em] uppercase hover:bg-amber-800 transition-all duration-300 hover:shadow-xl"
              >
                Shop Now →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenFashionSection;