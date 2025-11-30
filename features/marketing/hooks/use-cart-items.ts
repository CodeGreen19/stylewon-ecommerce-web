import { create } from "zustand";
import { CartType } from "../types";
import { saveCart } from "../helpers";

type Store = {
  carts: CartType[];
  setCarts: (carts: CartType[]) => void;
  guestUserAddToCart: (cart: CartType) => void;
  guestUserRemoveFromCart: (productId: string) => void;
  guestUserUpdateQuantity: (productId: string, qty: number) => void;
  guestUserClearCart: () => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedImage: string;
  setSelectedImage: (img: string) => void;
  quantity: number;
  setQuantity: (q: number) => void;
};

export const useCartItems = create<Store>((set, get) => ({
  carts: [], // <-- fixed
  setCarts: (carts) => {
    set({ carts });
    saveCart(carts);
  },
  guestUserAddToCart: (item) => {
    const carts = get().carts;

    const existing = carts.find((i) => i.productId === item.productId);

    let updatedCart;
    if (existing) {
      updatedCart = carts.map((i) =>
        i.productId === item.productId
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
    } else {
      updatedCart = [...carts, item];
    }

    set({ carts: updatedCart });
    saveCart(updatedCart);
  },

  guestUserRemoveFromCart: (productId) => {
    const updated = get().carts.filter((item) => item.productId !== productId);
    set({ carts: updated });
    saveCart(updated);
  },

  guestUserUpdateQuantity: (productId, qty) => {
    const updated = get().carts.map((item) =>
      item.productId === productId ? { ...item, quantity: qty } : item
    );
    set({ carts: updated });
    saveCart(updated);
  },

  guestUserClearCart: () => {
    set({ carts: [] });
    saveCart([]);
  },

  quantity: 1,
  selectedColor: "",
  selectedSize: "",
  selectedImage: "",
  setQuantity: (num) => set({ quantity: num }),
  setSelectedColor: (s) => set({ selectedColor: s }),
  setSelectedSize: (s) => set({ selectedSize: s }),
  setSelectedImage: (img) => set({ selectedImage: img }),
}));
