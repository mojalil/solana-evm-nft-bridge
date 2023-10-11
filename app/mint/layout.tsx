import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";



type DashboardLayoutProps = {
  children: React.ReactNode;
};

const MintLayout = ({ children }: DashboardLayoutProps) => {

  return (
    <div className="h-full">
      <Navbar />
      <div className="hidden md:flex flex-col fixed w-20 mt-16 inset-y-0">
        <Sidebar />
      </div>
      <main className="md:pl-20 pt-16 h-full">{children}</main>
    </div>
  );
};

export default MintLayout;
