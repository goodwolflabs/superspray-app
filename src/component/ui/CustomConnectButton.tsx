import { useAccount, useBalance, useDisconnect } from 'wagmi'
import { ConnectButton as RainbowConnectButton } from '@rainbow-me/rainbowkit'
import { formatAddress } from '@/utils/format'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { formatEther } from 'ethers'

export function CustomConnectButton() {
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({
    address,
  })
  const { disconnect } = useDisconnect()

  if (!isConnected) {
    return <RainbowConnectButton />
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full"
        onClick={() => disconnect()}
      >
        <Image
          src={`https://effigy.im/a/${address}.svg`}
          alt="Avatar"
          width={24}
          height={24}
          className="h-6 w-6 rounded-full"
        />
      </Button>
      <div className="flex flex-col items-end">
        <span className="text-sm font-medium">
          {balance?.value
            ? Number(formatEther(balance.value)).toFixed(4)
            : '0.0000'}{' '}
          {balance?.symbol}
        </span>
        <span className="text-muted-foreground text-xs">
          {formatAddress(address)}
        </span>
      </div>
    </div>
  )
}
