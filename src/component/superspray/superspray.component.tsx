'use client'

import { ChevronDown, X } from 'lucide-react'
import { useState } from 'react'
import { useWallet } from '@/hooks/useWallet'
import { Button } from '@/components/ui/button'
import { ClipboardIcon, ChainIcon, AddIcon } from '@/components/icons'
import { officialTokenByChain } from '@/constants/official-tokens'
import Image from 'next/image'
import { type Address } from 'viem'

export function Superspray() {
  const [addresses, setAddresses] = useState<string[]>([])
  const [amounts, setAmounts] = useState<string[]>([])
  const [isCoinSelectorOpen, setIsCoinSelectorOpen] = useState(false)
  const [selectedToken, setSelectedToken] = useState(officialTokenByChain[0])
  const {
    isConnected,
    isConnecting,
    isSending,
    openChainModal,
    currentChain,
    sprayEther,
    sprayToken,
    maxPriorityFeePerGas,
  } = useWallet()

  const filteredTokens = officialTokenByChain.filter(
    token => token.chainId === currentChain?.id
  )

  const handleCoinSelect = (token: (typeof officialTokenByChain)[0]) => {
    setSelectedToken(token)
    setIsCoinSelectorOpen(false)
  }

  const removeAddress = (index: number) => {
    const newAddresses = [...addresses]
    const newAmounts = [...amounts]
    newAddresses.splice(index, 1)
    newAmounts.splice(index, 1)
    setAddresses(newAddresses)
    setAmounts(newAmounts)
  }

  // const addNewAddress = () => {
  //   setAddresses([...addresses, '0x...'])
  //   setAmounts([...amounts, '0'])
  // }

  const clearAll = () => {
    setAddresses([])
    setAmounts([])
  }

  const handlePasteFromClipboard = async () => {
    try {
      const text = await navigator.clipboard.readText()
      const lines = text.split('\n').filter(line => line.trim())

      const addressesAndAmounts = lines.map(line => {
        const parts = line.includes(',')
          ? line.split(',').map(item => item.trim())
          : line.split(/\s+/).map(item => item.trim())

        const [address, amount] = parts
        return { address: address ?? '0x...', amount: amount ?? '0.0000' }
      })

      const addresses = addressesAndAmounts.map(item => item.address)
      const amounts = addressesAndAmounts.map(item => item.amount)

      setAddresses(addresses)
      setAmounts(amounts)
    } catch (error) {
      console.error('Failed to read clipboard:', error)
    }
  }

  const updateAmount = (id: number, newAmount: string) => {
    setAmounts(amounts.map((amt, index) => (index === id ? newAmount : amt)))
  }

  const getButtonText = () => {
    if (isConnecting) return 'Connecting...'
    if (isSending) return 'Sending...'
    if (isConnected) return 'Spray!'
    return 'Connect Wallet'
  }

  const calculateTotal = () => {
    return amounts
      .reduce((total, amount) => {
        const value = parseFloat(amount) || 0
        return total + value
      }, 0)
      .toFixed(4)
  }

  const handleSpray = async () => {
    const transactions = addresses
      .map((address, index) => ({
        address,
        amount: amounts[index] || '0',
      }))
      .filter(
        tx =>
          tx.address &&
          tx.address.startsWith('0x') &&
          tx.address !== '0x...' &&
          parseFloat(tx.amount) > 0
      )

    if (transactions.length === 0) {
      alert('Please add valid addresses and amounts')
      return
    }

    try {
      if (
        selectedToken.address === '0x0000000000000000000000000000000000000000'
      ) {
        await sprayEther(transactions)
      } else {
        await sprayToken(selectedToken.address as Address, transactions)
      }

      alert('Spray completed successfully!')

      clearAll()
    } catch (error) {
      console.error('Spray failed:', error)
      alert(
        'Spray failed: ' +
          (error instanceof Error ? error.message : 'Unknown error')
      )
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="min-h-screen bg-white font-sans">
        <main className="mx-auto max-w-5xl px-4 py-8">
          <div className="mb-10 text-center">
            <h1 className="mb-2 text-4xl font-bold">
              Batch transfer tokens seamlessly
            </h1>
            <p className="text-xl text-gray-500">
              fast, secure, and affordable.
            </p>
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
                  <span className="text-sm">
                    {currentChain?.name || 'Select Chain'}
                  </span>
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
                {/* <Button
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
                </Button> */}
              </div>
            </div>

            {/* Coin Selector */}
            {isCoinSelectorOpen && (
              <>
                {/* Backdrop with blur */}
                <button
                  className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                  onClick={() => setIsCoinSelectorOpen(false)}
                />
                {/* Modal */}
                <div className="fixed top-1/2 left-1/2 z-50 w-80 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
                  <div className="mb-2 px-2">
                    <h3 className="text-sm font-medium">Select Token</h3>
                  </div>
                  <div className="max-h-[300px] space-y-1 overflow-y-auto">
                    {filteredTokens.map(token => (
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
              </>
            )}

            {/* Send To Section */}
            <div className="mb-2 flex items-center justify-between">
              <h2 className="ml-1 text-sm">Send To</h2>
            </div>

            {/* Address Inputs */}
            <div className="mb-6 max-h-[300px] space-y-3 overflow-y-auto pr-2">
              {addresses.map((address, index) => (
                <div key={`${address}-${index}`} className="flex gap-3">
                  <div className="flex-1 rounded-xl [background-color:#F9F9F9] px-4 py-3 [border:1px_solid_#F1F1F1]">
                    <div className="text-xs [color:#999999]">
                      Wallet address
                    </div>
                    <div className="text-xs">{address}</div>
                  </div>
                  <div className="w-40 rounded-xl [background-color:#F9F9F9] px-4 py-3 [border:1px_solid_#F1F1F1]">
                    <input
                      type="number"
                      step="0.0001"
                      min="0"
                      value={amounts[index] || ''}
                      onChange={e => updateAmount(index, e.target.value)}
                      className="w-full bg-transparent text-xs outline-none"
                    />
                    <div className="text-xs [color:#999999]">
                      {selectedToken.symbol}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="flex h-10 w-10 items-center justify-center self-center rounded-full [background-color:#F9F9F9] shadow-xs [border:1px_solid_#F1F1F1]"
                    onClick={() => removeAddress(index)}
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mb-6 flex items-center justify-between">
              <div className="flex gap-3">
                {/* <Button
                  variant="outline"
                  className="flex cursor-pointer items-center gap-2 rounded-xl px-4 py-3 shadow-xs [border:1px_solid_#F1F1F1]"
                  onClick={addNewAddress}
                >
                  <AddIcon />
                  Add new
                </Button> */}
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
                <div className="text-xl font-bold">
                  Total: {calculateTotal()} {selectedToken.symbol}
                </div>
                <div className="text-sm text-gray-500">
                  Gas fee:{' '}
                  {maxPriorityFeePerGas
                    ? `${(Number(maxPriorityFeePerGas) / 1e9).toFixed(6)} Gwei`
                    : 'Calculating...'}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              className="w-full cursor-pointer rounded-xl [background-color:#FF5079] py-4 text-lg font-semibold text-white shadow-xs hover:opacity-90 disabled:opacity-50"
              onClick={handleSpray}
              disabled={isConnecting || isSending}
            >
              {getButtonText()}
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
