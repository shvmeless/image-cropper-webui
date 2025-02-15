// IMPORTS
import type { ReactNode } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import css from './BasicButton.module.scss'

// PROPS
interface BasicButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
  active?: boolean
}

// COMPONENT
export function BasicButton (props: BasicButtonProps): ReactNode {

  // STYLES
  const styles = useClasses(
    css.BasicButton,
    (props.active ?? false) && css.active,
    props.className,
  )

  // RENDER
  return <button type='button'
    className={styles}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    {props.children}
  </button>

}
