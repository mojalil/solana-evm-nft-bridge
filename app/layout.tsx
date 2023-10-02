import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ThemeProvider from "@/components/ThemeProvider";
import ThirdwebProviderWrapper from "@/components/ThirdwebProvider";
import { APP_DESCRIPTION, APP_NAME } from "@/constants";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn("bg-secondary", inter.className)}>
      <ThirdwebProviderWrapper>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
         {children}
        </ThemeProvider>
        </ThirdwebProviderWrapper>
      </body>
    </html>
  );
}
