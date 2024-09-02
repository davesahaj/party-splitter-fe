/* eslint-disable @typescript-eslint/no-explicit-any */
import { createStore, randomId } from '@/libs/hooks'
import { storageReader, storageWriter } from '@/utils'

const emptyForm = {
  id: randomId(),

  venue: null,
  date: null,
  participants: [],

  items: [],
  taxes: null,
  total: null,
  discount: null,
} as const

export const useStore = createStore((set) => ({
  ...emptyForm,
  updateForm: (values: any) => set(() => ({ ...values })),
  saveAndReset: () =>
    set((state: any) => {
      // eslint-disable-next-line @/no-unused-vars, @typescript-eslint/no-unused-vars
      const { updateForm, saveAndReset, ...data } = state

      const reports = storageReader('localStorage', 'reports')

      if (data.venue) storageWriter('localStorage', { reports: [...(reports ? reports : []), data] })

      return { ...state, ...emptyForm }
    }),
}))
