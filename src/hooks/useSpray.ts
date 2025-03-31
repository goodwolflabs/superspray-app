import { useWriteContract , useChainId} from 'wagmi'
import { parseEther } from 'ethers'
import { getSprayContract } from '@/contract/spray.abi'
import { erc20Abi } from 'viem'

interface SprayTransaction {
  address: string
  amount: string
}

export function useSpray() {
  const chainId = useChainId() ?? 919
  
  const sprayContract = getSprayContract(chainId)
  
  const { writeContract: writeDisperseEther } = useWriteContract()
  const { writeContract: writeDisperseToken } = useWriteContract()
  const { writeContract: writeApproveToken } = useWriteContract()

  const sprayEther = async (transactions: SprayTransaction[]) => {
    if (!sprayContract) throw new Error(`Contract not found for chain ${chainId}`)
    
    const addresses = transactions.map(tx => tx.address as `0x${string}`)
    const amounts = transactions.map(tx => parseEther(tx.amount))
    const totalAmount = amounts.reduce((a, b) => a + b, BigInt(0))

    return writeDisperseEther({
      address: sprayContract.address as `0x${string}`,
      abi: sprayContract.abi,
      functionName: 'disperseEther',
      args: [addresses, amounts],
      value: totalAmount,
    })
  }

  const sprayToken = async (
    tokenAddress: `0x${string}`,
    transactions: SprayTransaction[]
  ) => {
    if (!sprayContract) throw new Error(`Contract not found for chain ${chainId}`)
    
    const addresses = transactions.map(tx => tx.address as `0x${string}`)
    const amounts = transactions.map(tx => parseEther(tx.amount))
    const totalAmount = amounts.reduce((a, b) => a + b, BigInt(0))

    // First approve the spray contract
    await writeApproveToken({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: 'approve',
      args: [sprayContract.address as `0x${string}`, totalAmount],
    })

    // Then disperse the tokens
    return writeDisperseToken({
      address: sprayContract.address as `0x${string}`,
      abi: sprayContract.abi,
      functionName: 'disperseToken',
      args: [tokenAddress, addresses, amounts],
    })
  }

  return {
    sprayEther,
    sprayToken,
  }
} 