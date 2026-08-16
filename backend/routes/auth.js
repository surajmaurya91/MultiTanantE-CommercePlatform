const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, tenantId } = req.body
    if (!name || !email || !password) return res.status(400).json({ msg: 'Missing fields' })
    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ msg: 'User already exists' })
    const hashed = await bcrypt.hash(password, 10)
    user = new User({ name, email, password: hashed, role: role || 'customer', tenantId })
    await user.save()
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' })
    res.status(201).json({ user: { _id: user._id, name: user.name, email: user.email, role: user.role, tenantId: user.tenantId }, token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Server error' })
  }
})

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ msg: 'Missing fields' })
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' })
    const ok = await bcrypt.compare(password, user.password)
    if (!ok) return res.status(400).json({ msg: 'Invalid credentials' })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' })
    res.json({ user: { _id: user._id, name: user.name, email: user.email, role: user.role, tenantId: user.tenantId }, token })
  } catch (err) {
    console.error(err)
    res.status(500).json({ msg: 'Server error' })
  }
})

module.exports = router
