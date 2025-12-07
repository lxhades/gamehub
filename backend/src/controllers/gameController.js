import Game from "../models/Game.js";
import Category from "../models/Category.js"
// 🟢 Tạo game mới
export const createGame = async (req, res) => {
  try {
    const game = new Game(req.body);
    const savedGame = await game.save();
    res.status(201).json(savedGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🔵 Lấy tất cả game (có thể lọc theo category)
export const getAllGames = async (req, res) => {
  try {
    const { categories } = req.query;
    let filter = {};

    if (categories) {
   
      const categoryArray = categories.split(",");
      filter.categories = { $in: categoryArray };
    }

    const games = await Game.find(filter).populate("categories");
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟡 Lấy game theo ID
export const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id).populate("categories");
    if (!game) return res.status(404).json({ message: "Game not found" });
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🟠 Cập nhật game
export const updateGame = async (req, res) => {
  try {
    const updatedGame = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedGame)
      return res.status(404).json({ message: "Game not found" });
    res.json(updatedGame);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🔴 Xóa game
export const deleteGame = async (req, res) => {
  try {
    const deletedGame = await Game.findByIdAndDelete(req.params.id);
    if (!deletedGame)
      return res.status(404).json({ message: "Game not found" });
    res.json({ message: "Game deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getGamesByCategoryName = async (req, res) => {
  try {
    const { name } = req.params;

    // Tìm thể loại theo tên
    const category = await Category.findOne({ name: name.trim() });
    if (!category) {
      return res.status(404).json({ message: "Không tìm thấy thể loại này" });
    }

    // Lấy tất cả game có chứa ID thể loại này
    const games = await Game.find({ categories: category._id }).populate("categories");
    if (games.length === 0) {
      return res.status(200).json({ message: "Không có game nào trong thể loại này", games: [] });
    }

    res.json(games);
  } catch (err) {
    console.error("Lỗi khi lấy game theo thể loại:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
export const searchGame=async (req,res)=> {
  const keyword = req.query.q || req.query.query || "";
  try {
    const games = await Game.find({
      name: { $regex: keyword, $options: "i" }
    }).populate("categories");
    res.json(games);
  } catch (err) {
  console.error("Error in /search:", err);
  res.status(500).json({ message: err.message, stack: err.stack });
}}