import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  params: {
    locale: string;
  };
};

export default function NotFoundPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("NotFound");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 text-center bg-[#111111] text-gray-100">
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4 purple-glow">
        {t("title")}
      </h1>
      <p className="max-w-lg mb-8 text-xl text-gray-400">
        {t("description")}
      </p>
      <a href={`/${locale}`} className="mt-8 px-8 py-3 bg-gradient-to-r from-[#8257E5] to-[#9466FF] rounded-lg text-white font-medium hover:opacity-90 transition-opacity">
        {t("backToHome")}
      </a>
    </div>
  );
}

