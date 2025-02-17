// IMPORTS
import type { ReactNode } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import css from './BasicIcon.module.scss'

// ICONS
const ICONS = {
  imageUp: <><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M15 8h.01'/><path d='M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5'/><path d='M3 16l5 -5c.928 -.893 2.072 -.893 3 0l3.5 3.5'/><path d='M14 14l1 -1c.679 -.653 1.473 -.829 2.214 -.526'/><path d='M19 22v-6'/><path d='M22 19l-3 -3l-3 3'/></>,
  download: <><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2'/><path d='M7 11l5 5l5 -5'/><path d='M12 4l0 12'/></>,
  close: <><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M18 6l-12 12'/><path d='M6 6l12 12'/></>,
  rotate: <><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M19.95 11a8 8 0 1 0 -.5 4m.5 5v-5h-5'/></>,
  plus: <><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M12 5l0 14'/><path d='M5 12l14 0'/></>,
  minus: <><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M5 12l14 0'/></>,
  renderDefault: <><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M17.765 17.757l-5.765 3.243l-8 -4.5v-9l2.236 -1.258m2.57 -1.445l3.194 -1.797l8 4.5v8.5'/><path d='M14.561 10.559l5.439 -3.059'/><path d='M12 12v9'/><path d='M12 12l-8 -4.5'/><path d='M3 3l18 18'/></>,
  renderPixelated: <><path stroke='none' d='M0 0h24v24H0z' fill='none'/><path d='M12 3l8 4.5l0 9l-8 4.5l-8 -4.5l0 -9l8 -4.5'/><path d='M12 12l8 -4.5'/><path d='M12 12l0 9'/><path d='M12 12l-8 -4.5'/></>,
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
