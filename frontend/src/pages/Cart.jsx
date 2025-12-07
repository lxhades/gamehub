import useCartStore from "../store/cartStore";

export default function Cart() {
  const { cart, remove } = useCartStore();

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Giỏ hàng</h1>
      <div className="mt-4">
        {cart.map((item) => (
          <div key={item._id} className="border p-3 flex justify-between my-2">
            <span>{item.name}</span>
            <span>{item.price.toLocaleString()} VND</span>
            <button onClick={() => remove(item._id)} className="text-red-600">
              Xoá
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
