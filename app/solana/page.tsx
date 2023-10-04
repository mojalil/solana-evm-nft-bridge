'use client';
import SolanaTokens from "@/components/SolanaTokens";
import { useWallet } from "@solana/wallet-adapter-react";
import { ThirdwebSDKProvider} from "@thirdweb-dev/react/solana";
import { useProgram } from "@thirdweb-dev/react/solana";


const SolanaPage = () => {

  const wallet = useWallet();
  const walletAddress = wallet?.publicKey?.toBase58();

  return (
    <ThirdwebSDKProvider network={"mainnet-beta"} wallet={wallet}>
      <div className="h-full p-4 space-y-2">
        Dashboard {wallet && walletAddress}
        <div>
          <SolanaTokens />
        </div>
      </div>
    </ThirdwebSDKProvider>
  );
};

export default SolanaPage;
