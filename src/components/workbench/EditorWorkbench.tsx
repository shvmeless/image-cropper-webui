// IMPORTS
import type { ReactNode } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import { EditorCanvas } from './canvas/EditorCanvas'
import css from './EditorWorkbench.module.scss'

// PROPS
interface EditorWorkbenchProps {
  className?: string
}

// COMPONENT
export function EditorWorkbench (props: EditorWorkbenchProps): ReactNode {

  // RENDER
  return <div className={useClasses(css.EditorWorkbench, props.className)}>
    <EditorCanvas className={css.canvas}/>
  </div>

}
