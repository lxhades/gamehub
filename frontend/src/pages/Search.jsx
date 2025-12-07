import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import gameApi from "../api/gameApi";
import GameCard from "../components/GameCard";
import Header from "../components/Header";

export default function Search() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const keyword = queryParams.get("query");

  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!keyword) return;
    setLoading(true);
    gameApi.search(keyword)
      .then((res) => setGames(res.data))
      .finally(() => setLoading(false));
  }, [keyword]);

  if (loading) return <p className="p-5 text-white">Đang tìm kiếm...</p>;

  return (
    <div className="bg-wrap">
      <Header/>
      <div className="p-5 grid grid-cols-4 gap-4">
      {games.length === 0 && <p className="text-white">Không tìm thấy kết quả.</p>}
      {games.map((g) => (
        <GameCard key={g._id} game={g} />
      ))}
    </div>
    </div>
  );
}
