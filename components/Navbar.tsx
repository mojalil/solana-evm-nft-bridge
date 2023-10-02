"use client";

import { Poppins } from "next/font/google";
import Link from "next/link";
import { ConnectWallet } from "@thirdweb-dev/react";
import { APP_NAME } from "@/constants";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import MobileSidebar from "@/components/MobileSidebar";
import useViewport from "@/hooks/useViewport";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const Navbar = () => {
  const { isMobile } = useViewport();
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
      <div className="flex items-center">
        <div className="md:hidden">
          <MobileSidebar />
        </div>
        <Link href="/">
          <h1
            className={cn(
              "mg:block text-xl md:text-3xl font-bold text-primary",
              font.className
            )}
          >
            {APP_NAME}
          </h1>
        </Link>
      </div>

      <div className="flex items-center gap-x-3">
        <ThemeToggle />
        {/* Hides buton in mobile view, show in mobile sidebar */}
        {(!isMobile && (
        <div className="md:block">
          <ConnectWallet
            style={{
              maxHeight: "50px",
            }}
          />
        </div>
        ))}
      </div>
    </div>
  );
};

export default Navbar;
