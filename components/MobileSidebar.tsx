import { Menu } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { ConnectWallet } from "@thirdweb-dev/react";

const MobileSidebar = () => {
    return (
<Sheet>
    <SheetTrigger className="md:hidden pr-4">
        <Menu/>
    </SheetTrigger>
    <SheetContent side="left" className="p-0 w-50 bg-secondary pt-10">
        <Sidebar/>
    </SheetContent>
</Sheet>
    )
}

export default MobileSidebar;