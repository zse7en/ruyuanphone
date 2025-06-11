"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface AnimatedValueProps {
  value: number
  unit?: string
  className?: string
  delay?: number
  duration?: number
}

export function AnimatedValue({ value, unit = "", className = "", delay = 0, duration = 1000 }: AnimatedValueProps) {
  const [displayValue, setDisplayValue] = useState(0)
  const [animationStarted, setAnimationStarted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationStarted(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  useEffect(() => {
    if (!animationStarted) return

    let startTime: number | null = null
    const startValue = 0

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      setDisplayValue(startValue + progress * (value - startValue))

      if (progress < 1) {
        window.requestAnimationFrame(step)
      }
    }

    window.requestAnimationFrame(step)
  }, [value, duration, animationStarted])

  return (
    <span className={cn(className)}>
      {displayValue.toFixed(1)}
      {unit}
    </span>
  )
}
