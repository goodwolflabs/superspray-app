'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { SprayCanvas } from './components/SprayCanvas'
import { SprayControls } from './components/SprayControls'
import { useSpray } from '@/hooks/useSpray'

export function Superspray() {
  const { isConnected } = useAccount()
  const [isSpraying, setIsSpraying] = useState(false)

  const {
    size: spraySize,
    density: sprayDensity,
    opacity: sprayOpacity,
    isEraserActive,
    handleSizeChange,
    handleDensityChange,
    handleOpacityChange,
    handleToggleEraser,
    handleClear,
  } = useSpray({
    onSprayStart: () => setIsSpraying(true),
    onSprayEnd: () => setIsSpraying(false),
  })

  return (
    <div className="relative w-full h-full min-h-screen bg-background">
      <SprayCanvas
        isConnected={isConnected}
        isSpraying={isSpraying}
        onSprayStart={() => setIsSpraying(true)}
        onSprayEnd={() => setIsSpraying(false)}
      />
      <SprayControls
        spraySize={spraySize}
        sprayDensity={sprayDensity}
        sprayOpacity={sprayOpacity}
        onSizeChange={handleSizeChange}
        onDensityChange={handleDensityChange}
        onOpacityChange={handleOpacityChange}
        onClear={handleClear}
        onToggleEraser={handleToggleEraser}
        isEraserActive={isEraserActive}
      />
    </div>
  )
} 