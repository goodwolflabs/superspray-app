import { http } from 'viem'
import { createConfig } from 'wagmi'
import { type Chain } from 'wagmi/chains'
import { injected, walletConnect } from 'wagmi/connectors'

const modeChain: Chain = {
  id: 34443,
  name: 'Mode',
  nativeCurrency: {
    decimals: 18,
    name: 'Mode',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://mainnet.mode.network'] },
    default: { http: ['https://mainnet.mode.network'] },
  },
  blockExplorers: {
    default: { name: 'ModeScan', url: 'https://explorer.mode.network' },
  },
}

const modeTestnet: Chain = {
  id: 919,
  name: 'Mode Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Mode',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: ['https://sepolia.mode.network'] },
    default: { http: ['https://sepolia.mode.network'] },
  },
  blockExplorers: {
    default: { name: 'ModeScan', url: 'https://sepolia.explorer.mode.network' },
  },
}

export const chains = [modeChain, modeTestnet] as const

export const config = createConfig({
  chains,
  connectors: [
    injected(),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ?? '',
    }),
  ],
  transports: {
    [modeChain.id]: http('https://mainnet.mode.network'),
    [modeTestnet.id]: http('https://sepolia.mode.network'),
  },
})
