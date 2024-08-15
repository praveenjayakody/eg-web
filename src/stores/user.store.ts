import { create } from "zustand"

import { ApiUser } from "../lib/models"

interface iUserStore {
  user: ApiUser | null
  setUser: (user: ApiUser) => void
  clearUser: () => void
}

export const useUserStore = create<iUserStore>(set => ({
  user: null,
  setUser: (user: ApiUser) => set({ user }),
  clearUser: () => set({ user: null })
}))
