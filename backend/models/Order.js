const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  items: [{ productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, qty: Number }],
  total: { type: Number, required: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tenantId: { type: String },
  payment: { type: Object },
  status: { type: String, default: 'Pending' }
}, { timestamps: true })

module.exports = mongoose.model('Order', OrderSchema)
