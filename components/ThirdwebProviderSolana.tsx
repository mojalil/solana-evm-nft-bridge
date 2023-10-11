"use client";

import { ThirdwebProvider } from "@thirdweb-dev/react/solana";

type ThirdwebProviderProps = {
  children: React.ReactNode;
};

const desiredNetwork = "mainnet-beta"

const ThirdwebProviderSolanaWrapper = ({ children }: ThirdwebProviderProps) => {
  return (
    <ThirdwebProvider network={desiredNetwork}>
        {children}
    </ThirdwebProvider>
  );
};

export default ThirdwebProviderSolanaWrapper;
