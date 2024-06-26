import { IUser } from "@/models";
import { create } from "zustand";

type Store = {
  profile: IUser | null;
  setProfile: (user: IUser) => void;
};

const useStore = create<Store>()((set) => ({
  profile: null,
  setProfile: (user: IUser) => set((state) => ({ profile: user })),
}));

export { useStore };
