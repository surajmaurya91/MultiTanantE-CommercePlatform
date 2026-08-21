import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import client from "../api/apiClient";

// Women's Images
import dressImg from "../image/dress.png";
import dress1Img from "../image/dress1.png";
import topImg from "../image/top.png";
import trouserImg from "../image/trouser.png";
import trouser1Img from "../image/trouser1.png";
import anarkaliImg from "../image/anarkali.png";

// Men's Images
import tshirt1Img from "../image/tshirt1.png";
import tshirt2Img from "../image/tshirt2.png";
import cargoImg from "../image/cargo.png";
import kurtaImg from "../image/kurta.png";
import kurta1Img from "../image/kurta1.png";

// Electronics Images
import tableImg from "../image/tablet.png";
import dellImg from "../image/dell.png";
import earbudImg from "../image/earbud.png";
import headphoneImg from "../image/headphone.png";
import pixelImg from "../image/pixel.png";

// Sunglasses Images
import sunglass1Img from "../image/sunglass1.png";
import sunglass2Img from "../image/sunglass2.png";
import sunglass3Img from "../image/sunglass3.png";

// Bags Images
import wallet2Img from "../image/wallet2.png";
import bag1Img from "../image/bag1.png";
import bag2Img from "../image/bag2.png";
import bag3Img from "../image/bag3.png";
import wallet1Img from "../image/wallet1.png";

// Jewelry Images
import jewelry from "../image/jewelry.png";
import pandent1Img from "../image/pandent1.png";
import pandent2Img from "../image/pandent2.png";
import bracelet1Img from "../image/bracelet1.png";
import bracelet2Img from "../image/bracelet2.png";

// Watches Images
import watch1Img from "../image/watch1.png";
import watch2Img from "../image/watch2.png";
import watch3Img from "../image/watch3.png";

// Footwear Images
import shoes1Img from "../image/shoes1.png";
import shoes2Img from "../image/shoes2.png";
import heel1Img from "../image/heel1.png";
import heel2Img from "../image/heel2.png";
import footwearImg from "../image/footwear.png";

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

  // Map image names to local imports
  const imageMap = {
    // Women's
    "dress.png": dressImg,
    "dress1.png": dress1Img,
    "top.png": topImg,
    "trouser.png": trouserImg,
    "trouser1.png": trouser1Img,
    "anarkali.png": anarkaliImg,
    // Men's
    "tshirt1.png": tshirt1Img,
    "tshirt2.png": tshirt2Img,
    "cargo.png": cargoImg,
    "kurta.png": kurtaImg,
    "kurta1.png": kurta1Img,
    // Electronics
    "dell.png": dellImg,
    "pixel.png": pixelImg,
    "tablet.png": tableImg,
    "headphone.png": headphoneImg,
    "earbud.png": earbudImg,
    // Sunglasses
    "sunglass1.png": sunglass1Img,
    "sunglass2.png": sunglass2Img,
    "sunglass3.png": sunglass3Img,
    // Bags
    "wallet2.png": wallet2Img,
    "bag1.png": bag1Img,
    "bag2.png": bag2Img,
    "bag3.png": bag3Img,
    "wallet1.png": wallet1Img,
    // Jewelry
    "pandent1.png": pandent1Img,
    "pandent2.png": pandent2Img,
    "bracelet1.png": bracelet1Img,
    "bracelet2.png": bracelet2Img,
    "jewelry.png": jewelry,
    // Watches
    "watch1.png": watch1Img,
    "watch2.png": watch2Img,
    "watch3.png": watch3Img,
    // Footwear
    "shoes1.png": shoes1Img,
    "shoes2.png": shoes2Img,
    "heel1.png": heel1Img,
    "heel2.png": heel2Img,
    "footwear.png": footwearImg,
  };

  // Map product IDs to default images (fallback)
  const defaultImages = {
    // Women's
    "featured-dress-01": dressImg,
    "featured-top-02": topImg,
    "featured-trouser-03": trouserImg,
    "featured-anarkali-04": anarkaliImg,
    // Men's
    "anime-graphic-tee": tshirt1Img,
    "la-oversized-hoodie": tshirt2Img,
    "relaxed-olive-cargos": cargoImg,
    "chikan-embroidered-kurta": kurtaImg,
    // Electronics
    "dell-performance-laptop": dellImg,
    "google-pixel-smartphone": pixelImg,
    "moto-pad-70-tablet": tableImg,
    "studio-pro-headphones": headphoneImg,
    "champagne-gold-earbuds": earbudImg,
    // Sunglasses
    "classic-gold-aviator": sunglass1Img,
    "matte-black-wayfarer": sunglass2Img,
    "vintage-round-tortoise": sunglass3Img,
    // Bags
    "lavie-paris-monogram-wallet": wallet2Img,
    "cream-crossbody-handbag": bag3Img,
    "rugged-olive-canvas-duffel": bag2Img,
    "london-alley-leather-wallet": wallet1Img,
    "cute-character-kids-backpack": bag1Img,
    // Jewelry
    "celestial-silver-pendant-set": pandent1Img,
    "gold-textured-link-bracelet": bracelet2Img,
    "purple-beaded-bow-jewelry-set": bracelet1Img,
    "bullet-pendant-steel-chain": pandent2Img,
    // Watches
    "lois-caron-emerald-steel": watch1Img,
    "rose-gold-butterfly-crystal": watch3Img,
    "monogram-r-silver-quartz": watch2Img,
    // Footwear
    "patent-leather-loafer": shoes2Img,
    "strappy-stiletto-mules": heel1Img,
    "embellished-ethnic-jutti": heel2Img,
    "cushioned-runner-sneaker": shoes1Img,
    "classic-oxford-brogue": footwearImg,
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await client.get(`/products/${id}`);
        if (res.data) {
          const productData = res.data;

          let imageToShow = defaultImages[id] || dressImg;
          if (productData.image && imageMap[productData.image]) {
            imageToShow = imageMap[productData.image];
          }

          productData.image = imageToShow;
          setCurrentImage(imageToShow);

          if (productData.metadata?.colors) {
            const colors = productData.metadata.colors;
            if (Array.isArray(colors) && colors.length > 0) {
              const firstColor = colors[0];
              if (typeof firstColor === "object" && firstColor.image) {
                const colorImage = imageMap[firstColor.image] || dressImg;
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
    if (typeof color === "object" && color.image && imageMap[color.image]) {
      setCurrentImage(imageMap[color.image]);
    } else {
      setCurrentImage(defaultImages[id] || dressImg);
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
            to="/"
            className="text-amber-800 text-xs hover:underline"
          >
            ← Back to Shopping
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
  const care = product.metadata?.care || "";

  const displayImage = currentImage || product.image || dressImg;

  return (
    <div className="min-h-screen bg-[#FDFBF7] py-4">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-3">
          <Link to="/" className="hover:text-amber-800">Home</Link>
          <span>/</span>
          <Link 
            to={"/products"} 
            className="hover:text-amber-800 capitalize"
          >
            {product.category || 'Products'}
          </Link>
          <span>/</span>
          <span className="text-amber-800 truncate max-w-[150px]">{product.name}</span>
        </div>

        {/* Success Message */}
        {addedToCart && (
          <div className="mb-3 bg-emerald-50 border border-emerald-200 text-emerald-700 px-2.5 py-1.5 rounded text-[10px]">
            ✓ Added to cart!
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* LEFT - Product Image */}
          <div>
            <div className="relative bg-stone-100 rounded-lg overflow-hidden aspect-[3/4] max-h-[520px] flex items-center justify-center p-4">
              <img
                src={displayImage}
                alt={product.name}
                className="max-w-full max-h-full object-contain"
                onError={(e) => {
                  e.target.src = shoes1Img;
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

            <p className="text-slate-600 font-light text-sm leading-relaxed">
              {product.description || "Beautiful piece from our collection."}
            </p>

            {material && (
              <div className="text-[12px]">
                <span className="text-slate-400">Material: </span>
                <span className="text-slate-700 font-medium">{material}</span>
              </div>
            )}

            {care && (
              <div className="text-[12px]">
                <span className="text-slate-400">Care: </span>
                <span className="text-slate-700 font-medium">{care}</span>
              </div>
            )}

            {/* Size Selector */}
            <div>
              <span className="text-[11px] uppercase tracking-widest text-slate-600 font-medium block mb-1">
                Select Size
              </span>
              <div className="flex flex-wrap gap-1">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-0.5 border rounded text-[12px] transition ${
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
              <span className="text-[11px] uppercase tracking-widest text-slate-600 font-medium block mb-1">
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
                      className={`px-2.5 py-0.5 border rounded text-[12px] transition ${
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
              <span className="text-[11px] uppercase tracking-widest text-slate-600 font-medium block mb-1">
                Quantity
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 border rounded flex items-center justify-center hover:border-amber-800 text-sm"
                >
                  −
                </button>
                <span className="w-6 text-center text-xs font-medium">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-6 h-6 border rounded flex items-center justify-center hover:border-amber-800 text-sm"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-1.5 pt-1">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-amber-700 text-white px-4 py-2 rounded-full hover:bg-amber-800 transition text-[12px] uppercase tracking-wider"
              >
                🛍️ Add to Bag
              </button>
              <button
                onClick={() => navigate(-1)}
                className="px-4 py-2 border border-slate-200 rounded-full hover:border-amber-800 hover:text-amber-800 transition text-[12px]"
              >
                ← Continue
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
              <div className="text-center">
                <p className="text-base mb-0">🚚</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                  Free Shipping
                </p>
              </div>
              <div className="text-center">
                <p className="text-base mb-0">🔄</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                  30-Day Returns
                </p>
              </div>
              <div className="text-center">
                <p className="text-base mb-0">🔒</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">
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