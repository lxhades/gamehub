import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import gameApi from "../api/gameApi";
import Header from '../components/Header'
import Nav from '../components/Nav'
import Navbar from '../components/Navbar'
import { Footer } from "../components/Footer";
export default function GameDetailPage() {
  const { id } = useParams();
  const [game, setGame] = useState(null);


  useEffect(() => {
    gameApi.getById(id).then((res) => setGame(res.data));
  }, [id]);

  if (!game) return <p>Loading...</p>;

  return (
    <>
      <div className="bg-wrap">
        <Header></Header>
        <div className="p-5">
          <h1 className="text-3xl font-bold">{game.name}</h1>

          <div className="flex gap-4 flex-wrap my-4">
            {game.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                className="w-64 rounded shadow"
                alt={`image-${index}`}
              />
            ))}
          </div>


          <p className="text-xl text-gray-700">{game.price.toLocaleString()} VND</p>

          <button

            className="bg-green-600 text-white px-4 py-2 rounded mt-4"
          >
            Thêm vào giỏ
          </button>

          <pre className="mt-6">{game.description}</pre>
        </div>
        <Footer/>
      </div>
    </>
  );
}
