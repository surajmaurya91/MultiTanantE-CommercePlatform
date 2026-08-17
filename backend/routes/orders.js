const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const Product = require('../models/Product')
const auth = require('../middleware/auth')

// GET /api/orders (protected - get user's orders)
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.user._id }).populate('items.productId', 'name price')
    res.json(orders)
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Server error' })
  }
})

// GET /api/orders/:id (protected - get specific order)
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.productId', 'name price')
    if (!order) return res.status(404).json({ msg: 'Order not found' })
    // Only customer, vendor of that store, or admin can view order
    if (req.user._id.toString() !== order.customerId.toString() && !['admin','superadmin'].includes(req.user.role)) {
      return res.status(403).json({ msg: 'Forbidden' })
    }
    res.json(order)
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Server error' })
  }
})

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

    const order = new Order({ 
      items: items.map(i => ({ productId: i.productId, qty: i.qty })), 
      total, 
      customerId: req.user._id, 
      tenantId, 
      payment, 
      status: payment && payment.method === 'mock' ? 'Paid' : 'Pending' 
    })
    await order.save()
    res.status(201).json({ order })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Server error' })
  }
})

// PUT /api/orders/:id (protected - update order status)
router.put('/:id', auth, async (req, res) => {
  try {
    if (!['admin','superadmin'].includes(req.user.role)) return res.status(403).json({ msg: 'Forbidden' })
    const { status } = req.body
    if (!status) return res.status(400).json({ msg: 'Status required' })
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!order) return res.status(404).json({ msg: 'Order not found' })
    res.json(order)
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Server error' })
  }
})

module.exports = router
