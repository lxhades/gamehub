import { useEffect, useState } from "react";
import gameApi from "../api/gameApi";
import GameCard from "./GameCard";

export default function Home() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    gameApi.getAll().then((res) => setGames(res.data));
  }, []);

  return (
    <div className="p-5 grid grid-cols-4 gap-4">
      {games.map((g) => (
        <GameCard key={g._id} game={g} />
      ))}
    </div>
  );
}
