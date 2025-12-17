import { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({
    name: "",
    avatar: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    axios.get("http://localhost:3000/api/users/profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      setUser(res.data);
      setForm({
        name: res.data.name || "",
        avatar: res.data.avatar || "",
        dateOfBirth: res.data.dateOfBirth
          ? res.data.dateOfBirth.slice(0, 10)
          : "",
      });
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const res = await axios.put(
        "http://localhost:3000/api/users/profile",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setEdit(false);
      alert("Cập nhật thành công");
    } catch (err) {
      alert("Cập nhật thất bại");
    }
  };

  if (!user) return <p className="text-center mt-10">Đang tải...</p>;

  return (
    <>
      <Header />
      <div className="bg-gray-900 min-h-screen text-white flex justify-center items-start pt-10">
        <div className="bg-gray-800 p-8 rounded-xl w-full max-w-md shadow-lg">
          {/* Avatar */}
          <img
            src={edit ? form.avatar : user.avatar}
            alt="avatar"
            className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 object-cover"
          />

          {/* FORM EDIT */}
          {edit ? (
            <div className="mt-6 space-y-4">
              <div>
                <label className="block mb-1 text-sm">Avatar URL</label>
                <input
                  name="avatar"
                  value={form.avatar}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white text-black"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">Họ và tên</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white text-black"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm">Ngày sinh</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={form.dateOfBirth}
                  onChange={handleChange}
                  className="w-full p-2 rounded bg-white text-black"
                />
              </div>

              <div className="flex justify-between mt-6">
                <button
                  onClick={handleUpdate}
                  className="bg-green-600 px-4 py-2 rounded hover:bg-green-700"
                >
                  Lưu
                </button>
                <button
                  onClick={() => setEdit(false)}
                  className="bg-gray-600 px-4 py-2 rounded hover:bg-gray-700"
                >
                  Hủy
                </button>
              </div>
            </div>
          ) : (
            /* VIEW MODE */
            <div className="mt-6 text-center space-y-2">
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-gray-300">Email: {user.email}</p>
              <p className="text-gray-300">
                Ngày sinh:{" "}
                {user.dateOfBirth
                  ? new Date(user.dateOfBirth).toLocaleDateString("vi-VN")
                  : "Chưa cập nhật"}
              </p>

              <button
                onClick={() => setEdit(true)}
                className="mt-4 bg-blue-600 px-6 py-2 rounded hover:bg-blue-700"
              >
                Chỉnh sửa
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
