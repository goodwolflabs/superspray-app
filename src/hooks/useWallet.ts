'use client'

import { useAccount, useConnect, useDisconnect, useSendTransaction } from 'wagmi'
import { parseEther } from 'viem'

export function useWallet() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isLoading: isConnecting } = useConnect()
  const { disconnect } = useDisconnect()
  const { sendTransaction, isPending: isSending } = useSendTransaction()

  const sendBatchTransactions = async (addresses: { address: string; amount: string }[]) => {
    if (!address) return

    const transactions = addresses.map(({ address: to, amount }) => ({
      to,
      value: parseEther(amount),
    }))

    for (const tx of transactions) {
      await sendTransaction(tx)
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
  }
} 