import ToastProvider from "@/providers/toast-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr. Aya Salem",
  description:
    "A Profissional Nutritients offers highly balanced diets and weight management plans.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider />
        <div className="h-full bg-background">{children}</div>
      </body>
    </html>
  );
}
