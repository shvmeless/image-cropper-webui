// IMPORTS
import { type ReactNode, useContext, useEffect, useRef } from 'react'
import { PreviewCalculator } from '@lib/editor/PreviewCalculator'
import type { Dimensions, Position } from '@lib/common/types'
import { useClasses } from '@hooks/common/useClasses'
import { EditorImageInputContext } from '@contexts/editor/EditorImageInputContext'
import { EditorElementsContext } from '@contexts/editor/EditorElementsContext'
import { EditorPreviewContext } from '@contexts/editor/EditorPreviewContext'
import { EditorToolsContext } from '@contexts/editor/EditorToolsContext'
import { EditorCropper } from './EditorCropper'
import css from './EditorPreview.module.scss'

// PROPS
interface EditorPreviewProps {
  className?: string
}

// COMPONENT
export function EditorPreview (props: EditorPreviewProps): ReactNode {

  // CONTEXT
  const input = useContext(EditorImageInputContext)
  const elements = useContext(EditorElementsContext)
  const preview = useContext(EditorPreviewContext)
  const tools = useContext(EditorToolsContext)

  // RENDER
  if (input.image === null) return null

  // ELEMENTS
  const imageRef = useRef<HTMLImageElement>(null)

  // EFFECT
  useEffect(() => {

    const callback = (values: Dimensions & Position): void => {
      if (elements.preview.current === null) return
      elements.preview.current.style.width = `${values.width}px`
      elements.preview.current.style.height = `${values.height}px`
      elements.preview.current.style.left = `calc(50% - ${values.x}px)`
      elements.preview.current.style.top = `calc(50% - ${values.y}px)`
    }

    preview.subscriber.subscribe(callback)
    return () => {
      preview.subscriber.unsubscribe(callback)
    }

  }, [input.image])

  // EFFECT
  useEffect(() => {

    if (input.image === null) return
    if (preview.values.current === null) return

    const calculator = PreviewCalculator(input.image.dimensions, preview.values.current)
    const result = calculator.reset()

    preview.setValues(result)

  }, [input.image])

  // EFFECT
  useEffect(() => {
    if (imageRef.current === null) return
    const renderMode = (tools.renderMode === 'default') ? 'auto' : 'pixelated'
    imageRef.current.style.imageRendering = renderMode
  }, [tools.renderMode])

  // RENDER
  return <div ref={elements.preview}
    className={useClasses(css.EditorPreview, props.className)}
  >

    <img ref={imageRef}
      className={css.image}
      alt={input.image.name}
      src={URL.createObjectURL(input.image.blob)}
      draggable={false}
    />

    <EditorCropper className={css.cropper}/>

  </div>

}
