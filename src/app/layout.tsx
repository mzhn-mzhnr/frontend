import ReactQueryProvider from "@/components/providers/react-query";
import { Toaster } from "@/components/ui/toaster";
import PageReloader from "@/components/util/page-reloader";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const font = Inter({ subsets: ["cyrillic", "latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s - Панель администратора",
    default: "Панель администратора",
  },
  description: "Панель администратора",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${font.className} antialiased`}>
        <PageReloader />
        <ReactQueryProvider>{children}</ReactQueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
