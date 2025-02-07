// IMPORTS
import type { ReactNode } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import css from './BasicIcon.module.scss'

// ICONS
const ICONS = {
  imageUp: <><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M15 8h.01'/><path d='M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5'/><path d='M3 16l5 -5c.928 -.893 2.072 -.893 3 0l3.5 3.5'/><path d='M14 14l1 -1c.679 -.653 1.473 -.829 2.214 -.526'/><path d='M19 22v-6'/><path d='M22 19l-3 -3l-3 3'/></>,
  close: <><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M18 6l-12 12'/><path d='M6 6l12 12'/></>,
  plus: <><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M12 5l0 14'/><path d='M5 12l14 0'/></>,
  minus: <><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M5 12l14 0'/></>,
}

// TYPE
export type IconVariant = keyof typeof ICONS

// PROPS
interface BasicIconProps {
  icon: IconVariant
  size?: 'small' | 'medium' | 'large'
  className?: string
}

// COMPONENT
export function BasicIcon (props: BasicIconProps): ReactNode {

  // STYLES
  const styles = useClasses(
    css.BasicIcon,
    css[props.size ?? 'medium'],
    props.className,
  )

  // RENDER
  return <svg className={styles}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
  >
    {ICONS[props.icon]}
  </svg>

}
