'use client'

import { useEffect, useRef, useState } from 'react'

interface TypingEffectProps {
  text: string
  speed?: number
  onComplete?: () => void
}

const TypingEffect: React.FC<TypingEffectProps> = ({ text, speed = 2, onComplete }) => {
  const [state, setState] = useState({ displayText: '', currentIndex: 0, prevText: text })
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const onCompleteRef = useRef(onComplete)

  // Update the ref when onComplete changes
  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  // Derive state from text changes
  if (state.prevText !== text) {
    setState({ displayText: '', currentIndex: 0, prevText: text })
  }

  // Handle typing animation
  useEffect(() => {
    if (state.currentIndex < text.length) {
      timeoutRef.current = setTimeout(() => {
        setState(prev => ({
          ...prev,
          displayText: prev.displayText + text[state.currentIndex],
          currentIndex: prev.currentIndex + 1,
        }))
      }, speed)
    } else if (state.currentIndex === text.length && state.displayText.length === text.length) {
      if (onCompleteRef.current) {
        onCompleteRef.current()
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [state.currentIndex, text, speed, state.displayText.length])

  return <span>{state.displayText}</span>
}

export default TypingEffect
