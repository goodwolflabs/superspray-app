'use client'

import { useEffect, useRef, useState } from 'react'
import { useTheme } from '@/hooks/useTheme'
import { SprayCanvasProps, WindowSize } from '@/types/spray'

export function SprayCanvas({ isConnected, isSpraying, onSprayStart, onSprayEnd }: SprayCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 })
  const [spraySize, setSpraySize] = useState(20)
  const [sprayDensity, setSprayDensity] = useState(50)
  const [sprayColor, setSprayColor] = useState('#000000')
  const [sprayOpacity, setSprayOpacity] = useState(0.5)
  const { theme } = useTheme()
  const [windowSize, setWindowSize] = useState<WindowSize>({ width: 0, height: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const updateCanvasSize = () => {
      const container = canvas.parentElement
      if (!container) return

      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      setWindowSize({ width: rect.width, height: rect.height })
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
    }
  }, [])

  const drawSpray = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
    const density = sprayDensity / 100
    const size = spraySize
    const color = theme === 'dark' ? '#ffffff' : sprayColor

    for (let i = 0; i < density * 50; i++) {
      const offsetX = (Math.random() - 0.5) * size
      const offsetY = (Math.random() - 0.5) * size
      const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY)

      if (distance <= size / 2) {
        ctx.fillStyle = color
        ctx.globalAlpha = sprayOpacity
        ctx.fillRect(x + offsetX, y + offsetY, 1, 1)
      }
    }
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isConnected) return
    setIsDrawing(true)
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setLastPos({ x, y })
    onSprayStart()
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !isConnected) return

    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const ctx = canvasRef.current?.getContext('2d')
    if (!ctx) return

    drawSpray(ctx, x, y)
    setLastPos({ x, y })
  }

  const handleMouseUp = () => {
    setIsDrawing(false)
    onSprayEnd()
  }

  const handleMouseLeave = () => {
    setIsDrawing(false)
    onSprayEnd()
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full cursor-crosshair"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      style={{ touchAction: 'none' }}
    />
  )
} 