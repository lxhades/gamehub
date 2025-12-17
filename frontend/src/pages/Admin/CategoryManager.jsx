import React, { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";

const CategoryManager = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(null);

  const fetchCategories = async () => {
    const res = await axiosClient.get("/categories");
    setCategories(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editing) {
      await axiosClient.put(`/categories/${editing._id}`, { name });
    } else {
      await axiosClient.post("/categories", { name });
    }
    setName("");
    setEditing(null);
    fetchCategories();
  };

  const handleEdit = (cat) => {
    setEditing(cat);
    setName(cat.name);
  };

  const handleDelete = async (id) => {
    window.alert("Bạn có muốn xóa thể loại này không ?")
    await axiosClient.delete(`/categories/${id}`);
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Quản lý thể loại game</h2>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Tên thể loại"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded w-64"
        />
        <input
          type="text"
          placeholder="Mô tả"
          className="border p-2 rounded w-64"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editing ? "Cập nhật" : "Thêm"}
        </button>
      </form>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2 w-1/2">Tên thể loại</th>
            <th className="border p-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td className="border p-2">{cat.name}</td>
              <td className="border p-2 text-center space-x-2">
                <button
                  onClick={() => handleEdit(cat)}
                  className="bg-yellow-400 text-white px-3 py-1 rounded"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
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

export default CategoryManager;
