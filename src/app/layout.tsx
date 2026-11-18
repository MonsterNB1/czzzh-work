import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: {
    default: "czzzh — 蔡振昊作品集",
    template: "%s · czzzh",
  },
  description: "蔡振昊 — 动画 / 设计 / 后期 / AIGC 作品集",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="zh-CN" className="h-full antialiased">
      <head>
        {/* the two local faces carry almost all the text — start them early */}
        <link
          rel="preload"
          href="/fonts/smileysans.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/mengqi-cp.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f5f1e6] text-[#2b2b2b]">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
