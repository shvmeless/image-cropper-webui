// IMPORTS
import { type ReactNode, useRef, useState } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import css from './BasicTooltip.module.scss'

// TYPES
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'topright' | 'topleft' | 'bottomright' | 'bottomleft'

// PROPS
interface BasicTooltipProps {
  text: string
  position: TooltipPosition
  disabled?: boolean

  className?: string
  children?: ReactNode
}

// COMPONENT
export function BasicTooltip (props: BasicTooltipProps): ReactNode {

  // STATE
  const [isActive, setIsActive] = useState(false)
  const timeout = useRef<number | null>(null)

  // FUNCTION
  const showTooltip = (): void => {
    if ((props.disabled ?? false)) return
    timeout.current = window.setTimeout(() => {
      setIsActive(true)
    }, 250)
  }

  // FUNCTION
  const hideTooltip = (): void => {
    if (timeout.current !== null) window.clearTimeout(timeout.current)
    setIsActive(false)
  }

  // RENDER
  return <div className={useClasses(css.BasicTooltip, props.className)}
    onMouseEnter={showTooltip}
    onMouseLeave={hideTooltip}
  >
    {props.children}
    {isActive && <div className={useClasses(css.text, css[props.position])}>{props.text}</div>}
  </div>
}
