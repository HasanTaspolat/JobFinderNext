"use client"
import en from '@/locales/en/common.json';
import tr from '@/locales/tr/common.json';
import { useLanguageStore } from '@/app/stores/useLanguageStore';

type Translations = {
  [key: string]: {
    [key: string]: string | { [key: string]: string };
  };
};

const translations: Translations = {
  en,
  tr,
};

const useTranslation = () => {
  const locale = useLanguageStore((state) => state.locale);

  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[locale];

    for (let i = 0; i < keys.length; i++) {
      result = result[keys[i]];
      if (result === undefined) {
        return key;
      }
    }
    return typeof result === 'string' ? result : key;
  };

  return { t };
};

export default useTranslation;
