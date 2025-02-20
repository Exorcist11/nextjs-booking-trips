import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

const useLoadingStore = create(
  immer((set) => ({
    loading: false,
    setLoading: (value: boolean) =>
      set((state: { loading: boolean }) => {
        state.loading = value;
      }),
    startLoading: () =>
      set((state: { loading: boolean }) => {
        state.loading = true;
      }),
    stopLoading: () =>
      set((state: { loading: boolean }) => {
        state.loading = false;
      }),
  }))
);

export default useLoadingStore;
