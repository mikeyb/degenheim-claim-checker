'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';

// Create a Wagmi config for Ethereum mainnet
const config = createConfig({
    chains: [mainnet],
    transports: {
        [mainnet.id]: http(),
    },
});

// Create a React Query client
const queryClient = new QueryClient();

// Export the Providers component
export function Providers({ children }: { children: ReactNode }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    );
}
