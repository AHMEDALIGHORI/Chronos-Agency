import { create } from 'zustand'

const useStore = create((set) => ({
    currentEra: 'present',
    scrollProgress: 0,
    setEra: (era) => set({ currentEra: era }),
    setScrollProgress: (progress) => set({ scrollProgress: progress }),
}))

export default useStore
