import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "できたよ！ | 子どもの自己肯定感を育むプログラミング教室ガイド",
  description: "教育心理学の視点から、子どもの自己肯定感を高めるプログラミング教室を紹介。お子さまに合った教室選びをサポートします。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
