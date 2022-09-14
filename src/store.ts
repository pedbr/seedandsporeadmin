import create from 'zustand'

interface Store {
  refetchProducts: number
  triggerRefetchProducts: () => void
}

const useStore = create<Store>((set) => ({
  refetchProducts: 0,
  triggerRefetchProducts: () =>
    set((state) => ({ refetchProducts: state.refetchProducts + 1 })),
  // bears: 0,
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
}))

export default useStore
