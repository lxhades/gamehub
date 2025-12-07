import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axiosClient from "../api/axiosClient";
import { Link } from "react-router-dom";
const BrowseByCategory = () => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // cho cuộn ngang
  const itemsPerPage = 4;

  // 🔹 Gọi API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosClient.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Lỗi khi tải danh mục:", err);
      }
    };
    fetchCategories();
  }, []);

  // 🔹 Điều hướng trái/phải
  const next = () => {
    if (currentIndex + itemsPerPage < categories.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const prev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  // 🔹 Cắt mảng để hiển thị phân trang
  const visibleCategories = categories.slice(
    currentIndex,
    currentIndex + itemsPerPage
  );

  return (
    <div className="bg-[#07101a] text-white py-8 px-10 relative">
      <h2 className="text-sm uppercase mb-4 font-semibold tracking-wide text-gray-300">
        Duyệt theo danh mục
      </h2>

      <div className="flex items-center">
        {/* Nút trái */}
        <button
          onClick={prev}
          className={`p-3 bg-[#0e141b] rounded-full hover:bg-[#2a475e] transition ${
            currentIndex === 0 ? "opacity-40 cursor-not-allowed" : ""
          }`}
        >
          <ChevronLeft />
        </button>

        {/* Danh mục */}
        <div className="flex gap-8 overflow-hidden w-full px-4 justify-center ">
          {visibleCategories.map((cat) => (
            <div
              key={cat._id}
              className="relative min-w-[200px] rounded-lg overflow-hidden group shadow-lg hover:scale-105 transition"
            >
              
              <div className="bg-sky-900 p-2 flex justify-center ">
                <Link
                  to={`/game/category/${encodeURIComponent(cat.name)}`}
                  className="block bg-sky-900 text-white font-semibold text-sm px-3 py-2 rounded hover:bg-sky-700 transition"
                >
                  {cat.name}
                </Link>


              </div>
            </div>
          ))}
        </div>

        {/* Nút phải */}
        <button
          onClick={next}
          className={`p-3 bg-[#0e141b] rounded-full hover:bg-[#2a475e] transition ${
            currentIndex + itemsPerPage >= categories.length
              ? "opacity-40 cursor-not-allowed"
              : ""
          }`}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};

export default BrowseByCategory;
