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

    // Create Vendor 1
    const hashedVendor1Password = await bcrypt.hash('vendor123', 10)
    const vendor1 = await User.create({
      name: 'Vendor One',
      email: 'vendor1@store.com',
      password: hashedVendor1Password,
      role: 'vendor',
      tenantId: 'store_001'
    })
    console.log('✅ Vendor 1 created:', vendor1.email)

    // Create Vendor 2
    const hashedVendor2Password = await bcrypt.hash('vendor123', 10)
    const vendor2 = await User.create({
      name: 'Vendor Two',
      email: 'vendor2@store.com',
      password: hashedVendor2Password,
      role: 'vendor',
      tenantId: 'store_002'
    })
    console.log('✅ Vendor 2 created:', vendor2.email)

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
      name: 'Electronics Hub',
      ownerId: vendor1._id,
      tenantId: 'store_001',
      metadata: { description: 'Premium electronics and gadgets' }
    })
    console.log('✅ Store 1 created:', store1.name)

    const store2 = await Store.create({
      name: 'Fashion Central',
      ownerId: vendor2._id,
      tenantId: 'store_002',
      metadata: { description: 'Latest fashion and apparel' }
    })
    console.log('✅ Store 2 created:', store2.name)

    // Create Products for Store 1
    const products1 = await Product.create([
      {
        name: 'Wireless Headphones',
        category: 'Electronics',
        price: 79.99,
        image: 'https://via.placeholder.com/300x200?text=Wireless+Headphones',
        description: 'High-quality wireless headphones with noise cancellation',
        tenantId: 'store_001'
      },
      {
        name: 'USB-C Cable',
        category: 'Accessories',
        price: 12.99,
        image: 'https://via.placeholder.com/300x200?text=USB-C+Cable',
        description: 'Durable USB-C charging cable',
        tenantId: 'store_001'
      },
      {
        name: 'Phone Stand',
        category: 'Accessories',
        price: 15.99,
        image: 'https://via.placeholder.com/300x200?text=Phone+Stand',
        description: 'Adjustable phone stand for desk',
        tenantId: 'store_001'
      }
    ])
    console.log('✅ Store 1 products created:', products1.length)

    // Create Products for Store 2
    const products2 = await Product.create([
      {
        name: 'Cotton T-Shirt',
        category: 'Clothing',
        price: 24.99,
        image: 'https://via.placeholder.com/300x200?text=Cotton+T-Shirt',
        description: 'Comfortable 100% cotton t-shirt',
        tenantId: 'store_002'
      },
      {
        name: 'Blue Jeans',
        category: 'Clothing',
        price: 54.99,
        image: 'https://via.placeholder.com/300x200?text=Blue+Jeans',
        description: 'Premium denim jeans',
        tenantId: 'store_002'
      },
      {
        name: 'Leather Belt',
        category: 'Accessories',
        price: 34.99,
        image: 'https://via.placeholder.com/300x200?text=Leather+Belt',
        description: 'Classic leather belt',
        tenantId: 'store_002'
      }
    ])
    console.log('✅ Store 2 products created:', products2.length)

    console.log('\n✨ Database seeded successfully!')
    console.log('\n📋 Test Credentials:')
    console.log('   Super Admin: admin@multitenant.com / admin123')
    console.log('   Vendor 1: vendor1@store.com / vendor123')
    console.log('   Vendor 2: vendor2@store.com / vendor123')
    console.log('   Customer: customer@example.com / customer123')

    process.exit(0)
  } catch (err) {
    console.error('❌ Seeding error:', err)
    process.exit(1)
  }
}

seedDB()
