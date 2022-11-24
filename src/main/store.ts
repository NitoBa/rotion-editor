import Store from 'electron-store'

type StoreType = {
  documents: Record<string, any>
}

export const store = new Store<StoreType>({
  defaults: {
    documents: {},
  },
})
