import React from 'react'
import {useState} from 'react'
import axios from "axios";
import { Navigate, useNavigate } from 'react-router-dom';
const Register = () => {
  const [email,setEmail]= useState("");
    const [password,setPassword]= useState("");
    const navigate=useNavigate();
    const handleRegister= async()=>{
        try{
            const res=await axios.post("http://localhost:3000/api/users/register",{email,password});
            alert(res.data.message);
            setEmail("");
            setPassword("");
            navigate("/");
        }catch(error){
            alert(error|| "lỗi đăng ký")
        }

    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
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
        <button
          onClick={handleRegister}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 m-2 rounded w-full"
        >
          Đăng ký
        </button>
        <br />
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 m-2 rounded w-full"
        >
          <a href="/login">Đăng nhập</a>
        </button>
        <button
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 m-2 rounded w-full">
          <a href="/quenmk">Quên Mật Khẩu</a>
        </button>
      </div>
    </div>
  );
}

export default Register
