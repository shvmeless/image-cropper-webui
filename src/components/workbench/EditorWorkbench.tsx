// IMPORTS
import { useContext, type ReactNode } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import { EditorReferencesContext, useEditorReferences } from '@contexts/editor/EditorReferencesContext'
import { EditorCropperContext, useEditorCropper } from '@contexts/editor/EditorCropperContext'
import { EditorPreviewContext, useEditorPreview } from '@contexts/editor/EditorPreviewContext'
import { ImageInputContext } from '@contexts/common/ImageInputContext'
import { ImageInput } from '@ui/ImageInput/ImageInput'
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

  // CONTEXT
  const input = useContext(ImageInputContext)

  // STATE
  const references = useEditorReferences()
  const preview = useEditorPreview()
  const cropper = useEditorCropper()

  // HANDLER
  const inputChangeHandler = (file: File): void => {
    input.read(file).catch(console.error)
  }

  // RENDER
  return <div className={useClasses(css.EditorWorkbench, props.className)}>
    <EditorReferencesContext.Provider value={references}>
      <EditorPreviewContext.Provider value={preview}>
        <EditorCropperContext.Provider value={cropper}>

          {(input.image !== null) && <EditorCloseTool className={css.close}/>}

          <div className={css.cropper}>
            <EditorCropperDimensionsTool className={css.tool}/>
            <EditorCropperPositionTool className={css.tool}/>
          </div>

          <EditorZoomTool className={css.zoom}/>

          {(input.image !== null) && <EditorDownloadTool className={css.download}/>}

          {(input.image === null) && <ImageInput className={css.input} onChange={inputChangeHandler}/>}
          {(input.image !== null) && <EditorCanvas className={css.canvas}/>}

        </EditorCropperContext.Provider>
      </EditorPreviewContext.Provider>
    </EditorReferencesContext.Provider>
  </div>

}
