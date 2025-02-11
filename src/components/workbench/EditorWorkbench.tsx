// IMPORTS
import type { ReactNode } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import { EditorReferencesContext, useEditorReferences } from '@contexts/editor/EditorReferencesContext'
import { EditorCropperContext, useEditorCropper } from '@contexts/editor/EditorCropperContext'
import { EditorPreviewContext, useEditorPreview } from '@contexts/editor/EditorPreviewContext'
import { EditorImageInputContext, useEditorImageInput } from '@contexts/editor/EditorImageInputContext'
import { EditorImageInput } from '@workbench/tools/EditorImageInput'
import { EditorDimensionsInput } from './tools/EditorDimensionsInput'
import { EditorPositionInput } from './tools/EditorPositionInput'
import { EditorDownloadButton } from './tools/EditorDownloadButton'
import { EditorCloseButton } from './tools/EditorCloseButton'
import { EditorZoomOptions } from './tools/EditorZoomOptions'
import { EditorCanvas } from './canvas/EditorCanvas'
import css from './EditorWorkbench.module.scss'

// PROPS
interface EditorWorkbenchProps {
  className?: string
}

// COMPONENT
export function EditorWorkbench (props: EditorWorkbenchProps): ReactNode {

  // CONTEXT
  const input = useEditorImageInput()

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
    <EditorImageInputContext.Provider value={input}>
      <EditorReferencesContext.Provider value={references}>
        <EditorPreviewContext.Provider value={preview}>
          <EditorCropperContext.Provider value={cropper}>

            {(input.image !== null) && <EditorCloseButton className={css.close}/>}

            <div className={css.cropper}>
              <EditorDimensionsInput className={css.tool}/>
              <EditorPositionInput className={css.tool}/>
            </div>

            <div className={css.zoom}>
              <EditorZoomOptions/>
            </div>

            {(input.image !== null) && <EditorDownloadButton className={css.download}/>}

            {(input.image === null) && <EditorImageInput className={css.input} onChange={inputChangeHandler}/>}
            {(input.image !== null) && <EditorCanvas className={css.canvas}/>}

          </EditorCropperContext.Provider>
        </EditorPreviewContext.Provider>
      </EditorReferencesContext.Provider>
    </EditorImageInputContext.Provider>
  </div>

}
