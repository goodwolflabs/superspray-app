export interface WindowSize {
  width: number
  height: number
}

export interface SprayState {
  size: number
  density: number
  opacity: number
  isEraserActive: boolean
}

export interface SprayCanvasProps {
  isConnected: boolean
  isSpraying: boolean
  onSprayStart: () => void
  onSprayEnd: () => void
}

export interface SprayControlsProps {
  spraySize: number
  sprayDensity: number
  sprayOpacity: number
  onSizeChange: (value: number) => void
  onDensityChange: (value: number) => void
  onOpacityChange: (value: number) => void
  onClear: () => void
  onToggleEraser: () => void
  isEraserActive: boolean
}
