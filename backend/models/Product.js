const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
  _id: { 
    type: String, 
    required: true 
  },
  name: { type: String, required: true },
  category: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
  description: { type: String },
  tenantId: { type: String, required: true },
  metadata: { 
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, { 
  timestamps: true,
  _id: false 
})

module.exports = mongoose.model('Product', ProductSchema)