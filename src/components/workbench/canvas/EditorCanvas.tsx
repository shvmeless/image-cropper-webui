// IMPORTS
import type { ReactNode } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import { EditorPreview } from './EditorPreview'
import css from './EditorCanvas.module.scss'

// PROPS
interface EditorCanvasProps {
  className?: string
}

// COMPONENT
export function EditorCanvas (props: EditorCanvasProps): ReactNode {

  // RENDER
  return <div className={useClasses(css.EditorCanvas, props.className)}>
    <EditorPreview className={css.preview}/>
  </div>

}
