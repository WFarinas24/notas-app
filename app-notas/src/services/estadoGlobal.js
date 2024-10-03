import { create } from "zustand";
import { ObtenerCategorias, ObtenerNotas } from "./services";

export const useStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
  updateBears: (newBears) => set({ bears: newBears }),
}));

export const useStoreCategorias = create((set) => ({
  categorias: [],
  // actualizar: () => set((lista) => ({ categorias : lista})),
  // removeAllcategorias: () => set({ categorias: 0 }),
  actualizar: async (data) => set({ categorias: await ObtenerCategorias() }),
}));

export const useStoreNotas = create((set) => ({
  notas: [],
  actualizar: async (data) => set({ notas: await ObtenerNotas() }),
}));
