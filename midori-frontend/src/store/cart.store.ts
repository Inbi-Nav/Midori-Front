import { create } from "zustand";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: JSON.parse(localStorage.getItem("cart") || "[]"),

  addToCart: (product) => {
    const items = get().items;
    const existing = items.find(i => i.id === product.id);

    let updated;

    if (existing) {
      updated = items.map(i =>
        i.id === product.id
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    } else {
      updated = [...items, { ...product, quantity: 1 }];
    }

    localStorage.setItem("cart", JSON.stringify(updated));
    set({ items: updated });
  },

  removeFromCart: (id) => {
    const updated = get().items.filter(i => i.id !== id);
    localStorage.setItem("cart", JSON.stringify(updated));
    set({ items: updated });
  },

  updateQuantity: (id, quantity) => {
    const updated = get().items.map(i =>
      i.id === id ? { ...i, quantity } : i
    );

    localStorage.setItem("cart", JSON.stringify(updated));
    set({ items: updated });
  },

  clearCart: () => {
    localStorage.removeItem("cart");
    set({ items: [] });
  },

  total: () =>
    get().items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ),
}));