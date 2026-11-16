import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CRTOverlay from "@/components/CRTOverlay";
import BootSequence from "@/components/BootSequence";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "czzzh — portfolio.exe",
    template: "%s · czzzh",
  },
  description: "蔡振昊 — 动画 / 设计 / 后期 / AIGC 作品集",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className={`${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#060a0f] text-cyan-100">
        <BootSequence />
        <CRTOverlay />
        <div className="crt-screen">
          <Navbar />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
