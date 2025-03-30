'use client'

import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import { mainnet, sepolia } from 'viem/chains'

export const config = getDefaultConfig({
  appName: 'Superspray',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
  chains: [mainnet, sepolia],
  ssr: true,
}) 