import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  
  const [wallet, setWallet] = useState(0);

  const getUserWallet = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/wallets/${user._id}`);
      setWallet(res.data.points);
      console.log("wallet",wallet)
    } catch (err) {
      console.error("Lỗi lấy wallet:", err);
    }
  };

  useEffect(() => {
    if (user) {
      getUserWallet();
    }
  }, [user]);

  return (
    <>
      <nav className="flex justify-between items-center bg-gray-900 text-white px-6 py-3">
        <div onClick={() => navigate('/')} className="cursor-pointer font-bold text-xl">
          🎮 MyGameStore
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <button onClick={() => navigate('/wallet')} className="hover:text-yellow-400">
                Số point hiện có: <b>{wallet}</b>
              </button>
              <button onClick={() => navigate('/tkcanhan')} className="hover:text-yellow-400">
                <span>Xin chào, {user.email}</span>
              </button>
            
              <button
                onClick={() => {
                  localStorage.removeItem('user');
                  navigate('/');
                }}
                className="bg-red-500 px-3 py-1 rounded"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <button onClick={() => navigate('/login')} className="bg-blue-500 px-3 py-1 rounded">
                Đăng nhập
              </button>
              <button onClick={() => navigate('/register')} className="bg-green-500 px-3 py-1 rounded">
                Đăng ký
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
