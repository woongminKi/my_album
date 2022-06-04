import create from "zustand";

const useStore = create(set => ({
  list: [],
  updateList: (payload) => set(state => ({ list: payload })),
}));

export default useStore;
