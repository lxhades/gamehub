import PurchaseHistory from '../models/PurchaseHistory.js';
import Wallet from '../models/Wallet.js';
import Game from '../models/Game.js';

export const buyGame = async (req, res) => {
  try {
    const { userId, gameId } = req.body;

    const game = await Game.findById(gameId);
    const wallet = await Wallet.findOne({ user: userId });

    if (!wallet || wallet.points < game.price)
      return res.status(400).json({ message: 'Không đủ điểm' });

    wallet.points -= game.price;
    await wallet.save();

    const purchase = await PurchaseHistory.create({
      user: userId,
      game: gameId,
      price: game.price,
      purchaseDate: new Date(),
    });

    res.status(201).json({ message: 'Mua game thành công', purchase });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};

export const getPurchaseHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await PurchaseHistory.find({ user: userId })
      .populate('game', 'title price')
      .populate('user', 'email');
    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};
