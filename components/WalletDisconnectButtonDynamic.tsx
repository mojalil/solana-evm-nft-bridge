'use client';

import dynamic from 'next/dynamic';

const WalletDisconnectButtonDynamic = dynamic(
    async () => (await import('@solana/wallet-adapter-react-ui')).WalletDisconnectButton,
    { ssr: false }
);

export default WalletDisconnectButtonDynamic;

