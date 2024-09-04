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

export const useStore = createStore((set) => {
  const initialState = storageReader('localStorage', 'prevstate') || emptyForm;

  const updateForm = (values: any) => {
    set((state: any) => {
      const newState = { ...state, ...values };
      storageWriter('localStorage', { prevstate: newState });
      return newState;
    });
  };

  const saveAndReset = () => {
    set((state: any) => {
      const { updateForm, saveAndReset, ...data } = state;

      const reports = storageReader('localStorage', 'reports');

      if (data.venue) {
        storageWriter('localStorage', { reports: [...(reports ? reports : []), data] });
      }

      
      storageWriter('localStorage', { prevstate: emptyForm });

      return { ...emptyForm };
    });
  };

  
  set(() => {
    storageWriter('localStorage', { prevstate: initialState });
    return initialState;
  });

  return {
    ...initialState,
    updateForm,
    saveAndReset,
  }
});
