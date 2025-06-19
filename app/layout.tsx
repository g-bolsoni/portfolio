import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Giovane Souza - Portfolio",
  description: "Professional portfolio showcasing skills and projects",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark bg-gray-900 text-gray-100`}>
        {children}
      </body>
    </html>
  );
}
