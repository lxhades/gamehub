const mongoose = require("mongoose");

const UserGameSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    gameId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game",
        required: true
    },
    priceAtPurchase: {
        type: Number,
        required: true
    },
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["success", "refunded", "canceled"],
        default: "success"
    }
});

module.exports = mongoose.model("UserGame", UserGameSchema);
