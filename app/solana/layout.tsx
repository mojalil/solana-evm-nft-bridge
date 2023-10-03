import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import ThirdwebProviderSolanaWrapper from "@/components/ThirdwebProviderSolana";



type DashboardLayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {

  return (
    <div className="h-full">
      <Navbar />
      <div className="hidden md:flex flex-col fixed w-20 mt-16 inset-y-0">
        <Sidebar />
      </div>
      <ThirdwebProviderSolanaWrapper>

      <main className="md:pl-20 pt-16 h-full">{children}</main>

      </ThirdwebProviderSolanaWrapper>
    </div>
  );
};

export default DashboardLayout;
