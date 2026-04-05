import { create } from "zustand";
import { transactions as initialData } from "../data/mockData";

export const useStore = create((set) => ({
  transactions: initialData,
  role: "viewer",
  filter: "",

  setRole: (role) => set({ role }),

  addTransaction: (tx) =>
    set((state) => ({
      transactions: [...state.transactions, tx],
    })),

  setFilter: (filter) => set({ filter }),

  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
}));