import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],
  addToCart: (game) =>
    set((state) => ({ cart: [...state.cart, { ...game, qty: 1 }] })),
  remove: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item._id !== id),
    })),
}));

export default useCartStore;
