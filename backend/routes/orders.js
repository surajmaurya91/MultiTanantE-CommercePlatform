const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const Product = require('../models/Product')
const auth = require('../middleware/auth')

// POST /api/orders
router.post('/', auth, async (req, res) => {
  try {
    const { items, total, tenantId, payment } = req.body
    if (!items || !total) return res.status(400).json({ msg: 'Missing fields' })

    // Basic validation: ensure product ids exist
    for (let it of items) {
      const p = await Product.findById(it.productId)
      if (!p) return res.status(400).json({ msg: `Product ${it.productId} not found` })
    }

    const order = new Order({ items: items.map(i => ({ productId: i.productId, qty: i.qty })), total, customerId: req.user._id, tenantId, payment, status: payment && payment.method === 'mock' ? 'Paid' : 'Pending' })
    await order.save()
    res.status(201).json({ order })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Server error' })
  }
})

module.exports = router
