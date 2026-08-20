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
      metadata: {
        description: 'Latest fashion and apparel'
      }
    })
    console.log('✅ Store 1 (Fashion) created:', store1.name)

    const store2 = await Store.create({
      name: 'Electronics Hub',
      ownerId: vendor2._id,
      tenantId: 'store_002',
      metadata: {
        description: 'Premium electronics and gadgets'
      }
    })
    console.log('✅ Store 2 (Electronics) created:', store2.name)

    // ============================================================
    // WOMEN'S FASHION PRODUCTS - USING PLACEHOLDER IMAGES
    // The frontend will replace these with local images
    // ============================================================
    const womenFashion = await Product.create([{
        _id: 'featured-dress-01',
        name: 'Off-Shoulder Silk Evening Gown',
        category: 'Dresses',
        price: 450,
        image: '/images/dress.png', // Frontend will map this
        description: 'Sculpted drape bodice with an asymmetric train. Crafted from pure silk with hand-embroidered details.',
        tenantId: 'store_001',
        metadata: {
        badge: 'Couture',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
          colors: [{
              name: 'Black',
              image: '/images/dress.png'
            },
            {
              name: 'Red',
              image: '/images/dress1.png'
            }
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
        image: '/images/top.png',
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
        image: '/images/trouser.png', // ← This gets mapped to trouserImg
        description: 'High-waisted silhouette in mocha wool blend. Effortless elegance for the modern woman.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Tailored',
          sizes: ['XS', 'S', 'M', 'L', 'XL'],
          colors: [{
              name: 'Coffee Brown',
              image: '/images/trouser.png'
            },
            {
              name: 'Beige',
              image: '/images/trouser1.png'
            }
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
        image: '/images/anarkali.png',
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
    // ELECTRONICS PRODUCTS
    // ============================================================
    const electronics = await Product.create([{
        _id: 'elec-01',
        name: 'Wireless Headphones Pro',
        category: 'Electronics',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop',
        description: 'Premium wireless headphones with active noise cancellation.',
        tenantId: 'store_002',
        metadata: {
          badge: 'Best Seller',
          rating: 4.8,
          reviews: 450,
          brand: 'AudioTech'
        }
      },
      {
        _id: 'elec-02',
        name: 'Smart Watch Series 8',
        category: 'Electronics',
        price: 349.99,
        image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&h=600&fit=crop',
        description: 'Advanced health tracking with ECG and blood oxygen monitoring.',
        tenantId: 'store_002',
        metadata: {
          badge: 'New',
          rating: 4.7,
          reviews: 320,
          brand: 'TechWear'
        }
      },
      {
        _id: 'elec-03',
        name: 'USB-C Fast Charger',
        category: 'Accessories',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=600&h=600&fit=crop',
        description: '65W GaN fast charger with 2 USB-C ports.',
        tenantId: 'store_002',
        metadata: {
          badge: 'Essential',
          rating: 4.5,
          reviews: 180,
          brand: 'ChargePro'
        }
      }
    ])
    console.log(`✅ Electronics: ${electronics.length} products`)

    // ============================================================
    // MEN'S FASHION PRODUCTS
    // ============================================================
    const menFashion = await Product.create([{
        _id: 'men-suit-01',
        name: 'Tailored Wool Suit',
        category: 'Suits',
        price: 599,
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop',
        description: 'Sharp tailored wool suit with a modern slim fit silhouette.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Couture',
          sizes: ['38R', '40R', '42R', '44R', '46R'],
          colors: ['Navy', 'Charcoal', 'Black'],
          rating: 4.9,
          reviews: 156,
          brand: 'Savile Row',
          material: 'Pure Wool',
          care: 'Dry clean only'
        }
      },
      {
        _id: 'men-jacket-02',
        name: 'Leather Biker Jacket',
        category: 'Jackets',
        price: 349,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=800&fit=crop',
        description: 'Premium leather biker jacket with classic hardware details.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Trending',
          sizes: ['S', 'M', 'L', 'XL'],
          colors: ['Black', 'Brown'],
          rating: 4.7,
          reviews: 89,
          brand: 'Heritage Leather',
          material: 'Genuine Leather',
          care: 'Leather care required'
        }
      },
      {
        _id: 'men-shirt-03',
        name: 'Italian Linen Shirt',
        category: 'Shirts',
        price: 149,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=800&fit=crop',
        description: 'Breathable Italian linen shirt for timeless elegance.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Essential',
          sizes: ['S', 'M', 'L', 'XL'],
          colors: ['White', 'Blue', 'Beige'],
          rating: 4.6,
          reviews: 67,
          brand: 'Linen Luxe',
          material: '100% Linen',
          care: 'Machine wash cold'
        }
      },
      {
        _id: 'men-watch-04',
        name: 'Automatic Dress Watch',
        category: 'Watches',
        price: 799,
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=800&fit=crop',
        description: 'Swiss automatic movement with a classic leather strap.',
        tenantId: 'store_001',
        metadata: {
          badge: 'Heritage',
          sizes: ['One Size'],
          colors: ['Gold', 'Silver', 'Rose Gold'],
          rating: 4.9,
          reviews: 203,
          brand: 'Horology Swiss',
          material: 'Stainless Steel',
          care: 'Wipe clean'
        }
      }
    ])
    console.log(`✅ Men's Fashion: ${menFashion.length} products`)

    console.log('\n✨ Database seeded successfully!')
    console.log('\n📊 Products Summary:')
    console.log(`   👗 Women\'s Fashion: ${womenFashion.length}`)
    console.log(`   👔 Men\'s Fashion: ${menFashion.length}`)
    console.log(`   📱 Electronics: ${electronics.length}`)
    console.log(`   📦 Total: ${womenFashion.length + menFashion.length + electronics.length} products`)

    console.log('\n📋 Test Credentials:')
    console.log('   Super Admin: admin@multitenant.com / admin123')
    console.log('   Fashion Vendor: fashion@store.com / vendor123')
    console.log('   Electronics Vendor: electronics@store.com / vendor123')
    console.log('   Customer: customer@example.com / customer123')

    console.log('\n🔗 Product IDs:')
    womenFashion.forEach(p => console.log(`   ${p._id}`))
    menFashion.forEach(p => console.log(`   ${p._id}`))
    electronics.forEach(p => console.log(`   ${p._id}`))

    process.exit(0)
  } catch (err) {
    console.error('❌ Seeding error:', err)
    process.exit(1)
  }
}

seedDB()