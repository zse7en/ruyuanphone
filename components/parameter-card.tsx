"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, ArrowUp, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatedValue } from "@/components/animated-value"

type ParameterProps = {
  parameter: {
    name: string
    current: string
    recommended: string
    status: "increase" | "decrease" | "maintain"
  }
  delay?: number
}

export function ParameterCard({ parameter, delay = 0 }: ParameterProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "increase":
        return "text-green-400 bg-green-500/10"
      case "decrease":
        return "text-yellow-400 bg-yellow-500/10"
      case "maintain":
        return "text-gray-400 bg-gray-500/10"
      default:
        return "text-gray-400 bg-gray-500/10"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "increase":
        return <ArrowUp className="h-4 w-4" />
      case "decrease":
        return <ArrowDown className="h-4 w-4" />
      case "maintain":
        return <Minus className="h-4 w-4" />
      default:
        return null
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "increase":
        return "建议提高"
      case "decrease":
        return "建议降低"
      case "maintain":
        return "保持不变"
      default:
        return ""
    }
  }

  // Extract numeric value for animation
  const extractNumeric = (value: string) => {
    const match = value.match(/(\d+(\.\d+)?)/)
    return match ? Number.parseFloat(match[0]) : 0
  }

  const currentValue = extractNumeric(parameter.current)
  const recommendedValue = extractNumeric(parameter.recommended)

  return (
    <Card
      className={cn(
        "bg-[#1a1a1a] border-white/5 rounded-2xl overflow-hidden transition-all duration-500 transform",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
      )}
    >
      <CardContent className="p-0">
        <div className="px-6 py-4 border-b border-white/5">
          <h3 className="font-medium text-white">{parameter.name}</h3>
        </div>
        <div className="grid grid-cols-2 divide-x divide-white/5">
          <div className="p-6 flex flex-col items-center justify-center">
            <span className="text-xs text-gray-400 mb-2 font-medium">当前值</span>
            <AnimatedValue value={currentValue} unit=" MPa" className="text-xl font-semibold text-white" />
          </div>
          <div className="p-6 flex flex-col items-center justify-center">
            <span className="text-xs text-gray-400 mb-2 font-medium">建议值</span>
            <AnimatedValue
              value={recommendedValue}
              unit=" MPa"
              className="text-xl font-semibold text-purple-400"
              delay={delay + 300}
            />
          </div>
        </div>
        <div
          className={cn(
            "px-6 py-4 flex items-center justify-center gap-3 rounded-b-2xl",
            getStatusColor(parameter.status),
          )}
        >
          <div className="w-5 h-5 rounded-lg bg-white/10 flex items-center justify-center">
            {getStatusIcon(parameter.status)}
          </div>
          <span className="font-medium">{getStatusText(parameter.status)}</span>
        </div>
      </CardContent>
    </Card>
  )
}
