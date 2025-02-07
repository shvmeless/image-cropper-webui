// IMPORTS
import type { ReactNode } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import css from './EditorCropper.module.scss'

// PROPS
interface EditorCropperProps {
  className?: string
}

// COMPONENT
export function EditorCropper (props: EditorCropperProps): ReactNode {

  // RENDER
  return <div className={useClasses(css.EditorCropper, props.className)}>
    {/*  */}
  </div>

}
