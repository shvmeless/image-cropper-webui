// IMPORTS
import type { ReactNode } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import { BasicIcon, type IconVariant } from '@ui/BasicIcon/BasicIcon'
import css from './BasicIconButton.module.scss'

// PROPS
interface BasicIconButtonProps {
  onClick?: () => void
  label: string
  icon: IconVariant
  iconSize?: 'small' | 'medium' | 'large'
  className?: string
  disabled?: boolean
  active?: boolean
}

// COMPONENT
export function BasicIconButton (props: BasicIconButtonProps): ReactNode {

  // STYLES
  const styles = useClasses(
    css.BasicIconButton,
    (props.active ?? false) && css.active,
    props.className,
  )

  // RENDER
  return <button type='button'
    className={styles}
    aria-label={props.label}
    onClick={props.onClick}
    disabled={props.disabled}
  >
    <BasicIcon icon={props.icon} size={props.iconSize}/>
  </button>

}
