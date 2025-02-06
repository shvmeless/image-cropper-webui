// IMPORTS
import { useEffect, useRef, useState } from 'react'
import type { MousePosition } from '@lib/common/types'

// TYPE
type DraggingCallback = (current: MousePosition, previous: MousePosition | null) => void

// INTERFACE
export interface DraggingHook {
  update: (callback: DraggingCallback | null) => void
}

// HOOK
export function useDragging (): DraggingHook {

  // STATE
  const [callback, setCallback] = useState<DraggingCallback | null>(null)
  const previous = useRef<MousePosition | null>(null)

  // EFFECT
  useEffect(() => {

    if (callback === null) return

    const onMouseMoveHandler = (event: MouseEvent): void => {
      const { clientX, clientY } = event
      const target = { clientX, clientY }
      callback(target, previous.current)
      previous.current = { ...target }
    }

    const onMouseUpHandler = (): void => {
      setCallback(null)
      previous.current = null
    }

    document.addEventListener('mousemove', onMouseMoveHandler)
    document.addEventListener('mouseup', onMouseUpHandler)

    return () => {
      document.removeEventListener('mousemove', onMouseMoveHandler)
      document.removeEventListener('mouseup', onMouseUpHandler)
    }

  }, [callback])

  // RETURN
  return {

    // METHOD
    update: (callback: DraggingCallback | null): void => {
      setCallback(() => (callback))
    },
  }

}
