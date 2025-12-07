export default function GameCard({ game }) {
  return (
    <div className="border rounded-lg p-3 shadow text-center">
      <img src={game.images?.[0]} className="w-full h-40 object-cover rounded" />
      <h3 className="font-bold mt-2">{game.name}</h3>
      <p className="text-gray-500">{game.price.toLocaleString()} VND</p>
      <a
        href={`/game/${game._id}`}
        className="block mt-2 bg-blue-600 text-white px-3 py-1 rounded text-center hover: font-bold"
      >
        Xem chi tiết
      </a>
    </div>
  );
}
