const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  points: { type: Number, default: 10000 },
  lastUpdated: { type: Date, default: Date.now },
}, { versionKey: false });

module.exports = mongoose.model('Wallet', walletSchema);
