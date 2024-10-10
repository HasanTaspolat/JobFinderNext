"use client";

import { AcmeLogo } from "../atoms/AcmeLogo";
import useTranslation from "@/app/hooks/useLocalization";
import { useLanguageStore } from "@/app/stores/useLanguageStore"

export default function Footer() {
    const { t } = useTranslation();
    const locale = useLanguageStore((state) => state.locale);
    const setLocale = useLanguageStore((state) => state.setLocale);
  
    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setLocale(event.target.value as 'en' | 'tr');
    };
  
    return (
      <footer className="w-full border-t border-gray-600 border-opacity-25">
        <div className="flex flex-col items-center md:flex-row w-full max-w-5xl md:items-start p-6 mx-auto">
          <AcmeLogo />
          <div className="flex-1 pl-6">
            <h3 className="text-xl font-semibold mt-2">{t('footer.getStarted')}</h3>
            <p className="mt-4 text-base max-w-xl leading-relaxed">{t('footer.findJobs')}</p>
          </div>
          <div className="flex flex-col space-y-4 items-center mt-4 md:mt-0">
            <p className="text-base">&copy; SHFT — 2024 Privacy — Terms</p>
            <div className="mt-4 md:mt-0 md:ml-6">
            <label htmlFor="language-select" className="mr-2">Language:</label>
            <select id="language-select" value={locale} onChange={handleLanguageChange} className="border rounded p-1">
              <option value="en">English</option>
              <option value="tr">Türkçe</option>
            </select>
          </div>
          </div>
          
        </div>
      </footer>
    );
  }
