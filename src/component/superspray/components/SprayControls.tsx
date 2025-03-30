'use client'

import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Eraser, Spray, Trash2 } from 'lucide-react'
import { SprayControlsProps } from '@/types/spray'

export function SprayControls({
  spraySize,
  sprayDensity,
  sprayOpacity,
  onSizeChange,
  onDensityChange,
  onOpacityChange,
  onClear,
  onToggleEraser,
  isEraserActive,
}: SprayControlsProps) {
  return (
    <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="size">Spray Size</Label>
          <Slider
            id="size"
            min={1}
            max={50}
            value={[spraySize]}
            onValueChange={([value]) => onSizeChange(value)}
            className="w-[200px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="density">Density</Label>
          <Slider
            id="density"
            min={1}
            max={100}
            value={[sprayDensity]}
            onValueChange={([value]) => onDensityChange(value)}
            className="w-[200px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="opacity">Opacity</Label>
          <Slider
            id="opacity"
            min={0}
            max={100}
            value={[sprayOpacity * 100]}
            onValueChange={([value]) => onOpacityChange(value / 100)}
            className="w-[200px]"
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant={isEraserActive ? 'default' : 'outline'}
            size="icon"
            onClick={onToggleEraser}
            title="Toggle Eraser"
          >
            <Eraser className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={onClear} title="Clear Canvas">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
} 