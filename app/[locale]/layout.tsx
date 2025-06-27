import "../globals.css";
import { Inter } from "next/font/google";
import { NextIntlClientProvider, useMessages } from "next-intl";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Giovane Souza - Portfolio",
  description: "Professional portfolio showcasing skills and projects",
};

export default function RootLayout({ children, params: { locale } }: { children: React.ReactNode, params: { locale: string } }) {
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
