import create from 'zustand'

interface Store {
  refetchProducts: number
  triggerRefetchProducts: () => void
  refetchSingleProduct: number
  triggerRefetchSingleProduct: () => void
}

const useStore = create<Store>((set) => ({
  refetchProducts: 0,
  triggerRefetchProducts: () =>
    set((state) => ({ refetchProducts: state.refetchProducts + 1 })),
  refetchSingleProduct: 0,
  triggerRefetchSingleProduct: () =>
    set((state) => ({ refetchSingleProduct: state.refetchSingleProduct + 1 })),
}))

export default useStore
