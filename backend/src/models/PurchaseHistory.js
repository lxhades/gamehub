const mongoose = require('mongoose');

const purchaseHistorySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  game: { type: mongoose.Schema.Types.ObjectId, ref: 'Game' },
  price: { type: Number, required: true },
  purchaseDate: { type: Date, default: Date.now },
}, { versionKey: false });

module.exports = mongoose.model('PurchaseHistory', purchaseHistorySchema);
