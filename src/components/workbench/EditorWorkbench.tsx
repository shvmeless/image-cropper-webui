// IMPORTS
import type { ReactNode } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import { EditorReferencesContext, useEditorReferences } from '@contexts/editor/EditorReferencesContext'
import { EditorCropperContext, useEditorCropper } from '@contexts/editor/EditorCropperContext'
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
  const cropper = useEditorCropper()

  // RENDER
  return <div className={useClasses(css.EditorWorkbench, props.className)}>
    <EditorReferencesContext.Provider value={references}>
      <EditorPreviewContext.Provider value={preview}>
        <EditorCropperContext.Provider value={cropper}>

          <EditorDevData className={css.dev}/>
          <EditorCloseTool className={css.close}/>
          <EditorZoomTool className={css.zoom}/>

          <EditorCanvas className={css.canvas}/>

        </EditorCropperContext.Provider>
      </EditorPreviewContext.Provider>
    </EditorReferencesContext.Provider>
  </div>

}
