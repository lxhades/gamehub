const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    images: [String],
    videos: [String],
    price: { type: Number, required: true, min: 0 },
    releaseYear: { type: Number, default: new Date().getFullYear() },
    purchaseCount: { type: Number, default: 0 },
    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Game', gameSchema);
