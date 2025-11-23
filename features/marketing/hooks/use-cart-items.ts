import { create } from "zustand";

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
};

type Store = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, qty: number) => void;
  clearCart: () => void;
};

// Key for localStorage
const CART_KEY = "app_cart";

// Safe load from localStorage
function loadCartFromLocalStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// Save state → localStorage
function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export const useCartItems = create<Store>((set, get) => ({
  cart: loadCartFromLocalStorage(),
  addToCart: (item) => {
    const cart = get().cart;

    // Check if item already exists → merge quantity
    const existing = cart.find((i) => i.productId === item.productId);

    let updatedCart;
    if (existing) {
      updatedCart = cart.map((i) =>
        i.productId === item.productId
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
    } else {
      updatedCart = [...cart, item];
    }

    set({ cart: updatedCart });
    saveCart(updatedCart);
  },
  removeFromCart: (productId) => {
    const updated = get().cart.filter((item) => item.productId !== productId);
    set({ cart: updated });
    saveCart(updated);
  },
  updateQuantity: (productId, qty) => {
    const updated = get().cart.map((item) =>
      item.productId === productId ? { ...item, quantity: qty } : item
    );
    set({ cart: updated });
    saveCart(updated);
  },
  clearCart: () => {
    set({ cart: [] });
    saveCart([]);
  },
}));
