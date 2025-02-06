// IMPORTS
import type { ReactNode } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import { EditorWorkbench } from '@workbench/EditorWorkbench'
import css from './EditorScreen.module.scss'

// PROPS
interface EditorScreenProps {
  className?: string
}

// COMPONENT
export function EditorScreen (props: EditorScreenProps): ReactNode {

  // RENDER
  return <div className={useClasses(css.EditorScreen, props.className)}>
    <EditorWorkbench className={css.workbench}/>
  </div>

}
