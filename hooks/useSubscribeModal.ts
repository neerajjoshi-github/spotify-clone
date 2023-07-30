import { create } from "zustand";

interface SubscribeModalStore {
  isopen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSubscribeModal = create<SubscribeModalStore>((set) => ({
  isopen: false,
  onOpen: () => set({ isopen: true }),
  onClose: () => set({ isopen: false }),
}));

export default useSubscribeModal;
