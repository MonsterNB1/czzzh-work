import type { Metadata } from "next";
import { Edu_TAS_Beginner, Schoolbell, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const hand = Edu_TAS_Beginner({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const note = Schoolbell({
  variable: "--font-note",
  subsets: ["latin"],
  weight: ["400"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "czzzh — 蔡振昊作品集",
    template: "%s · czzzh",
  },
  description: "蔡振昊 — 动画 / 设计 / 后期 / AIGC 作品集",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      className={`${hand.variable} ${note.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f5f1e6] text-[#2b2b2b]">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
