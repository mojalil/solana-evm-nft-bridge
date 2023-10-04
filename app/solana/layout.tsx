import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import SolanaWalletProvider from "@/components/SolanaWalletProvider";
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
      <SolanaWalletProvider>
      <main className="md:pl-20 pt-16 h-full">{children}</main>
      </SolanaWalletProvider>
    </div>
  );
};

export default DashboardLayout;
