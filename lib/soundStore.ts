import { create } from 'zustand'

interface SoundState {
  isMuted: boolean
  toggleMute: () => void
  setMuted: (muted: boolean) => void
}

export const useSoundStore = create<SoundState>((set) => ({
  isMuted: true, // Audio OFF by default
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  setMuted: (muted) => set({ isMuted: muted }),
}))
