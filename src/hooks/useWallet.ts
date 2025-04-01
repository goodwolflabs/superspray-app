'use client'

import {
  useAccount,
  useConnect,
  useDisconnect,
  useChainId,
  useWriteContract,
  useEstimateMaxPriorityFeePerGas,
} from 'wagmi'
import { parseEther } from 'viem'
import { useChainModal } from '@rainbow-me/rainbowkit'
import { getSprayContract } from '@/contract/spray.abi'
import { erc20Abi, type Address } from 'viem'
import { useState } from 'react'
import { mode, modeTestnet } from 'viem/chains'
import { readContract } from 'wagmi/actions'
import { config } from '@/lib/wagmi'

export function useWallet() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending: isConnecting } = useConnect()
  const { disconnect } = useDisconnect()
  const [isSending, setIsSending] = useState(false)
  const { openChainModal } = useChainModal()
  const chainId = useChainId()
  const currentChain = chainId === mode.id ? mode : modeTestnet

  const sprayContract = getSprayContract(chainId)

  const { writeContractAsync: writeSprayContract } = useWriteContract()

  const { writeContractAsync: writeTokenContract } = useWriteContract()

  const { data: maxPriorityFeePerGas } = useEstimateMaxPriorityFeePerGas({
    chainId: currentChain.id,
  })

  const sprayEther = async (
    transactions: { address: string; amount: string }[]
  ) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected')
    }

    if (!sprayContract) {
      throw new Error(`Contract not found for chain ${chainId}`)
    }

    try {
      setIsSending(true)

      const recipients = transactions.map(tx => tx.address as Address)
      const values = transactions.map(tx => parseEther(tx.amount))
      const totalAmount = values.reduce((a, b) => a + b, BigInt(0))

      console.log('Spraying ETH:', {
        recipients,
        values,
        totalAmount: totalAmount.toString(),
        contractAddress: sprayContract.address,
      })

      const txHash = await writeSprayContract({
        address: sprayContract.address as Address,
        abi: sprayContract.abi,
        functionName: 'disperseEther',
        args: [recipients, values],
        value: totalAmount,
      })

      return txHash
    } catch (error) {
      console.error('Error in sprayEther:', error)
      throw error
    } finally {
      setIsSending(false)
    }
  }

  const sprayToken = async (
    tokenAddress: Address,
    transactions: { address: string; amount: string }[]
  ) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected')
    }

    if (!sprayContract) {
      throw new Error(`Contract not found for chain ${chainId}`)
    }

    try {
      setIsSending(true)

      const decimalsData = await readContract(config, {
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'decimals',
      })

      const recipients = transactions.map(tx => tx.address as Address)
      const values = transactions.map(tx => parseEther(tx.amount))
      const totalAmount = values.reduce((a, b) => a + b, BigInt(0))

      console.log('Spraying Token:', {
        tokenAddress,
        recipients,
        values,
        totalAmount: totalAmount.toString(),
        contractAddress: sprayContract.address,
        decimals: decimalsData,
      })

      await writeTokenContract({
        address: tokenAddress,
        abi: erc20Abi,
        functionName: 'approve',
        args: [sprayContract.address as Address, totalAmount],
      })

      const txHash = await writeSprayContract({
        address: sprayContract.address as Address,
        abi: sprayContract.abi,
        functionName: 'disperseToken',
        args: [tokenAddress, recipients, values],
      })

      return txHash
    } catch (error) {
      console.error('Error in sprayToken:', error)
      throw error
    } finally {
      setIsSending(false)
    }
  }

  return {
    address,
    isConnected,
    connect,
    connectors,
    isConnecting,
    disconnect,
    isSending,
    openChainModal,
    chainId,
    currentChain,
    sprayEther,
    sprayToken,
    maxPriorityFeePerGas,
  }
}
