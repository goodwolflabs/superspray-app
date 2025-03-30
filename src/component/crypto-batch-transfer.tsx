'use client'

import { ChevronDown, Clock, Settings, X } from 'lucide-react'
import { useState } from 'react'

export function Superspray() {
  const [addresses, setAddresses] = useState([
    { address: '0x...', amount: '0.00' },
    { address: '0x...', amount: '0.00' },
    { address: '0x...', amount: '0.00' },
    { address: '0x...', amount: '0.00' },
  ])

  const removeAddress = (index: number) => {
    const newAddresses = [...addresses]
    newAddresses.splice(index, 1)
    setAddresses(newAddresses)
  }

  const addNewAddress = () => {
    setAddresses([...addresses, { address: '0x...', amount: '0.00' }])
  }

  const clearAll = () => {
    setAddresses([])
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}

      {/* Main Content */}
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="mb-16 text-center">
          <h1 className="mb-2 text-4xl font-bold">
            Batch transfer tokens seamlessly
          </h1>
          <p className="text-xl text-gray-500">fast, secure, and affordable.</p>
        </div>

        <div className="rounded-3xl border bg-white p-8 shadow-lg">
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
              <span>ETH</span>
              <ChevronDown className="h-4 w-4" />
            </div>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100"
              >
                <Clock className="h-5 w-5 text-gray-500" />
              </button>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100"
              >
                <Settings className="h-5 w-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Send To Section */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Send To</h2>
            <div className="flex gap-2">
              <button
                type="button"
                className="flex items-center gap-2 rounded-full bg-pink-500 px-4 py-2 text-white"
              >
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
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Import CSV
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-gray-700"
              >
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
              </button>
            </div>
          </div>

          {/* Address Inputs */}
          <div className="mb-6 space-y-3">
            {addresses.map((item, index) => (
              <div
                key={`${item.address}-${item.amount}`}
                className="flex gap-3"
              >
                <div className="flex-1 rounded-xl bg-gray-100 px-4 py-3">
                  <div className="text-xs text-gray-500">Wallet address</div>
                  <div className="text-gray-700">{item.address}</div>
                </div>
                <div className="w-40 rounded-xl bg-gray-100 px-4 py-3">
                  <div className="text-xs text-gray-500">0.00</div>
                  <div className="text-gray-700">ETH</div>
                </div>
                <button
                  type="button"
                  className="flex h-10 w-10 items-center justify-center self-center rounded-xl bg-gray-100"
                  onClick={() => removeAddress(index)}
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex gap-3">
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-3"
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
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl bg-gray-100 px-4 py-3"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Clipboard icon</title>
                  <rect
                    x="3"
                    y="3"
                    width="10"
                    height="10"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                Paste from Clipboard
              </button>
              <button
                type="button"
                className="px-4 py-3 text-gray-500"
                onClick={clearAll}
              >
                Clear all
              </button>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">Total: 12.58 ETH</div>
              <div className="text-sm text-gray-500">
                Gas fee: 0.0000254 ETH
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            className="w-full rounded-xl bg-pink-500 py-4 text-lg font-semibold text-white"
          >
            Spray!
          </button>
        </div>
      </main>
    </div>
  )
}
