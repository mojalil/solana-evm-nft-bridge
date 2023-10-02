"use client";
import { usePathname } from "next/navigation";
import { Home } from "lucide-react";
import { cn } from "@/lib/utils";
import { ConnectWallet } from "@thirdweb-dev/react";
import useViewport from "@/hooks/useViewport";

// Paths include Home, Buy, Sell, and Settings
// Each path has an icon, href, and label
const routes = [
  {
    icon: Home,
    href: "/dashboard",
    label: "Home",
  },
  {
    icon: Home,
    href: "/buy",
    label: "Buy",
  },
  {
    icon: Home,
    href: "/sell",
    label: "Sell",
  },
  {
    icon: Home,
    href: "/settings",
    label: "Settings",
  },
];

const Sidebar = () => {
  const pathName = usePathname();
  const { isMobile } = useViewport();



  return (
    <div className="space-y-4 flex flex-col h-full text-primary bg-secondary">
      <div className="flex flex-1 justify-center p-3">
        <div className="space-y-2">
          {routes.map((route) => {
            return (
              <div
                key={route.href}
                className={cn(
                  "flex w-full group p-3 justify-start text-muted-foreground text-xs font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                  pathName === route.href && "bg-primary/10 text-primary"
                )}
              >
                <div className="flex flex-col items-center gap-y-2 flex-1">
                  <route.icon className="h-5 w-5"></route.icon>
                  {route.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* customise to fit in mobile sidebar */}
      {isMobile && (
        <div className=" p-2">
          <ConnectWallet />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
