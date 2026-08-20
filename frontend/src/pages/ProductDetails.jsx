import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import client from "../api/apiClient";

// Import your local images
import dressImg from "../image/dress.png";
import dress1Img from "../image/dress1.png"; // ← ADD THIS
import topImg from "../image/top.png";
import trouserImg from "../image/trouser.png";
import trouser1Img from "../image/trouser1.png";
import anarkaliImg from "../image/anarkali.png";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [addedToCart, setAddedToCart] = useState(false);

  // Map product IDs to local images (fallback)
  const localImages = {
    "featured-dress-01": dressImg,
    "featured-top-02": topImg,
    "featured-trouser-03": trouserImg,
    "featured-anarkali-04": anarkaliImg,
  };

  // Map backend image paths to local imports
  const imagePathMap = {
    "/images/dress.png": dressImg,
    "/images/dress1.png": dress1Img, // ← ADD THIS
    "/images/top.png": topImg,
    "/images/trouser.png": trouserImg,
    "/images/trouser1.png": trouser1Img,
    "/images/anarkali.png": anarkaliImg,
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await client.get(`/products/${id}`);
        if (res.data) {
          const productData = res.data;

          // Set default image
          let imageToShow = localImages[id] || dressImg;
          if (productData.image && imagePathMap[productData.image]) {
            imageToShow = imagePathMap[productData.image];
          }

          productData.image = imageToShow;
          setCurrentImage(imageToShow);

          // Handle colors with images
          if (productData.metadata?.colors) {
            const colors = productData.metadata.colors;
            if (Array.isArray(colors) && colors.length > 0) {
              const firstColor = colors[0];
              if (typeof firstColor === "object" && firstColor.image) {
                // Colors are objects with images
                const colorImage = imagePathMap[firstColor.image] || dressImg;
                setSelectedColor(firstColor.name);
                setCurrentImage(colorImage);
              } else {
                setSelectedColor(colors[0]);
              }
            }
          }

          setProduct(productData);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleColorChange = (color) => {
    setSelectedColor(color);

    // Handle object color with image
    if (typeof color === "object" && color.image) {
      const mappedImage = imagePathMap[color.image] || dressImg;
      setCurrentImage(mappedImage);
    }
    // Fallback
    else {
      setCurrentImage(localImages[id] || dressImg);
    }
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item) => item.productId === product._id);

    const colorName =
      typeof selectedColor === "object" ? selectedColor.name : selectedColor;

    if (existing) {
      existing.qty += quantity;
    } else {
      cart.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        image: currentImage,
        qty: quantity,
        size: selectedSize || "N/A",
        color: colorName || "N/A",
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center">
          <div className="w-6 h-6 border-2 border-amber-800 border-t-transparent rounded-full animate-spin mx-auto mb-1"></div>
          <p className="text-amber-800 text-xs font-light">Loading...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-light text-amber-950 mb-1">
            Product Not Found
          </h2>
          <Link
            to="/women-fashion"
            className="text-amber-800 text-xs hover:underline"
          >
            ← Back to Women's Fashion
          </Link>
        </div>
      </div>
    );
  }

  const sizes = product.metadata?.sizes || ["S", "M", "L", "XL"];
  const colors = product.metadata?.colors || ["Black", "White", "Navy"];
  const badge = product.metadata?.badge || "";
  const brand = product.metadata?.brand || "";
  const material = product.metadata?.material || "";
  const rating = product.metadata?.rating || 4.5;
  const reviews = product.metadata?.reviews || 0;

  const displayImage = currentImage || product.image || dressImg;

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-4">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Success Message */}
        {addedToCart && (
          <div className="mb-3 bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-1.5 rounded text-[10px]">
            ✓ Added to cart!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* LEFT - Product Image */}
          <div>
            <div className="relative bg-stone-100 rounded-lg overflow-hidden aspect-[3/4] max-h-[520px]">
              <img
                src={displayImage}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.target.src = trouserImg;
                }}
              />
              {badge && (
                <span className="absolute top-2 left-2 bg-stone-900/90 text-amber-100 text-[10px] px-2 py-0.5 rounded-full">
                  {badge}
                </span>
              )}
            </div>
          </div>

          {/* RIGHT - Product Details */}
          <div className="space-y-2.5">
            {brand && (
              <span className="text-[16px] tracking-widest uppercase text-slate-400 font-medium">
                {brand}
              </span>
            )}

            <h1 className="text-xl font-light text-amber-950 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-2 text-[14px]">
              <div className="flex items-center gap-0.5">
                <span className="text-amber-500 text-[14px]">★</span>
                <span className="font-medium text-slate-700">{rating}</span>
                <span className="text-slate-400">({reviews})</span>
              </div>
              <span className="text-emerald-600 font-medium text-[14px]">
                ✓ In Stock
              </span>
            </div>

            <div className="text-xl font-light text-amber-950">
              ${product.price?.toFixed(2)}
            </div>

            <p className="text-slate-600 font-light text-xl leading-relaxed">
              {product.description || "Beautiful piece from our collection."}
            </p>

            {material && (
              <div className="text-[14px]">
                <span className="text-slate-400">Material: </span>
                <span className="text-slate-700 font-medium">{material}</span>
              </div>
            )}

            {/* Size Selector */}
            <div>
              <span className="text-[14px] uppercase tracking-widest text-slate-600 font-medium block mb-1">
                Select Size
              </span>
              <div className="flex flex-wrap gap-1">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-0.5 border rounded text-[14px] transition ${
                      selectedSize === size
                        ? "border-amber-800 bg-amber-800 text-white"
                        : "border-slate-200 text-slate-600 hover:border-amber-800"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div>
              <span className="text-[14px] uppercase tracking-widest text-slate-600 font-medium block mb-1">
                Select Color
              </span>
              <div className="flex flex-wrap gap-1.5">
                {colors.map((color) => {
                  const colorName =
                    typeof color === "object" ? color.name : color;
                  const isSelected =
                    selectedColor === color ||
                    (typeof selectedColor === "object" &&
                      selectedColor.name === colorName);

                  return (
                    <button
                      key={colorName}
                      onClick={() => handleColorChange(color)}
                      className={`px-2.5 py-0.5 border rounded text-[14px] transition ${
                        isSelected
                          ? "border-amber-800 bg-amber-50 text-amber-800"
                          : "border-slate-200 text-slate-600 hover:border-amber-800"
                      }`}
                    >
                      {colorName}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <span className="text-[14px] uppercase tracking-widest text-slate-600 font-medium block mb-1">
                Quantity
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 border rounded flex items-center justify-center hover:border-amber-800 text-md"
                >
                  −
                </button>
                <span className="w-6 text-center text-xs font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-6 h-6 border rounded flex items-center justify-center hover:border-amber-800 text-md"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-1.5 pt-1">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-amber-700 text-white px-4 py-2 rounded-full hover:bg-amber-800 transition text-[14px] uppercase tracking-wider"
              >
                🛍️ Add to Bag
              </button>
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 border border-slate-200 rounded-full hover:border-amber-800 hover:text-amber-800 transition text-[14px]"
              >
                ← Continue
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
              <div className="text-center">
                <p className="text-base mb-0">🚚</p>
                <p className="text-[12px] text-slate-400 uppercase tracking-wider">
                  Free Shipping
                </p>
              </div>
              <div className="text-center">
                <p className="text-base mb-0">🔄</p>
                <p className="text-[12px] text-slate-400 uppercase tracking-wider">
                  30-Day Returns
                </p>
              </div>
              <div className="text-center">
                <p className="text-base mb-0">🔒</p>
                <p className="text-[12px] text-slate-400 uppercase tracking-wider">
                  Secure Payment
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
