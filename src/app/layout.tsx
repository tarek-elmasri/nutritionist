import { cookies } from "next/headers";
import { TRPCReactProvider } from "@/trpc/react";
import ToastProvider from "@/providers/toast-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dr. Aya Salem",
  description:
    "A Profissional Nutritients offers highly balanced diets and weight management plans.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider />
        <div className="h-full bg-background">
          <TRPCReactProvider cookies={cookies().toString()}>
            {children}
          </TRPCReactProvider>
        </div>
      </body>
    </html>
  );
}
