import { create } from "zustand";
import { ObtenerCategorias, ObtenerNotas } from "./services";

export const useStoreCategorias = create((set) => ({
  categorias: [],
  actualizar: async (data) => set({ categorias: await ObtenerCategorias() }),
}));

export const useStoreNotas = create((set) => ({
  notas: [],
  actualizar: async (data) => set({ notas: await ObtenerNotas() }),
}));

export const useStoreIdCategoria = create((set) => ({
  idCategoria: [],
  actualizar: async (data) => set({ idCategoria: data }),
}));
