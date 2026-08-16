const mongoose = require('mongoose')

const StoreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  tenantId: { type: String, required: true, unique: true },
  metadata: { type: Object }
}, { timestamps: true })

module.exports = mongoose.model('Store', StoreSchema)
