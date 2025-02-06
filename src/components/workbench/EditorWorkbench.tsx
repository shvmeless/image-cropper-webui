// IMPORTS
import type { ReactNode } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import { EditorReferencesContext, useEditorReferences } from '@contexts/editor/EditorReferencesContext'
import { EditorPreviewContext, useEditorPreview } from '@contexts/editor/EditorPreviewContext'
import { EditorCloseTool } from './tools/EditorCloseTool'
import { EditorCanvas } from './canvas/EditorCanvas'
import css from './EditorWorkbench.module.scss'

// PROPS
interface EditorWorkbenchProps {
  className?: string
}

// COMPONENT
export function EditorWorkbench (props: EditorWorkbenchProps): ReactNode {

  // STATE
  const references = useEditorReferences()
  const preview = useEditorPreview()

  // RENDER
  return <div className={useClasses(css.EditorWorkbench, props.className)}>
    <EditorReferencesContext.Provider value={references}>
      <EditorPreviewContext.Provider value={preview}>

        <EditorCanvas className={css.canvas}/>

        <EditorCloseTool className={css.close}/>

      </EditorPreviewContext.Provider>
    </EditorReferencesContext.Provider>
  </div>

}
