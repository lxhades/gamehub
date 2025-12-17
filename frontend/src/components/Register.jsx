import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3000/api/users/register", { email, password });
      alert(res.data.message);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    } catch (error) {
      alert(error.response?.data?.message || "Lỗi đăng ký");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg p-6 rounded-lg w-80 text-black">
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng ký tài khoản</h2>
        <input
          type="email"
          placeholder="Nhập email"
          className="border p-2 mb-3 w-full rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nhập mật khẩu"
          className="border p-2 mb-3 w-full rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Nhập lại mật khẩu"
          className="border p-2 mb-3 w-full rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          onClick={handleRegister}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 m-2 rounded w-full"
        >
          Đăng ký
        </button>

        <Link to="/login" className="block bg-blue-500 hover:bg-blue-600 text-white py-2 m-2 rounded text-center">
          Đăng nhập
        </Link>
        <Link to="/quenmk" className="block bg-blue-500 hover:bg-blue-600 text-white py-2 m-2 rounded text-center">
          Quên Mật Khẩu
        </Link>
      </div>
    </div>
  );
};

export default Register;
