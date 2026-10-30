"use client"

import { useId } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

type FilterControlsProps = {
  maxNoise: number
  minAirflow: number
  inStockOnly: boolean
  pwmOnly: boolean
  onMaxNoiseChange: (value: number) => void
  onMinAirflowChange: (value: number) => void
  onInStockOnlyChange: (checked: boolean) => void
  onPwmOnlyChange: (checked: boolean) => void
  onReset: () => void
  className?: string
}

export function FilterControls({
  maxNoise,
  minAirflow,
  inStockOnly,
  pwmOnly,
  onMaxNoiseChange,
  onMinAirflowChange,
  onInStockOnlyChange,
  onPwmOnlyChange,
  onReset,
  className,
}: FilterControlsProps) {
  const id = useId()
  const noiseLabelId = `noise-label-${id}`
  const airflowLabelId = `airflow-label-${id}`
  const stockLabelId = `stock-label-${id}`
  const pwmLabelId = `pwm-label-${id}`

  return (
    <Card className={cn("gap-0 py-0 shadow-none", className)}>
      <CardHeader className="flex flex-row items-center justify-between gap-3 border-b border-border/70 px-4 py-4">
        <CardTitle
          role="heading"
          aria-level={3}
          className="text-sm font-semibold"
        >
          Refine results
        </CardTitle>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="h-7 px-2 text-xs text-muted-foreground"
          onClick={onReset}
        >
          Reset
        </Button>
      </CardHeader>

      <CardContent className="flex flex-col gap-6 px-4 py-5">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <p id={noiseLabelId} className="text-sm font-medium">
              Noise ceiling
            </p>
            <span className="text-xs font-medium tabular-nums text-muted-foreground">
              {maxNoise} dBA
            </span>
          </div>
          <Slider
            aria-labelledby={noiseLabelId}
            min={10}
            max={50}
            step={1}
            value={[maxNoise]}
            onValueChange={(values) => {
              const value = Array.isArray(values) ? values[0] : values
              if (typeof value === "number") onMaxNoiseChange(value)
            }}
          />
          <div className="flex justify-between text-[10px] tabular-nums text-muted-foreground">
            <span>10 dBA</span>
            <span>50 dBA</span>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3">
            <p id={airflowLabelId} className="text-sm font-medium">
              Minimum airflow
            </p>
            <span className="text-xs font-medium tabular-nums text-muted-foreground">
              {minAirflow} CFM
            </span>
          </div>
          <Slider
            aria-labelledby={airflowLabelId}
            min={0}
            max={180}
            step={5}
            value={[minAirflow]}
            onValueChange={(values) => {
              const value = Array.isArray(values) ? values[0] : values
              if (typeof value === "number") onMinAirflowChange(value)
            }}
          />
          <div className="flex justify-between text-[10px] tabular-nums text-muted-foreground">
            <span>0 CFM</span>
            <span>180 CFM</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-xl bg-muted/50 px-3 py-3">
          <div className="min-w-0">
            <p id={stockLabelId} className="text-sm font-medium">
              In stock only
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Hide unavailable fans
            </p>
          </div>
          <Switch
            checked={inStockOnly}
            onCheckedChange={onInStockOnlyChange}
            aria-labelledby={stockLabelId}
          />
        </div>

        <div className="flex items-center justify-between gap-3 rounded-xl bg-muted/50 px-3 py-3">
          <div className="min-w-0">
            <p id={pwmLabelId} className="text-sm font-medium">
              PWM smart control
            </p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Show PWM-ready models
            </p>
          </div>
          <Switch
            checked={pwmOnly}
            onCheckedChange={onPwmOnlyChange}
            aria-labelledby={pwmLabelId}
          />
        </div>
      </CardContent>
    </Card>
  )
}
