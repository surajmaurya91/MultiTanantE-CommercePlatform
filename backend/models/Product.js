const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
  tenantId: { type: String, required: true }
}, { timestamps: true })

module.exports = mongoose.model('Product', ProductSchema)
