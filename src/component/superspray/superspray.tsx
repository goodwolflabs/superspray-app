'use client'

import { ChevronDown, Clock, Settings, X } from 'lucide-react'
import { useState } from 'react'
import { useWallet } from '@/hooks/useWallet'
import { Button } from '@/components/ui/button'
import { ClipboardIcon } from '@/components/icons/clipboard-icon'

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
  const { isConnected, connect, connectors, isConnecting, sendBatchTransactions, isSending } = useWallet()

  const removeAddress = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id))
  }

  const addNewAddress = () => {
    const newId = (Math.max(...addresses.map(addr => parseInt(addr.id))) + 1).toString()
    setAddresses([...addresses, { id: newId, address: '0x...', amount: '0.00' }])
  }

  const clearAll = () => {
    setAddresses([])
  }

  const handleSpray = async () => {
    if (!isConnected) {
      connect({ connector: connectors[0] })
      return
    }
    await sendBatchTransactions(addresses)
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-16 text-center">
          <h1 className="mb-2 text-4xl font-bold">
            Batch transfer tokens seamlessly
          </h1>
          <p className="text-xl text-gray-500">fast, secure, and affordable.</p>
        </div>

        <div className="rounded-3xl border bg-white p-8 shadow-lg border-gray-200">
          {/* Chain Selector */}
          <div className="mb-8 flex gap-2">
            <div className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                <svg
                  width="12"
                  height="18"
                  viewBox="0 0 12 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Chain icon</title>
                  <path d="M6 0L0 9L6 6.75L12 9L6 0Z" fill="white" />
                  <path d="M6 6.75L0 9L6 12L12 9L6 6.75Z" fill="white" />
                  <path d="M6 12L0 9L6 18L12 9L6 12Z" fill="white" />
                </svg>
              </div>
              <span>Chain</span>
            </div>
            <div className="flex items-center gap-2 rounded-full [background-color:#F9F9F9] [border:1px_solid_#F1F1F1] px-4 py-2">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500">
                <svg
                  width="12"
                  height="18"
                  viewBox="0 0 12 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Chain icon</title>
                  <path d="M6 0L0 9L6 6.75L12 9L6 0Z" fill="white" />
                  <path d="M6 6.75L0 9L6 12L12 9L6 6.75Z" fill="white" />
                  <path d="M6 12L0 9L6 18L12 9L6 12Z" fill="white" />
                </svg>
              </div>
              <span>ETH</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="ml-auto flex gap-2">
              <Button variant="outline" size="icon" className="[border:1px_solid_#F1F1F1] shadow-xs rounded-full">
                <Clock className="h-5 w-5 text-gray-500" />
              </Button>
              <Button variant="outline" size="icon" className="[border:1px_solid_#F1F1F1] shadow-xs rounded-full">
                <Settings className="h-5 w-5 text-gray-500" />
              </Button>
            </div>
          </div>

          {/* Send To Section */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Send To</h2>
            <div className="flex gap-2">
              <Button className="flex items-center gap-2 rounded-full [background-color:#FF5079] hover:opacity-90 px-4 py-2 text-white shadow-xs">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Add icon</title>
                  <path
                    d="M8 3.5V12.5M3.5 8H12.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Import CSV
              </Button>
              <Button variant="outline" className="flex items-center gap-2 rounded-full px-4 py-2 text-gray-700 [border:1px_solid_#F1F1F1] shadow-xs">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Export icon</title>
                  <path
                    d="M8 3.5V12.5M3.5 8H12.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Export CSV
              </Button>
            </div>
          </div>

          {/* Address Inputs */}
          <div className="mb-6 space-y-3">
            {addresses.map((item) => (
              <div
                key={item.id}
                className="flex gap-3"
              >
                <div className="flex-1 rounded-xl [background-color:#F9F9F9] [border:1px_solid_#F1F1F1] px-4 py-3">
                  <div className="text-xs [color:#999999]">Wallet address</div>
                  <div className="[color:#999999]">{item.address}</div>
                </div>
                <div className="w-40 rounded-xl [background-color:#F9F9F9] [border:1px_solid_#F1F1F1] px-4 py-3">
                  <div className="text-xs [color:#999999]">0.00</div>
                  <div className="[color:#999999]">ETH</div>
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="flex h-10 w-10 items-center justify-center self-center rounded-full [background-color:#F9F9F9] [border:1px_solid_#F1F1F1] shadow-xs"
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
                className="flex items-center gap-2 rounded-xl px-4 py-3 [border:1px_solid_#F1F1F1] shadow-xs"
                onClick={addNewAddress}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Add new icon</title>
                  <path
                    d="M8 3.5V12.5M3.5 8H12.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Add new
              </Button>
              <Button
                variant="ghost"
                className="px-4 py-3"
              >
                <ClipboardIcon />
                Paste from Clipboard
              </Button>
              <Button
                variant="ghost"
                className="px-4 py-3"
                onClick={clearAll}
              >
                Clear all
              </Button>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">Total: 12.58 ETH</div>
              <div className="text-sm text-gray-500">
                Gas fee: 0.0000254 ETH
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            className="w-full rounded-xl [background-color:#FF5079] hover:opacity-90 py-4 text-lg font-semibold text-white disabled:opacity-50 shadow-xs"
            onClick={handleSpray}
            disabled={isConnecting || isSending}
          >
            {isConnecting ? 'Connecting...' : isSending ? 'Sending...' : isConnected ? 'Spray!' : 'Connect Wallet'}
          </Button>
        </div>
      </main>
    </div>
  )
} 