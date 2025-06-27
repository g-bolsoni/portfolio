import "../globals.css";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { locales } from "../../navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Giovane Souza - Portfolio",
  description: "Professional portfolio showcasing skills and projects",
};

type Props = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export const dynamic = 'force-static';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({ children, params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.className} dark bg-gray-900 text-gray-100`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
