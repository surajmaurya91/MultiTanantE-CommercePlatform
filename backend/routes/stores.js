const express = require('express')
const router = express.Router()
const Store = require('../models/Store')
const auth = require('../middleware/auth')

// GET /api/stores
router.get('/', async (req, res) => {
  try {
    const stores = await Store.find()
    res.json(stores)
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Server error' })
  }
})

// POST /api/stores (protected vendor)
router.post('/', auth, async (req, res) => {
  try {
    // Vendors or admins can create stores
    if (!['vendor','admin','superadmin'].includes(req.user.role)) return res.status(403).json({ msg: 'Forbidden' })
    const { name, tenantId, metadata } = req.body
    if (!name || !tenantId) return res.status(400).json({ msg: 'Missing fields' })
    const existing = await Store.findOne({ tenantId })
    if (existing) return res.status(400).json({ msg: 'tenantId already exists' })
    const store = new Store({ name, tenantId, ownerId: req.user._id, metadata })
    await store.save()
    res.status(201).json(store)
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Server error' })
  }
})

module.exports = router
