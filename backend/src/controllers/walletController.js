import Wallet from '../models/Wallet.js';

export const getWallet = async (req, res) => {
  try {
    const { userId } = req.params;
    const wallet = await Wallet.findOne({ user: userId });
    if (!wallet) return res.status(404).json({ message: 'Không tìm thấy ví' });
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};


export const addPoints = async (req, res) => {
  try {
    const { userId, points } = req.body;
    const wallet = await Wallet.findOneAndUpdate(
      { user: userId },
      { $inc: { points } },
      { new: true }
    );
    res.json({ message: 'Nạp point thành công', wallet });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server', error: error.message });
  }
};
