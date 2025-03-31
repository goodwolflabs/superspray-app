'use client'

import {
  useAccount,
  useConnect,
  useDisconnect,
  useSendTransaction,
} from 'wagmi'
import { parseEther } from 'viem'
import { useChainModal } from '@rainbow-me/rainbowkit'

export function useWallet() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending: isConnecting } = useConnect()
  const { disconnect } = useDisconnect()
  const { sendTransaction, isPending: isSending } = useSendTransaction()
  const { openChainModal } = useChainModal()

  const sendBatchTransactions = async (
    addresses: { address: string; amount: string }[]
  ) => {
    if (!address) return

    const transactions = addresses.map(({ address: to, amount }) => ({
      to: to as `0x${string}`,
      value: parseEther(amount),
    }))

    for (const tx of transactions) {
      sendTransaction(tx)
    }
  }

  return {
    address,
    isConnected,
    connect,
    connectors,
    isConnecting,
    disconnect,
    sendBatchTransactions,
    isSending,
    openChainModal,
  }
}
