import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password
      });
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);


      alert("Đăng nhập thành công!");
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Đăng nhập thất bại");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
      <div className="bg-white shadow-lg p-6 rounded-lg w-80 text-black">
        <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h2>
        <input
          className="border p-2 mb-3 w-full rounded"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 mb-3 w-full rounded"
          type="password"
          placeholder="Mật khẩu"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 m-2 rounded w-full" onClick={handleLogin}>
          Đăng nhập
        </button>
        <br />
        <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 m-2 rounded w-full">
          <a href="/register">Đăng ký</a>
        </button>
        <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 m-2 rounded w-full">
          <a href="/quenmk">Quên Mật Khẩu</a>
        </button>
      </div>
    </div>
  );
}
export default Login