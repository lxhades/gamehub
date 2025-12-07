import React, { useState, useEffect } from "react";

import axiosClient from "../../api/axiosClient";

const GameManager = () => {
  const [games, setGames] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    images: "",
    videos: "",
    price: "",
    releaseYear: "",
    purchaseCount: "",
    categories: [],
  });

  // 🔹 Lấy danh sách game + thể loại
  const fetchData = async () => {
    try {
      const [gameRes, catRes] = await Promise.all([
        axiosClient.get("/games"),
        axiosClient.get("/categories"),
      ]);
      setGames(gameRes.data);
      setCategories(catRes.data);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu game, thể loại:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Xử lý thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Chọn thể loại
  const handleCategoryChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (const opt of options) {
      if (opt.selected) selected.push(opt.value);
    }
    setFormData((prev) => ({ ...prev, categories: selected }));
  };

  // 🔹 Tạo mới hoặc cập nhật
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
        !formData.name.trim() ||
        !formData.description.trim() ||
        !formData.price ||
        formData.categories.length === 0
        ) {
        alert("Không được để trống trường tên, mô tả, giá, thể loại");
        return;}
    else{
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        releaseYear: Number(formData.releaseYear),
        purchaseCount: Number(formData.purchaseCount || 0),
        images: formData.images
          ? formData.images.split(",").map((s) => s.trim())
          : [],
        videos: formData.videos
          ? formData.videos.split(",").map((s) => s.trim())
          : [],
      };

      if (editingId) {
        await axiosClient.put(`games/${editingId}`, payload);
      } else {
        await axiosClient.post('games', payload);
      }

      setEditingId(null);
      setFormData({
        name: "",
        description: "",
        images: "",
        videos: "",
        price: "",
        releaseYear: "",
        purchaseCount: "",
        categories: [],
      });
      fetchData();
    } catch (err) {
      console.error("Lỗi khi lưu game:", err);
    }}
  };

  // 🔹 Chọn game để sửa
  const handleEdit = (g) => {
    setEditingId(g._id);
    setFormData({
      name: g.name,
      description: g.description,
      images: g.images?.join(", ") || "",
      videos: g.videos?.join(", ") || "",
      price: g.price || "",
      releaseYear: g.releaseYear || "",
      purchaseCount: g.purchaseCount || "",
      categories: g.categories?.map((c) => c._id || c) || [],
    });
  };

  // 🔹 Xóa game
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa game này?")) return;
    await axiosClient.delete(`games/${id}`);
    fetchData();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">🎮 Quản trị Game</h1>

      {/* --- Form --- */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded-xl shadow-md mb-8"
      >
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Tên game"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            placeholder="Giá"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="releaseYear"
            value={formData.releaseYear}
            placeholder="Năm phát hành"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <input
            type="number"
            name="purchaseCount"
            value={formData.purchaseCount}
            placeholder="Lượt mua"
            onChange={handleChange}
            className="border p-2 rounded"
          />
          <textarea
            name="description"
            value={formData.description}
            placeholder="Mô tả"
            onChange={handleChange}
            className="border p-2 rounded col-span-2"
            rows="3"
          />
          <input
            type="text"
            name="images"
            value={formData.images}
            placeholder="Link ảnh (ngăn cách bằng dấu ,)"
            onChange={handleChange}
            className="border p-2 rounded col-span-2"
          />
          <input
            type="text"
            name="videos"
            value={formData.videos}
            placeholder="Link video (ngăn cách bằng dấu ,)"
            onChange={handleChange}
            className="border p-2 rounded col-span-2"
          />
          <select
            multiple
            value={formData.categories}
            onChange={handleCategoryChange}
            className="border p-2 rounded col-span-2 h-28"
          >
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 mt-4 rounded hover:bg-blue-700"
        >
          {editingId ? "Cập nhật" : "Thêm mới"}
        </button>
      </form>

      {/* --- Danh sách game --- */}
      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border p-2">Tên game</th>
            <th className="border p-2">Giá</th>
            <th className="border p-2">Năm</th>
            <th className="border p-2">Thể loại</th>
            <th className="border p-2">Ảnh</th>
            <th className="border p-2">Lượt mua</th>
            <th className="border p-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {games.map((g) => (
            <tr key={g._id} className="hover:bg-gray-50">
              <td className="border p-2">{g.name}</td>
              <td className="border p-2">{g.price}₫</td>
              <td className="border p-2">{g.releaseYear}</td>
              <td className="border p-2">
                {g.categories
                  ?.map((c) => (typeof c === "object" ? c.name : c))
                  .join(", ")}
              </td>
              <td className="border p-2">
                {g.images?.length > 0 && (
                  <img
                    src={g.images[0]}
                    alt="game"
                    className="w-16 h-16 object-cover rounded"
                  />
                )}
              </td>
              <td className="border p-2">{g.purchaseCount}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleEdit(g)}
                  className="bg-yellow-400 px-3 py-1 rounded mr-2 hover:bg-yellow-500"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(g._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GameManager;
