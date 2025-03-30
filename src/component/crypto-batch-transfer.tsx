'use client';

import { ChevronDown, Clock, Settings, X } from 'lucide-react';
import { useState } from 'react';

export function Superspray() {
  const [addresses, setAddresses] = useState([
    { address: '0x...', amount: '0.00' },
    { address: '0x...', amount: '0.00' },
    { address: '0x...', amount: '0.00' },
    { address: '0x...', amount: '0.00' },
  ]);

  const removeAddress = (index: number) => {
    const newAddresses = [...addresses];
    newAddresses.splice(index, 1);
    setAddresses(newAddresses);
  };

  const addNewAddress = () => {
    setAddresses([...addresses, { address: '0x...', amount: '0.00' }]);
  };

  const clearAll = () => {
    setAddresses([]);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-2">
            Batch transfer tokens seamlessly
          </h1>
          <p className="text-xl text-gray-500">fast, secure, and affordable.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-8 border">
          {/* Chain Selector */}
          <div className="flex gap-2 mb-8">
            <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
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
            <div className="bg-gray-100 rounded-full px-4 py-2 flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
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
              <ChevronDown className="w-4 h-4" />
            </div>
            <div className="ml-auto flex gap-2">
              <button
                type="button"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <Clock className="w-5 h-5 text-gray-500" />
              </button>
              <button
                type="button"
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
              >
                <Settings className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </div>

          {/* Send To Section */}
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Send To</h2>
            <div className="flex gap-2">
              <button
                type="button"
                className="bg-pink-500 text-white rounded-full px-4 py-2 flex items-center gap-2"
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
                className="bg-gray-100 text-gray-700 rounded-full px-4 py-2 flex items-center gap-2"
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
          <div className="space-y-3 mb-6">
            {addresses.map((item, index) => (
              <div
                key={`${item.address}-${item.amount}`}
                className="flex gap-3"
              >
                <div className="flex-1 bg-gray-100 rounded-xl px-4 py-3">
                  <div className="text-xs text-gray-500">Wallet address</div>
                  <div className="text-gray-700">{item.address}</div>
                </div>
                <div className="w-40 bg-gray-100 rounded-xl px-4 py-3">
                  <div className="text-xs text-gray-500">0.00</div>
                  <div className="text-gray-700">ETH</div>
                </div>
                <button
                  type="button"
                  className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center self-center"
                  onClick={() => removeAddress(index)}
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-3">
              <button
                type="button"
                className="bg-gray-100 rounded-xl px-4 py-3 flex items-center gap-2"
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
                className="bg-gray-100 rounded-xl px-4 py-3 flex items-center gap-2"
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
                className="text-gray-500 px-4 py-3"
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
            className="w-full bg-pink-500 text-white rounded-xl py-4 font-semibold text-lg"
          >
            Spray!
          </button>
        </div>
      </main>
    </div>
  );
}
