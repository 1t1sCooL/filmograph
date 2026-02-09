import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppProviders } from "./providers/AppProviders";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Фильмограф — Каталог фильмов",
  description: "Каталог фильмов с фильтрами по жанрам",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${inter.className} antialiased`}>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
