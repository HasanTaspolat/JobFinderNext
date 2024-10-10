"use client"
import { HeroHighlight, Highlight } from "./components/molecules/hero-highlight";
import Footer from "./components/organisms/footer";
import GlobalHeader from "./components/organisms/header";
import useTranslation from "@/app/hooks/useLocalization";

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="flex flex-col justify-between">
      <GlobalHeader />
      <div>
        <HeroHighlight className="text-2xl max-w-2xl">
          <h1 className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto">
            {t('hero.title')}
            <Highlight className="text-black dark:text-white">
              {t('hero.highlight')}
            </Highlight>
          </h1>
        </HeroHighlight>
      </div>
      <Footer />
    </main>
  );
}