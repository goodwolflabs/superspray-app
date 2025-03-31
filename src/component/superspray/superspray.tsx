'use client'

import { ChevronDown, Clock, Settings, X } from 'lucide-react'
import { useState } from 'react'
import { useWallet } from '@/hooks/useWallet'
import { Button } from '@/components/ui/button'
import { ClipboardIcon } from '@/components/icons/clipboard-icon'
import { ChainIcon } from '@/components/icons/chain-icon'
import { AddIcon } from '@/components/icons/add-icon'
import { officialTokenByChain } from '@/constants/official-tokens'
import Image from 'next/image'

interface Address {
  id: string
  address: string
  amount: string
}

export function Superspray() {
  const [addresses, setAddresses] = useState<Address[]>([
    { id: '1', address: '0x...', amount: '0.00' },
    { id: '2', address: '0x...', amount: '0.00' },
    { id: '3', address: '0x...', amount: '0.00' },
    { id: '4', address: '0x...', amount: '0.00' },
  ])
  const [isCoinSelectorOpen, setIsCoinSelectorOpen] = useState(false)
  const [selectedToken, setSelectedToken] = useState(officialTokenByChain[0])
  const {
    isConnected,
    connect,
    connectors,
    isConnecting,
    sendBatchTransactions,
    isSending,
    openChainModal,
    currentChain,
  } = useWallet()

  const filteredTokens = officialTokenByChain.filter(
    token => token.chainId === currentChain.id
  )

  const handleCoinSelect = (token: typeof officialTokenByChain[0]) => {
    setSelectedToken(token)
    setIsCoinSelectorOpen(false)
  }

  const removeAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id))
  }

  const addNewAddress = () => {
    const newId = (
      Math.max(...addresses.map(addr => parseInt(addr.id))) + 1
    ).toString()
    setAddresses([
      ...addresses,
      { id: newId, address: '0x...', amount: '0.00' },
    ])
  }

  const clearAll = () => {
    setAddresses([])
  }

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      const lines = text.split('\n').filter(line => line.trim())

      const newAddresses = lines.map((line, index) => {
        // Try to split by comma first, if not found, split by space
        const parts = line.includes(',')
          ? line.split(',').map(item => item.trim())
          : line.split(/\s+/).map(item => item.trim())

        const [address, amount] = parts
        return {
          id: (index + 1).toString(),
          address: address || '0x...',
          amount: amount || '0.00',
        }
      })

      setAddresses(newAddresses)
    } catch (error) {
      console.error('Failed to read clipboard:', error)
    }
  }

  const updateAmount = (id: string, newAmount: string) => {
    setAddresses(addresses.map(addr => 
      addr.id === id ? { ...addr, amount: newAmount } : addr
    ))
  }

  const handleSpray = async () => {
    if (!isConnected) {
      connect({ connector: connectors[0] })
      return
    }
    await sendBatchTransactions(addresses)
  }

  const getButtonText = () => {
    if (isConnecting) return 'Connecting...'
    if (isSending) return 'Sending...'
    if (isConnected) return 'Spray!'
    return 'Connect Wallet'
  }

  const calculateTotal = () => {
    return addresses.reduce((total, item) => {
      const amount = parseFloat(item.amount) || 0
      return total + amount
    }, 0).toFixed(4)
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-10 text-center">
          <h1 className="mb-2 text-4xl font-bold">
            Batch transfer tokens seamlessly
          </h1>
          <p className="text-xl text-gray-500">fast, secure, and affordable.</p>
        </div>

        <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-lg">
          {/* Chain Selector */}
          <div className="mb-4 flex gap-2">
            <div className="flex gap-1 rounded-full border border-gray-200 p-1">
              <button
                className="flex cursor-pointer items-center gap-2 rounded-full bg-gray-100 px-4 py-2"
                onClick={openChainModal}
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                  <ChainIcon />
                </div>
                <span className="text-sm">{currentChain.name}</span>
              </button>

              <button
                className="flex cursor-pointer items-center gap-2 rounded-full [background-color:#F9F9F9] px-4 py-2 [border:1px_solid_#F1F1F1] hover:bg-gray-50"
                onClick={() => setIsCoinSelectorOpen(!isCoinSelectorOpen)}
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full">
                  <Image
                    src={selectedToken.icon}
                    alt={selectedToken.symbol}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                </div>
                <span>{selectedToken.symbol}</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <div className="ml-auto flex gap-2">
              <Button className="flex items-center gap-2 rounded-xl [background-color:#FF5079] px-4 py-2 text-white shadow-xs hover:opacity-90">
                <AddIcon />
                Import CSV
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full shadow-xs [border:1px_solid_#F1F1F1]"
              >
                <Clock className="h-5 w-5 text-gray-500" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full shadow-xs [border:1px_solid_#F1F1F1]"
              >
                <Settings className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
          </div>

          {/* Coin Selector */}
          {isCoinSelectorOpen && (
            <div className="absolute right-0 top-16 z-50 w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
              <div className="max-h-[300px] space-y-1 overflow-y-auto">
                {filteredTokens.map((token) => (
                  <button
                    key={token.address}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
                    onClick={() => handleCoinSelect(token)}
                  >
                    <Image
                      src={token.icon}
                      alt={token.symbol}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span className="text-sm">{token.symbol}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Send To Section */}
          <div className="mb-2 flex items-center justify-between">
            <h2 className="ml-1 text-sm">Send To</h2>
          </div>

          {/* Address Inputs */}
          <div className="mb-6 max-h-[300px] space-y-3 overflow-y-auto pr-2">
            {addresses.map(item => (
              <div key={item.id} className="flex gap-3">
                <div className="flex-1 rounded-xl [background-color:#F9F9F9] px-4 py-3 [border:1px_solid_#F1F1F1]">
                  <div className="text-xs [color:#999999]">Wallet address</div>
                  <div className="text-xs">{item.address}</div>
                </div>
                <div className="w-40 rounded-xl [background-color:#F9F9F9] px-4 py-3 [border:1px_solid_#F1F1F1]">
                  <input
                    type="number"
                    step="0.0001"
                    min="0"
                    value={item.amount}
                    onChange={(e) => updateAmount(item.id, e.target.value)}
                    className="w-full bg-transparent text-xs outline-none"
                  />
                  <div className="text-xs [color:#999999]">ETH</div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="flex h-10 w-10 items-center justify-center self-center rounded-full [background-color:#F9F9F9] shadow-xs [border:1px_solid_#F1F1F1]"
                  onClick={() => removeAddress(item.id)}
                >
                  <X className="h-5 w-5 text-gray-500" />
                </Button>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex cursor-pointer items-center gap-2 rounded-xl px-4 py-3 shadow-xs [border:1px_solid_#F1F1F1]"
                onClick={addNewAddress}
              >
                <AddIcon />
                Add new
              </Button>
              <Button
                variant="ghost"
                className="cursor-pointer px-4 py-3 underline underline-offset-4"
                onClick={handlePasteFromClipboard}
              >
                <ClipboardIcon />
                Paste from Clipboard
              </Button>
              <Button
                variant="ghost"
                className="cursor-pointer px-4 py-3 underline underline-offset-4"
                onClick={clearAll}
              >
                Clear all
              </Button>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">Total: {calculateTotal()} ETH</div>
              <div className="text-sm text-gray-500">
                Gas fee: 0.0000254 ETH
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            className="w-full rounded-xl [background-color:#FF5079] py-4 text-lg font-semibold text-white shadow-xs hover:opacity-90 disabled:opacity-50"
            onClick={handleSpray}
            disabled={isConnecting || isSending}
          >
            {getButtonText()}
          </Button>
        </div>
      </main>
    </div>
  )
}
