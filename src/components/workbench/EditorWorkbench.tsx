// IMPORTS
import type { ReactNode } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import { EditorElementsContext, useEditorElements } from '@contexts/editor/EditorElementsContext'
import { EditorImageInputContext, useEditorImageInput } from '@contexts/editor/EditorImageInputContext'
import { EditorCropperContext, useEditorCropper } from '@contexts/editor/EditorCropperContext'
import { EditorPreviewContext, useEditorPreview } from '@contexts/editor/EditorPreviewContext'
import { EditorToolsContext, useEditorTools } from '@contexts/editor/EditorToolsContext'
import { EditorImageInput } from '@workbench/tools/EditorImageInput'
import { EditorDimensionsInput } from './tools/EditorDimensionsInput'
import { EditorPositionInput } from './tools/EditorPositionInput'
import { EditorDownloadButton } from './tools/EditorDownloadButton'
import { AspectRatioOptions } from './tools/AspectRatioOptions'
import { EditorCloseButton } from './tools/EditorCloseButton'
import { EditorZoomOptions } from './tools/EditorZoomOptions'
import { EditorCanvas } from './canvas/EditorCanvas'
import css from './EditorWorkbench.module.scss'
import { EditorRenderModeButton } from './tools/EditorRenderModeButton'

// PROPS
interface EditorWorkbenchProps {
  className?: string
}

// COMPONENT
export function EditorWorkbench (props: EditorWorkbenchProps): ReactNode {

  // CONTEXT
  const input = useEditorImageInput()

  // STATE
  const elements = useEditorElements()
  const preview = useEditorPreview()
  const cropper = useEditorCropper()
  const tools = useEditorTools()

  // HANDLER
  const inputChangeHandler = (file: File): void => {
    input.read(file).catch(console.error)
  }

  // RENDER
  return <div className={useClasses(css.EditorWorkbench, props.className)}>
    <EditorImageInputContext.Provider value={input}>
      <EditorElementsContext.Provider value={elements}>
        <EditorPreviewContext.Provider value={preview}>
          <EditorCropperContext.Provider value={cropper}>
            <EditorToolsContext.Provider value={tools}>

              {(input.image !== null) && <EditorCloseButton className={css.close}/>}

              <div className={css.cropper}>
                <EditorDimensionsInput className={css.tool}/>
                <EditorPositionInput className={css.tool}/>
              </div>

              <EditorRenderModeButton className={css.render}/>

              <div className={css.ratios}>
                <AspectRatioOptions/>
              </div>

              <div className={css.zoom}>
                <EditorZoomOptions/>
              </div>

              {(input.image !== null) && <EditorDownloadButton className={css.download}/>}

              {(input.image === null) && <EditorImageInput className={css.input} onChange={inputChangeHandler}/>}
              {(input.image !== null) && <EditorCanvas className={css.canvas}/>}

            </EditorToolsContext.Provider>
          </EditorCropperContext.Provider>
        </EditorPreviewContext.Provider>
      </EditorElementsContext.Provider>
    </EditorImageInputContext.Provider>
  </div>

}
