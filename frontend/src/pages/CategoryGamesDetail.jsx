import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import GameCard from "../components/GameCard";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
const CategoryGamesDetail = () => {
  const { name } = useParams();
  const [games, setGames] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await axiosClient.get(`/games/category/name/${encodeURIComponent(name)}`);
        if (res.data.games && res.data.games.length === 0) {
          setMessage("Không có game nào trong thể loại này");
        } else {
          setGames(res.data.games || res.data);
        }
      } catch (err) {
        console.error("Lỗi khi tải game:", err);
        setMessage("Không tìm thấy thể loại này");
      }
    };
    fetchGames();
  }, [name]);

  return (
    <div className="bg-wrap">
      <Header/>
      <div className="p-6 text-white bg-[#1b2838] min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Thể loại: {name}</h2>
          <div className="p-5 grid grid-cols-4 gap-4">
                {games.map((g) => (
                  <GameCard key={g._id} game={g} />
                ))}
              </div>
        </div>
        <Footer/>
    </div>

)};

export default CategoryGamesDetail;
