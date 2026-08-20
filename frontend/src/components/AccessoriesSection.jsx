import React from "react";
import { Link } from "react-router-dom";

// Import your accessory images (add these to your image folder)
import watch from "../image/watch.png";
import bags from "../image/bags.png";
import jewelry from "../image/jewelry.png";
import sunglasses from "../image/sunglasses.png";
import footwear from "../image/footwear.png";

const AccessoriesSection = () => {
  return (
    <section className="relative py-16 bg-white overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute -top-24 -left-24 w-[400px] h-[400px] bg-amber-100/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-rose-100/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] tracking-[0.3em] uppercase text-amber-600 font-medium border-b border-amber-300 pb-1.5">
            Complete The Look
          </span>
          <h2 className="text-3xl sm:text-4xl font-light tracking-tight leading-[1.1] text-amber-950 mt-4">
            Curated <br />
            <span className="font-serif italic font-normal bg-gradient-to-r from-amber-700 via-rose-600 to-amber-700 bg-clip-text text-transparent">
              Accessories
            </span>
          </h2>
          <p className="text-amber-900/60 font-light text-sm max-w-md mx-auto mt-3">
            Elevate your style with our handpicked collection of premium
            accessories
          </p>
        </div>

        {/* Accessories Grid - 4 Items */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {/* Accessory 1 - Watches */}
          <Link
            to="/products?category=watches"
            className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            <div className="relative h-[280px] sm:h-[320px] overflow-hidden bg-[#FAF7F2]">
              <img
                src={watch}
                alt="Luxury Watches"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Category Label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                <span className="text-[10px] tracking-[0.2em] uppercase text-amber-300 font-semibold">
                  Timeless
                </span>
                <h3 className="text-lg sm:text-xl font-light font-serif italic mt-0.5">
                  Watches
                </h3>
                <span className="text-xs text-white/70">Shop Collection →</span>
              </div>
            </div>
          </Link>

          {/* Accessory 2 - Bags */}
          <Link
            to="/products?category=bags"
            className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            <div className="relative h-[280px] sm:h-[320px] overflow-hidden bg-[#FAF7F2]">
              <img
                src={bags}
                alt="Designer Bags"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                <span className="text-[10px] tracking-[0.2em] uppercase text-amber-300 font-semibold">
                  Essential
                </span>
                <h3 className="text-lg sm:text-xl font-light font-serif italic mt-0.5">
                  Bags
                </h3>
                <span className="text-xs text-white/70">Shop Collection →</span>
              </div>
            </div>
          </Link>

          {/* Accessory 3 - Jewelry */}
          <Link
            to="/products?category=jewelry"
            className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            <div className="relative h-[280px] sm:h-[320px] overflow-hidden bg-[#FAF7F2]">
              <img
                src={jewelry}
                alt="Fine Jewelry"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                <span className="text-[10px] tracking-[0.2em] uppercase text-amber-300 font-semibold">
                  Adorn
                </span>
                <h3 className="text-lg sm:text-xl font-light font-serif italic mt-0.5">
                  Jewelry
                </h3>
                <span className="text-xs text-white/70">Shop Collection →</span>
              </div>
            </div>
          </Link>

          {/* Accessory 4 - Sunglasses */}
          <Link
            to="/products?category=sunglasses"
            className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            <div className="relative h-[280px] sm:h-[320px] overflow-hidden bg-[#FAF7F2]">
              <img
                src={sunglasses}
                alt="Designer Sunglasses"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                <span className="text-[10px] tracking-[0.2em] uppercase text-amber-300 font-semibold">
                  Iconic
                </span>
                <h3 className="text-lg sm:text-xl font-light font-serif italic mt-0.5">
                  Sunglasses
                </h3>
                <span className="text-xs text-white/70">Shop Collection →</span>
              </div>
            </div>
          </Link>

          {/* Accessory 5 - Footwear */}
          <Link
            to="/products?category=footwear"
            className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
          >
            <div className="relative h-[280px] sm:h-[320px] overflow-hidden bg-[#FAF7F2]">
              <img
                src={footwear}
                alt="Designer Footwear"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 text-white">
                <span className="text-[10px] tracking-[0.2em] uppercase text-amber-300 font-semibold">
                  Step Up
                </span>
                <h3 className="text-lg sm:text-xl font-light font-serif italic mt-0.5">
                  Footwear
                </h3>
                <span className="text-xs text-white/70">Shop Collection →</span>
              </div>
            </div>
          </Link>
        </div>

        {/* View All Accessories Button */}
        <div className="text-center mt-10">
          <Link
            to="/products?category=accessories"
            className="inline-block px-10 py-3.5 bg-amber-900 text-white font-light text-xs tracking-[0.15em] uppercase hover:bg-amber-800 transition-all duration-300 hover:shadow-xl rounded-lg"
          >
            View All Accessories →
          </Link>
        </div>
      </div>
      a
    </section>
  );
};

export default AccessoriesSection;
