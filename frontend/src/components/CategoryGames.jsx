import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL ="http://localhost:3000/api"

function CategoryGames({ categoryId, categoryName }) {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;
    const fetchGames = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_URL}/games/category/${categoryId}`);
        setGames(res.data);
      } catch (error) {
        console.error("Lỗi khi tải game:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchGames();
  }, [categoryId]);

  if (loading) return <p className="text-gray-300">Đang tải game...</p>;

  return (
    <div className="mt-6">
      <h3 className="text-2xl font-semibold text-white mb-4">
        Các game thuộc thể loại: <span className="text-blue-400">{categoryName}</span>
      </h3>
      {games.length === 0 ? (
        <p className="text-gray-400">Không có game nào trong thể loại này.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {games.map((game) => (
            <div
              key={game._id}
              className="bg-gray-800 p-4 rounded-xl shadow hover:scale-105 transition-transform"
            >
              <img
                src={game.image || "/no-image.jpg"}
                alt={game.name}
                className="rounded-lg mb-3 h-40 w-full object-cover"
              />
              <h4 className="text-white font-medium">{game.name}</h4>
              <p className="text-gray-400 text-sm">{game.category?.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryGames;
