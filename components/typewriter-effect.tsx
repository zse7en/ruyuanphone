"use client"

import { useEffect, useState } from "react"

interface TypewriterEffectProps {
  text: string
  speed?: number
}

export function TypewriterEffect({ text, speed = 30 }: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, speed)

      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, speed])

  return (
    <div className="text-sm leading-relaxed">
      {displayText}
      {currentIndex < text.length && <span className="inline-block w-1 h-4 ml-0.5 bg-purple-400 animate-blink"></span>}
    </div>
  )
}
