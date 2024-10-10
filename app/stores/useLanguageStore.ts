import {create} from 'zustand';

interface LanguageState {
  locale: 'en' | 'tr';
  setLocale: (locale: 'en' | 'tr') => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  locale: 'en',
  setLocale: (locale) => set({ locale }),
}));
