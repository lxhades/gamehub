import React, { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  // 🔹 Lấy danh sách user
  const fetchData = async () => {
    try {
      const res = await axiosClient.get("/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Lỗi khi tải user:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔹 Thay đổi input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Thêm hoặc cập nhật user
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Không được để trống tên hoặc email!");
      return;
    }

    try {
      if (editingId) {
        await axiosClient.put(`/users/${editingId}`, formData);
      } else {
        await axiosClient.post("/users", formData);
      }

      setFormData({ name: "", email: "", password: "", role: "user" });
      setEditingId(null);
      fetchData();
    } catch (err) {
      console.error("Lỗi khi lưu user:", err);
    }
  };

  // 🔹 Chọn user để sửa
  const handleEdit = (u) => {
    setEditingId(u._id);
    setFormData({
      name: u.name || "",
      email: u.email,
      password: "",
      role: u.role || "user",
    });
  };

  // 🔹 Xóa user
  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc muốn xóa user này?")) return;
    await axiosClient.delete(`/users/${id}`);
    fetchData();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">👤 Quản trị User</h1>

      {/* --- Form --- */}
      <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-xl shadow-md mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Tên người dùng"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="border p-2 rounded col-span-2"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 mt-4 rounded hover:bg-blue-700"
        >
          {editingId ? "Cập nhật" : "Thêm mới"}
        </button>
      </form>

      {/* --- Danh sách user --- */}
      <table className="w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border p-2">Tên</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Vai trò</th>
            <th className="border p-2 text-center">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id} className="hover:bg-gray-50">
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.role}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => handleEdit(u)}
                  className="bg-yellow-400 px-3 py-1 rounded mr-2 hover:bg-yellow-500"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(u._id)}
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

export default UserManager;
