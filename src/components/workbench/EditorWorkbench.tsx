// IMPORTS
import type { ReactNode } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import { EditorReferencesContext, useEditorReferences } from '@contexts/editor/EditorReferencesContext'
import { EditorPreviewContext, useEditorPreview } from '@contexts/editor/EditorPreviewContext'
import { EditorCloseTool } from './tools/EditorCloseTool'
import { EditorZoomTool } from './tools/EditorZoomTool'
import { EditorDevData } from './tools/EditorDevData'
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

        <EditorDevData className={css.dev}/>
        <EditorCloseTool className={css.close}/>
        <EditorZoomTool className={css.zoom}/>

        <EditorCanvas className={css.canvas}/>

      </EditorPreviewContext.Provider>
    </EditorReferencesContext.Provider>
  </div>

}
