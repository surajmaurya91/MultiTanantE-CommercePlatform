const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const auth = require('../middleware/auth')

// GET /api/products?tenantId=...
router.get('/', async (req, res) => {
  try {
    const filter = {}
    if (req.query.tenantId) filter.tenantId = req.query.tenantId
    const products = await Product.find(filter)
    res.json(products)
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Server error' })
  }
})

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) return res.status(404).json({ msg: 'Not found' })
    res.json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Server error' })
  }
})

// POST /api/products  (protected vendor)
router.post('/', auth, async (req, res) => {
  try {
    // Only vendors allowed to create products (or admins)
    if (!['vendor','admin','superadmin'].includes(req.user.role)) return res.status(403).json({ msg: 'Forbidden' })
    const { name, category, price, image, description, tenantId } = req.body
    if (!name || !price || !tenantId) return res.status(400).json({ msg: 'Missing fields' })
    const product = new Product({ name, category, price, image, description, tenantId })
    await product.save()
    res.status(201).json(product)
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Server error' })
  }
})

module.exports = router
