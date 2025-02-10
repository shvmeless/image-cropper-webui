// IMPORTS
import type { ReactNode } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import { EditorReferencesContext, useEditorReferences } from '@contexts/editor/EditorReferencesContext'
import { EditorCropperContext, useEditorCropper } from '@contexts/editor/EditorCropperContext'
import { EditorPreviewContext, useEditorPreview } from '@contexts/editor/EditorPreviewContext'
import { EditorCropperDimensionsTool } from './tools/EditorCropperDimensionsTool'
import { EditorCropperPositionTool } from './tools/EditorCropperPositionTool'
import { EditorDownloadTool } from './tools/EditorDownloadTool'
import { EditorCloseTool } from './tools/EditorCloseTool'
import { EditorZoomTool } from './tools/EditorZoomTool'
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

          <EditorCloseTool className={css.close}/>
          <div className={css.cropper}>
            <EditorCropperDimensionsTool className={css.tool}/>
            <EditorCropperPositionTool className={css.tool}/>
          </div>
          <EditorZoomTool className={css.zoom}/>
          <EditorDownloadTool className={css.download}/>

          <EditorCanvas className={css.canvas}/>

        </EditorCropperContext.Provider>
      </EditorPreviewContext.Provider>
    </EditorReferencesContext.Provider>
  </div>

}
