'use client'

import { ChevronDown, X } from 'lucide-react'
import { useState } from 'react'
import { useWallet } from '@/hooks/useWallet'
import { Button } from '@/components/ui/button'
import { ClipboardIcon, AddIcon } from '@/components/icons'
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
    <div className="flex flex-col gap-4 p-4 dark:bg-dark-300">
      <div className="min-h-screen font-sans">
        <main className="mx-auto max-w-5xl px-4 py-8">
          <div className="mb-10 text-center">
            <h1 className="mb-2 text-4xl font-bold dark:text-white">
              Batch transfer tokens seamlessly
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400">
              fast, secure, and affordable.
            </p>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-lg dark:border-dark-100 dark:bg-dark-300 md:p-7">
            {/* Chain Selector */}
            <div className="mb-4 flex flex-col gap-2 sm:flex-row">
              <div className="flex gap-1 rounded-full border border-gray-200 p-1 dark:border-dark-100">
                <button
                  className="flex flex-1 cursor-pointer items-center gap-2 rounded-full border border-gray-100 px-3 py-2 hover:bg-gray-50 dark:border-dark-100 dark:hover:bg-dark-200 md:px-4 md:py-2"
                  onClick={openChainModal}
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
                  <span className="text-sm dark:text-white">
                    {currentChain?.name || 'Select Chain'}
                  </span>
                </button>

                <button
                  className="flex flex-1 cursor-pointer items-center gap-2 rounded-full border border-gray-100 px-3 py-2 hover:bg-gray-50 dark:border-dark-100 dark:hover:bg-dark-200 md:px-4 md:py-2"
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
                  <span className="dark:text-white">
                    {selectedToken.symbol}
                  </span>
                  <ChevronDown className="h-4 w-4 dark:text-white" />
                </button>
              </div>
              <div className="mt-2 flex gap-2 sm:ml-auto sm:mt-0">
                <Button className="shadow-xs flex-1 items-center gap-2 rounded-xl bg-spray-red px-4 py-2 text-white hover:opacity-90 sm:flex-none">
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
                <div className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-gray-200 bg-white p-4 shadow-lg dark:border-dark-100 dark:bg-dark-300">
                  <div className="mb-2 px-2">
                    <h3 className="text-sm font-medium dark:text-white">
                      Select Token
                    </h3>
                  </div>
                  <div className="max-h-[300px] space-y-1 overflow-y-auto">
                    {filteredTokens.map(token => (
                      <button
                        key={token.address}
                        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100 dark:hover:bg-dark-200"
                        onClick={() => handleCoinSelect(token)}
                      >
                        <Image
                          src={token.icon}
                          alt={token.symbol}
                          width={24}
                          height={24}
                          className="rounded-full"
                        />
                        <span className="text-sm dark:text-white">
                          {token.symbol}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Send To Section */}
            <div className="mb-2 flex items-center justify-between">
              <h2 className="ml-1 text-sm dark:text-white">Send To</h2>
            </div>

            {/* Address Inputs */}
            <div className="mb-6 max-h-[300px] space-y-3 overflow-y-auto pr-2">
              {addresses.map((address, index) => (
                <div
                  key={`${address}-${index}`}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <div className="flex-1 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 dark:border-dark-100 dark:bg-dark-200">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Wallet address
                    </div>
                    <div className="text-xs dark:text-white">{address}</div>
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-gray-50 px-4 py-3 dark:border-dark-100 dark:bg-dark-200 sm:w-40">
                    <input
                      type="number"
                      step="0.0001"
                      min="0"
                      value={amounts[index] || ''}
                      onChange={e => updateAmount(index, e.target.value)}
                      className="w-full bg-transparent text-xs outline-none dark:text-white"
                    />
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {selectedToken.symbol}
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shadow-xs flex h-10 w-10 items-center justify-center self-center rounded-full border border-gray-100 bg-gray-50 dark:border-dark-100 dark:bg-dark-200"
                    onClick={() => removeAddress(index)}
                  >
                    <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex flex-wrap gap-3">
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
                  className="cursor-pointer px-3 py-2 underline underline-offset-4 dark:text-white"
                  onClick={handlePasteFromClipboard}
                >
                  <ClipboardIcon className="dark:fill-white" />
                  Paste from Clipboard
                </Button>
                <Button
                  variant="ghost"
                  className="cursor-pointer px-3 py-2 underline underline-offset-4 dark:text-white"
                  onClick={clearAll}
                >
                  Clear all
                </Button>
              </div>
              <div className="w-full text-right sm:w-auto">
                <div className="text-xl font-bold dark:text-white">
                  Total: {calculateTotal()} {selectedToken.symbol}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Gas fee:{' '}
                  {maxPriorityFeePerGas
                    ? `${(Number(maxPriorityFeePerGas) / 1e9).toFixed(6)} Gwei`
                    : 'Calculating...'}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              className="shadow-xs w-full cursor-pointer rounded-xl bg-spray-red py-3 text-lg font-semibold text-white hover:opacity-90 disabled:opacity-50 md:py-4"
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
