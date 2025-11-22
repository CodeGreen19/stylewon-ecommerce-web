import { create } from "zustand";

type Store = {
  images: string[];
  addImage: (image: string) => void;
  removeImage: (image: string) => void;
  clearImages: () => void;
};

export const useAddImage = create<Store>((set) => ({
  images: [],

  addImage: (image) =>
    set((state) => ({
      images: [...state.images, image],
    })),

  removeImage: (image) =>
    set((state) => ({
      images: state.images.filter((img) => img !== image),
    })),

  clearImages: () => set({ images: [] }),
}));
