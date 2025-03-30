import { useState, useCallback } from 'react'
import { SprayState } from '@/types/spray'

interface UseSprayProps {
  onSprayStart: () => void
  onSprayEnd: () => void
}

export function useSpray({ onSprayStart, onSprayEnd }: UseSprayProps) {
  const [spraySize, setSpraySize] = useState(20)
  const [sprayDensity, setSprayDensity] = useState(50)
  const [sprayOpacity, setSprayOpacity] = useState(0.5)
  const [isEraserActive, setIsEraserActive] = useState(false)

  const handleSizeChange = useCallback((value: number) => {
    setSpraySize(value)
  }, [])

  const handleDensityChange = useCallback((value: number) => {
    setSprayDensity(value)
  }, [])

  const handleOpacityChange = useCallback((value: number) => {
    setSprayOpacity(value)
  }, [])

  const handleToggleEraser = useCallback(() => {
    setIsEraserActive((prev) => !prev)
  }, [])

  const handleClear = useCallback(() => {
    onSprayEnd()
  }, [onSprayEnd])

  const sprayState: SprayState = {
    size: spraySize,
    density: sprayDensity,
    opacity: sprayOpacity,
    isEraserActive,
  }

  return {
    ...sprayState,
    handleSizeChange,
    handleDensityChange,
    handleOpacityChange,
    handleToggleEraser,
    handleClear,
  }
} 