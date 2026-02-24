import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  stock: number;
}

interface CartState {
  items: CartItem[];
  addToCart: (product: any) => { success: boolean; message?: string };
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => { success: boolean; message?: string };
  clearCart: () => void;
  total: () => number;
  hasStockIssues: () => boolean;
}

const sanitizeItem = (item: any): CartItem => ({
  id: Number(item.id),
  name: String(item.name || ''),
  price: typeof item.price === 'number' ? item.price : Number(item.price) || 0,
  image_url: String(item.image_url || ''),
  quantity: typeof item.quantity === 'number' ? item.quantity : Number(item.quantity) || 1,
  stock: typeof item.stock === 'number' ? item.stock : Number(item.stock) || 0,
});

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product) => {
        const items = get().items;
        const existing = items.find(i => i.id === product.id);

        let updated;
        let success = true;
        let message = "";

          const productStock = typeof product.stock === 'number' 
          ? product.stock 
          : Number(product.stock) || 0;

        if (existing) {
          const newQuantity = existing.quantity + 1;
          
          if (newQuantity <= existing.stock) {
            updated = items.map(i =>
              i.id === product.id
                ? { ...i, quantity: newQuantity }
                : i
            );
          } else {
            success = false;
            message = `Solo hay ${existing.stock} unidades disponibles`;
            return { success, message };
          }
        } else {
          const newItem: CartItem = {
            id: Number(product.id),
            name: String(product.name || ''),
            price: typeof product.price === 'number' ? product.price : Number(product.price) || 0,
            image_url: String(product.image_url || ''),
            quantity: 1,
            stock: productStock,
          };
          updated = [...items, newItem];
        }

        set({ items: updated });
        return { success };
      },

      removeFromCart: (id) => {
        const updated = get().items.filter(i => i.id !== id);
        set({ items: updated });
      },

      updateQuantity: (id, quantity) => {
        const items = get().items;
        const item = items.find(i => i.id === id);
        
        let success = true;
        let message = "";

        if (item) {
          const newQuantity = Number(quantity);
          if (newQuantity <= item.stock && newQuantity >= 1) {
            const updated = items.map(i =>
              i.id === id ? { ...i, quantity: newQuantity } : i
            );
            set({ items: updated });
          } else if (newQuantity > item.stock) {
            success = false;
            message = `Solo hay ${item.stock} unidades disponibles`;
          } else {
            success = false;
            message = "La cantidad debe ser al menos 1";
          }
        }

        return { success, message };
      },

      clearCart: () => {
        set({ items: [] });
      },

      total: () =>
        get().items.reduce(
          (acc, item) => acc + (Number(item.price) * Number(item.quantity)),
          0
        ),

      hasStockIssues: () => {
        const items = get().items;
        return items.some(item => Number(item.quantity) > Number(item.stock));
      },
    }),
    {
      name: "cart-storage",
      onRehydrateStorage: () => (state) => {
        if (state && state.items) {
          state.items = state.items.map(sanitizeItem);
        }
      },
    }
  )
);