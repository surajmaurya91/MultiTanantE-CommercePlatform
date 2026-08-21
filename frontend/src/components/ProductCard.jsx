import React from 'react'
import { Link } from 'react-router-dom'

// Import local images
import dressImg from "../image/dress.png";
import topImg from "../image/top.png";
import trouserImg from "../image/trouser.png";
import anarkaliImg from "../image/anarkali.png";

export default function ProductCard({ product }) {
  const localImages = {
    'featured-dress-01': dressImg,
    'featured-top-02': topImg,
    'featured-trouser-03': trouserImg,
    'featured-anarkali-04': anarkaliImg,
  };

  const getImage = () => {
    if (product._id && localImages[product._id]) return localImages[product._id];
    return product.image || 'https://via.placeholder.com/300x400?text=Product';
  };

  return (
    <Link 
      to={`/product/${product._id}`} 
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="relative bg-stone-100 h-64 overflow-hidden">
        <img 
          src={getImage()}
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
  )
}