import type { Metadata } from "next";
import { Inter } from "next/font/google";
import getSession from "@/actions/getCurrentSession";
import AuthProvider from "@/providers/auth-provider";
import QueryProvider from "@/providers/query-provider";
import ToastProvider from "@/providers/toast-provider";
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
  const session = await getSession();

  return (
    <AuthProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <ToastProvider />
          <QueryProvider>
            <div className="h-full bg-background">{children}</div>
          </QueryProvider>
        </body>
      </html>
    </AuthProvider>
  );
}
