import { createStore } from '@/libs/hooks'

export const useStore = createStore((set) => ({
  bears: 1,
  increasePopulation: () => set((state: { bears: number }) => ({ bears: state.bears + 1 })),
}))
