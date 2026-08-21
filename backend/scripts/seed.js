require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const Store = require('../models/Store')
const Product = require('../models/Product')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/multitenant_mvp')
    console.log('MongoDB connected for seeding')
  } catch (err) {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  }
}

const seedDB = async () => {
  try {
    await connectDB()

    // Clear existing data
    await User.deleteMany({})
    await Store.deleteMany({})
    await Product.deleteMany({})

    console.log('🗑️  Cleared existing data')

    // Create Super Admin
    const hashedAdminPassword = await bcrypt.hash('admin123', 10)
    const superAdmin = await User.create({
      name: 'Super Admin',
      email: 'admin@multitenant.com',
      password: hashedAdminPassword,
      role: 'superadmin',
      tenantId: 'superadmin'
    })
    console.log('✅ Super Admin created:', superAdmin.email)

    // Create Vendor 1 - Fashion Vendor
    const hashedVendor1Password = await bcrypt.hash('vendor123', 10)
    const vendor1 = await User.create({
      name: 'Fashion Vendor',
      email: 'fashion@store.com',
      password: hashedVendor1Password,
      role: 'vendor',
      tenantId: 'store_001'
    })
    console.log('✅ Vendor 1 (Fashion) created:', vendor1.email)

    // Create Vendor 2 - Electronics Vendor
    const hashedVendor2Password = await bcrypt.hash('vendor123', 10)
    const vendor2 = await User.create({
      name: 'Electronics Vendor',
      email: 'electronics@store.com',
      password: hashedVendor2Password,
      role: 'vendor',
      tenantId: 'store_002'
    })
    console.log('✅ Vendor 2 (Electronics) created:', vendor2.email)

    // Create Customer
    const hashedCustomerPassword = await bcrypt.hash('customer123', 10)
    const customer = await User.create({
      name: 'Customer One',
      email: 'customer@example.com',
      password: hashedCustomerPassword,
      role: 'customer',
      tenantId: 'store_001'
    })
    console.log('✅ Customer created:', customer.email)

    // Create Stores
    const store1 = await Store.create({
      name: 'Fashion Central',
      ownerId: vendor1._id,
      tenantId: 'store_001',
      metadata: { description: 'Latest fashion and apparel' }
    })
    console.log('✅ Store 1 (Fashion) created:', store1.name)

    const store2 = await Store.create({
      name: 'Electronics Hub',
      ownerId: vendor2._id,
      tenantId: 'store_002',
      metadata: { description: 'Premium electronics and gadgets' }
    })
    console.log('✅ Store 2 (Electronics) created:', store2.name)

    // ============================================================
    // WOMEN'S FASHION PRODUCTS - USING LOCAL IMAGE NAMES
    // ============================================================
    const womenFashion = await Product.create([
      {
        _id: 'featured-dress-01',
        name: 'Off-Shoulder Silk Evening Gown',
        category: 'Dresses',
        price: 450,
        image: 'dress.png',  // ← Local image name
        description: 'Sculpted drape bodice with an asymmetric train. Crafted from pure silk with hand-embroidered details.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Couture',
          sizes: ['XS', 'S', 'M', 'L', 'XL'],
          colors: [
            { name: 'Black', image: 'dress.png' },
            { name: 'Red', image: 'dress1.png' }
          ],
          rating: 4.8,
          reviews: 124,
          brand: 'Maison Luxe',
          material: '100% Silk',
          care: 'Dry clean only'
        }
      },
      {
        _id: 'featured-top-02',
        name: 'Draped Mesh Wrap Top',
        category: 'Tops',
        price: 180,
        image: 'top.png',
        description: 'Sheer pleated overlay in rich wine hue. Perfect for evening occasions.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Trending',
          sizes: ['XS', 'S', 'M', 'L'],
          colors: ['Wine', 'Black', 'Emerald'],
          rating: 4.6,
          reviews: 89,
          brand: 'Studio Noir',
          material: 'Premium Mesh',
          care: 'Hand wash recommended'
        }
      },
      {
        _id: 'featured-trouser-03',
        name: 'Pleated Wide-Leg Trousers',
        category: 'Trousers',
        price: 220,
        image: 'trouser.png',
        description: 'High-waisted silhouette in mocha wool blend. Effortless elegance for the modern woman.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Tailored',
          sizes: ['XS', 'S', 'M', 'L', 'XL'],
          colors: [
            { name: 'Coffee Brown', image: 'trouser.png' },
            { name: 'Beige', image: 'trouser1.png' }
          ],
          rating: 4.7,
          reviews: 67,
          brand: 'Tailored Threads',
          material: 'Wool Blend',
          care: 'Dry clean only'
        }
      },
      {
        _id: 'featured-anarkali-04',
        name: 'Printed Silk Anarkali Set',
        category: 'Ethnic',
        price: 320,
        image: 'anarkali.png',
        description: 'Floral block print paired with sheer dupatta. A celebration of timeless Indian craftsmanship.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Heritage',
          sizes: ['S', 'M', 'L', 'XL'],
          colors: ['Rose', 'Teal', 'Gold'],
          rating: 4.9,
          reviews: 203,
          brand: 'Heritage Weaves',
          material: 'Pure Silk',
          care: 'Dry clean only'
        }
      }
    ])
    console.log(`✅ Women's Fashion: ${womenFashion.length} products`)

    // ============================================================
    // MEN'S FASHION PRODUCTS
    // ============================================================
    const menFashion = await Product.create([
      {
        _id: 'anime-graphic-tee',
        name: 'Graphic Oversized Tee',
        category: 'casual',
        price: 39,
        image: 'tshirt1.png',
        description: 'Cream white drop-shoulder oversized graphic t-shirt with anime print design.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Trending',
          sizes: ['S', 'M', 'L', 'XL'],
          colors: ['White', 'Black', 'Grey'],
          brand: 'Urban Threads',
          material: '100% Cotton',
          rating: 4.6,
          reviews: 89,
          care: 'Machine wash cold'
        }
      },
      {
        _id: 'la-oversized-hoodie',
        name: 'LA California Green Hoodie',
        category: 'hoodies',
        price: 65,
        image: 'tshirt2.png',
        description: 'Premium fleece-lined forest green graphic hoodie with classic varsity lettering.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Best Seller',
          sizes: ['S', 'M', 'L', 'XL'],
          colors: ['Green', 'Black', 'Navy'],
          brand: 'Cozy Wear',
          material: 'Cotton Blend',
          rating: 4.8,
          reviews: 156,
          care: 'Machine wash cold'
        }
      },
      {
        _id: 'relaxed-olive-cargos',
        name: 'Olive Green Cargo Pants',
        category: 'bottoms',
        price: 58,
        image: 'cargo.png',
        description: 'Relaxed fit utility cargo trousers with spacious side flap pockets.',
        tenantId: 'store_001',
        metadata: {
          badge: 'New',
          sizes: ['28', '30', '32', '34', '36'],
          colors: ['Olive', 'Black', 'Khaki'],
          brand: 'Cargo Co.',
          material: 'Cotton Twill',
          rating: 4.5,
          reviews: 45,
          care: 'Machine wash cold'
        }
      },
      {
        _id: 'chikan-embroidered-kurta',
        name: 'Dusty Pink Embroidered Kurta',
        category: 'ethnic',
        price: 72,
        image: 'kurta.png',
        description: 'Intricate Chikankari sequin embroidered designer short kurta with Mandarin collar.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Festive Special',
          sizes: ['S', 'M', 'L', 'XL'],
          colors: [
            { name: 'Green', image: 'kurta1.png' },
            { name: 'Magenta', image: 'kurta.png' }
          ],
          brand: 'Ethnic Studio',
          material: 'Pure Cotton',
          rating: 4.7,
          reviews: 112,
          care: 'Dry clean only'
        }
      }
    ])
    console.log(`✅ Men's Fashion: ${menFashion.length} products`)

    // ============================================================
    // ELECTRONICS PRODUCTS
    // ============================================================
    const electronics = await Product.create([
      {
        _id: 'dell-performance-laptop',
        name: 'Dell Performance Laptop',
        category: 'laptops',
        price: 1299,
        image: 'dell.png',
        description: 'AMD Ryzen 5, 120Hz 15.6" FHD Display & Radeon Graphics. Perfect for gaming and productivity.',
        tenantId: 'store_002',
        metadata: {
          badge: 'Best Seller',
          sizes: ['15.6"'],
          colors: ['Silver', 'Black'],
          rating: 4.8,
          reviews: 450,
          brand: 'Dell',
          material: 'Aluminum',
          care: 'Wipe with soft cloth'
        }
      },
      {
        _id: 'google-pixel-smartphone',
        name: 'Google Pixel Smartphone',
        category: 'phones',
        price: 899,
        image: 'pixel.png',
        description: 'Advanced camera system with AI performance. Capture stunning photos in any lighting condition.',
        tenantId: 'store_002',
        metadata: {
          badge: 'Flagship',
          sizes: ['6.7"'],
          colors: ['Black', 'White', 'Hazel'],
          rating: 4.9,
          reviews: 320,
          brand: 'Google',
          material: 'Gorilla Glass',
          care: 'Screen protector recommended'
        }
      },
      {
        _id: 'moto-pad-70-tablet',
        name: 'Moto Pad 70 5G Tablet',
        category: 'laptops',
        price: 499,
        image: 'tablet.png',
        description: '12.1" 2.5K Ultra Immersive Display with Moto Pen. Perfect for work and entertainment.',
        tenantId: 'store_002',
        metadata: {
          badge: 'New Arrival',
          sizes: ['12.1"'],
          colors: ['Gray', 'Blue', 'Rose Gold'],
          rating: 4.6,
          reviews: 180,
          brand: 'Motorola',
          material: 'Aluminum',
          care: 'Wipe with soft cloth'
        }
      },
      {
        _id: 'studio-pro-headphones',
        name: 'Studio Wireless Headphones',
        category: 'audio',
        price: 349,
        image: 'headphone.png',
        description: 'Over-ear noise-canceling acoustics in forest green. Immersive sound with 40-hour battery life.',
        tenantId: 'store_002',
        metadata: {
          badge: 'Top Rated',
          sizes: ['One Size'],
          colors: ['Forest Green', 'Black', 'White'],
          rating: 4.8,
          reviews: 560,
          brand: 'StudioPro',
          material: 'Leather',
          care: 'Wipe with soft cloth'
        }
      },
      {
        _id: 'champagne-gold-earbuds',
        name: 'Techio Gold Earbuds',
        category: 'audio',
        price: 199,
        image: 'earbud.png',
        description: 'Premium metallic finish with crystal clear audio. Active noise cancellation with 8-hour battery.',
        tenantId: 'store_002',
        metadata: {
          badge: 'Limited Edition',
          sizes: ['One Size'],
          colors: ['Champagne Gold', 'Silver', 'Black'],
          rating: 4.7,
          reviews: 280,
          brand: 'Techio',
          material: 'Metallic',
          care: 'Keep in charging case'
        }
      }
    ])
    console.log(`✅ Electronics: ${electronics.length} products`)

    // ============================================================
    // SUNGLASSES PRODUCTS
    // ============================================================
    const sunglasses = await Product.create([
      {
        _id: 'classic-gold-aviator',
        name: 'Classic Gold Aviator',
        category: 'aviator',
        price: 149,
        image: 'sunglass1.png',
        description: 'Polarized metal frame aviators with signature tear-drop UV400 lenses. Timeless design with premium craftsmanship.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Best Seller',
          sizes: ['One Size'],
          colors: ['Black'],
          rating: 4.9,
          reviews: 234,
          brand: 'Aviator Co.',
          material: 'Metal Alloy',
          care: 'Wipe with microfiber cloth'
        }
      },
      {
        _id: 'matte-black-wayfarer',
        name: 'Matte Black Wayfarer',
        category: 'wayfarer',
        price: 129,
        image: 'sunglass2.png',
        description: 'Lightweight acetate square frames with anti-reflective dark lenses. Classic wayfarer style with a modern matte finish.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Trending',
          sizes: ['One Size'],
          colors: ['Matte Black'],
          rating: 4.8,
          reviews: 189,
          brand: 'Wayfarer Studio',
          material: 'Acetate',
          care: 'Wipe with microfiber cloth'
        }
      },
      {
        _id: 'vintage-round-tortoise',
        name: 'Vintage Round Eyewear',
        category: 'round',
        price: 159,
        image: 'sunglass3.png',
        description: 'Retro tortoiseshell keyhole bridge sunglasses with green tinted lenses. Vintage charm with modern UV protection.',
        tenantId: 'store_001',
        metadata: {
          badge: 'New Arrival',
          sizes: ['One Size'],
          colors: ['Tortoise'],
          rating: 4.7,
          reviews: 156,
          brand: 'Vintage Eyewear',
          material: 'Acetate',
          care: 'Wipe with microfiber cloth'
        }
      }
    ])
    console.log(`✅ Sunglasses: ${sunglasses.length} products`)

    // ============================================================
    // BAGS & ACCESSORIES PRODUCTS
    // ============================================================
    const bags = await Product.create([
      {
        _id: 'lavie-paris-monogram-wallet',
        name: 'Lavie Paris Monogram Zip Wallet',
        category: 'wallets',
        price: 48,
        image: 'wallet2.png',
        description: 'Elegant textured black clutch wallet with gold hardware and snap closure. Perfect for carrying essentials in style.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Best Seller',
          sizes: ['One Size'],
          colors: ['Black'],
          rating: 4.9,
          reviews: 234,
          brand: 'Lavie Paris',
          material: 'Genuine Leather',
          care: 'Wipe with soft cloth'
        }
      },
      {
        _id: 'cream-crossbody-handbag',
        name: 'Cream Leatherette Crossbody Bag',
        category: 'handbags',
        price: 89,
        image: 'bag3.png',
        description: 'Off-white structured handbag featuring metallic buckle accent and thick webbed strap. Versatile for everyday use.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Trending',
          sizes: ['One Size'],
          colors: ['Cream'],
          rating: 4.8,
          reviews: 189,
          brand: 'Mirage Leather',
          material: 'Leatherette',
          care: 'Wipe with damp cloth'
        }
      },
      {
        _id: 'rugged-olive-canvas-duffel',
        name: 'Olive Canvas Travel Holdall Duffel',
        category: 'travel',
        price: 125,
        image: 'bag2.png',
        description: 'Heavy-duty canvas weekend duffel with dark brown leather trims and double handles. Built for the modern traveler.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Top Rated',
          sizes: ['One Size'],
          colors: ['Olive'],
          rating: 4.9,
          reviews: 156,
          brand: 'Travel Gear Co.',
          material: 'Canvas & Leather',
          care: 'Spot clean only'
        }
      },
      {
        _id: 'london-alley-leather-wallet',
        name: 'London Alley Leather Men\'s Wallet',
        category: 'wallets',
        price: 52,
        image: 'wallet1.png',
        description: 'Handcrafted dark green distressed leather bifold wallet with embossed stag design. Premium quality with RFID protection.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Gift Box',
          sizes: ['One Size'],
          colors: ['Green'],
          rating: 4.7,
          reviews: 112,
          brand: 'London Alley',
          material: 'Distressed Leather',
          care: 'Wipe with soft cloth'
        }
      },
      {
        _id: 'cute-character-kids-backpack',
        name: 'American Tourister Character Mini Pack',
        category: 'kids',
        price: 35,
        image: 'bag1.png',
        description: 'Adorable light blue character backpack designed with soft ears for daily adventures. Lightweight and kid-friendly.',
        tenantId: 'store_001',
        metadata: {
          badge: 'New Arrival',
          sizes: ['One Size'],
          colors: ['Blue'],
          rating: 4.8,
          reviews: 98,
          brand: 'American Tourister',
          material: 'Polyester',
          care: 'Machine washable'
        }
      }
    ])
    console.log(`✅ Bags & Accessories: ${bags.length} products`)

    // ============================================================
    // JEWELRY PRODUCTS
    // ============================================================
    const jewelry = await Product.create([
      {
        _id: 'celestial-silver-pendant-set',
        name: 'Celestial Crystal Pendant Set',
        category: 'pendants',
        price: 75,
        image: 'pandent1.png',
        description: 'Delicate silver chains featuring teardrop, starburst, heart, and crescent crystal pendants. Perfect for everyday elegance.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Trending',
          sizes: ['One Size'],
          colors: ['Silver'],
          rating: 4.9,
          reviews: 234,
          brand: 'Celestial Jewels',
          material: 'Sterling Silver',
          care: 'Wipe with soft cloth'
        }
      },
      {
        _id: 'gold-textured-link-bracelet',
        name: '24K Gold Textured Link Bracelet',
        category: 'bracelets',
        price: 195,
        image: 'bracelet2.png',
        description: 'Heavy textured gold block link bracelet set on a rich velvet display. A statement piece for any occasion.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Luxury',
          sizes: ['One Size'],
          colors: ['Gold'],
          rating: 5.0,
          reviews: 156,
          brand: 'Gold & Co.',
          material: '24K Gold Plated',
          care: 'Wipe with soft cloth'
        }
      },
      {
        _id: 'purple-beaded-bow-jewelry-set',
        name: 'Amethyst Crystal & Bow Charm Set',
        category: 'bracelets',
        price: 45,
        image: 'bracelet1.png',
        description: 'Crackled purple crystal beaded bracelet with matching enamel bow pendant necklace. Sweet and elegant.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Best Seller',
          sizes: ['One Size'],
          colors: ['Purple', 'Pink', 'Gold'],
          rating: 4.8,
          reviews: 189,
          brand: 'Crystal Charm',
          material: 'Crystal & Enamel',
          care: 'Wipe with soft cloth'
        }
      },
      {
        _id: 'bullet-pendant-steel-chain',
        name: 'Tactical Metallic Bullet Pendant',
        category: 'pendants',
        price: 65,
        image: 'pandent2.png',
        description: 'Urban brass bullet casing pendant paired with a durable stainless steel curb chain. Edgy and unique style.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Edgy Style',
          sizes: ['One Size'],
          colors: ['Brass', 'Silver'],
          rating: 4.7,
          reviews: 112,
          brand: 'Urban Steel',
          material: 'Brass & Steel',
          care: 'Wipe with soft cloth'
        }
      }
    ])
    console.log(`✅ Jewelry: ${jewelry.length} products`)

    // ============================================================
    // WATCHES PRODUCTS
    // ============================================================
    const watches = await Product.create([
      {
        _id: 'lois-caron-emerald-steel',
        name: 'Lois Caron Emerald Quartz Watch',
        category: 'mens',
        price: 119,
        image: 'watch1.png',
        description: 'Stainless steel bracelet featuring a deep emerald green sunburst dial with day-date display. Precision quartz movement with scratch-resistant glass.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Best Seller',
          sizes: ['One Size'],
          colors: ['Emerald Green', 'Silver'],
          rating: 4.9,
          reviews: 234,
          brand: 'Lois Caron',
          material: 'Stainless Steel',
          care: 'Wipe with soft cloth'
        }
      },
      {
        _id: 'rose-gold-butterfly-crystal',
        name: 'Rose Gold Floral Butterfly Watch',
        category: 'womens',
        price: 89,
        image: 'watch3.png',
        description: 'Faceted geometric glass bezel with a black dial decorated with rose gold butterflies and floral accents. Elegant and unique statement piece.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Trending',
          sizes: ['One Size'],
          colors: ['Rose Gold', 'Black'],
          rating: 4.8,
          reviews: 189,
          brand: 'Lois Caron',
          material: 'Stainless Steel',
          care: 'Wipe with soft cloth'
        }
      },
      {
        _id: 'monogram-r-silver-quartz',
        name: "Classic Initial 'R' Monogram Watch",
        category: 'mens',
        price: 95,
        image: 'watch2.png',
        description: 'Polished steel strap watch featuring a bold metallic copper monogram "R" centerpiece. Minimalist design with Japanese quartz movement.',
        tenantId: 'store_001',
        metadata: {
          badge: 'New Arrival',
          sizes: ['One Size'],
          colors: ['Silver', 'Rose Gold'],
          rating: 4.7,
          reviews: 156,
          brand: 'Lois Caron',
          material: 'Stainless Steel',
          care: 'Wipe with soft cloth'
        }
      }
    ])
    console.log(`✅ Watches: ${watches.length} products`)

    // ============================================================
    // FOOTWEAR PRODUCTS
    // ============================================================
    const footwear = await Product.create([
      {
        _id: 'patent-leather-loafer',
        name: 'Classic Deep Brown Patent Loafers',
        category: 'formal',
        price: 129,
        image: 'shoes2.png',
        description: 'Polished patent leather slip-on loafers detailed with a metallic horsebit buckle. Perfect for formal occasions and office wear.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Formal Luxury',
          sizes: ['7', '8', '9', '10', '11', '12'],
          colors: ['Deep Brown', 'Black', 'Tan'],
          rating: 4.9,
          reviews: 234,
          brand: 'Luxury Steps',
          material: 'Patent Leather',
          care: 'Wipe with soft cloth'
        }
      },
      {
        _id: 'strappy-stiletto-mules',
        name: 'Lavie Animal Print Strappy Mules',
        category: 'heels',
        price: 85,
        image: 'heel1.png',
        description: 'Chic square-toe kitten heels with crisscross animal-print straps for evening glam. Comfortable height with trendy design.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Trending',
          sizes: ['5', '6', '7', '8', '9'],
          colors: ['Animal Print', 'Black', 'Nude'],
          rating: 4.8,
          reviews: 189,
          brand: 'Lavie',
          material: 'Synthetic Leather',
          care: 'Wipe with damp cloth'
        }
      },
      {
        _id: 'embellished-ethnic-jutti',
        name: 'Royal Pearl & Gold Embellished Jutti',
        category: 'ethnic',
        price: 95,
        image: 'heel2.png',
        description: 'Intricately hand-beaded bridal juttis adorned with pearls, sequins, and metallic gold lining. Perfect for weddings and festive occasions.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Handcrafted',
          sizes: ['5', '6', '7', '8', '9'],
          colors: ['Gold', 'Rose Gold', 'Silver'],
          rating: 5.0,
          reviews: 156,
          brand: 'Ethnic Heritage',
          material: 'Leather & Beads',
          care: 'Dry clean only'
        }
      },
      {
        _id: 'cushioned-runner-sneaker',
        name: 'Pro-Performance Lightweight Runners',
        category: 'sports',
        price: 110,
        image: 'shoes1.png',
        description: 'Aerodynamic mesh running shoes with thick impact-absorbing soles and vibrant gradient accents. Ideal for running and daily workouts.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Best Seller',
          sizes: ['6', '7', '8', '9', '10', '11', '12'],
          colors: ['Blue Gradient', 'Red/Black', 'White/Grey'],
          rating: 4.7,
          reviews: 320,
          brand: 'ProPerformance',
          material: 'Mesh & Rubber',
          care: 'Machine washable'
        }
      },
      {
        _id: 'classic-oxford-brogue',
        name: 'Classic Oxford Brogue Shoes',
        category: 'formal',
        price: 159,
        image: 'footwear.png',
        description: 'Timeless brogue detailing with premium leather upper. Wingtip perforations add classic sophistication to any formal ensemble.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Heritage',
          sizes: ['7', '8', '9', '10', '11'],
          colors: ['Tan', 'Dark Brown', 'Black'],
          rating: 4.9,
          reviews: 210,
          brand: 'Oxford Heritage',
          material: 'Genuine Leather',
          care: 'Polish regularly'
        }
      }
    ])
    console.log(`✅ Footwear: ${footwear.length} products`)

    console.log('\n✨ Database seeded successfully!')
    console.log('\n📊 Products Summary:')
    console.log(`   👗 Women\'s Fashion: ${womenFashion.length}`)
    console.log(`   👔 Men\'s Fashion: ${menFashion.length}`)
    console.log(`   📱 Electronics: ${electronics.length}`)
    console.log(`   🕶️ Sunglasses: ${sunglasses.length}`)
    console.log(`   👜 Bags & Accessories: ${bags.length}`)
    console.log(`   💎 Jewelry: ${jewelry.length}`)
    console.log(`   ⌚ Watches: ${watches.length}`)
    console.log(`   👟 Footwear: ${footwear.length}`)
    console.log(`   📦 Total: ${womenFashion.length + menFashion.length + electronics.length + sunglasses.length + bags.length + jewelry.length + watches.length + footwear.length} products`)

    console.log('\n📋 Test Credentials:')
    console.log('   Super Admin: admin@multitenant.com / admin123')
    console.log('   Fashion Vendor: fashion@store.com / vendor123')
    console.log('   Electronics Vendor: electronics@store.com / vendor123')
    console.log('   Customer: customer@example.com / customer123')

    console.log('\n🔗 Product IDs:')
    console.log('\n👗 Women\'s Fashion:')
    womenFashion.forEach(p => console.log(`   ${p._id}`))
    console.log('\n👔 Men\'s Fashion:')
    menFashion.forEach(p => console.log(`   ${p._id}`))
    console.log('\n📱 Electronics:')
    electronics.forEach(p => console.log(`   ${p._id}`))
    console.log('\n🕶️ Sunglasses:')
    sunglasses.forEach(p => console.log(`   ${p._id}`))
    console.log('\n👜 Bags & Accessories:')
    bags.forEach(p => console.log(`   ${p._id}`))
    console.log('\n💎 Jewelry:')
    jewelry.forEach(p => console.log(`   ${p._id}`))
    console.log('\n⌚ Watches:')
    watches.forEach(p => console.log(`   ${p._id}`))
    console.log('\n👟 Footwear:')
    footwear.forEach(p => console.log(`   ${p._id}`))

    process.exit(0)
  } catch (err) {
    console.error('❌ Seeding error:', err)
    process.exit(1)
  }
}

seedDB()