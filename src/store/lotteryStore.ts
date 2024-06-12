import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ILoterryStore {
  prizesId: number | null;
  setPrizeId: (id: number) => void;
  remove: boolean;
  setRemove: (value: boolean) => void;
}

export const useLotteryStore = create(
  devtools<ILoterryStore>((set) => ({
    prizesId: null,
    remove: false,
    setPrizeId: (id) => set((state) => ({ prizesId: id })),
    setRemove: (value) => set((state) => ({ remove: value })),
  }))
);
