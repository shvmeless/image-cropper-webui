// IMPORTS
import { type ReactNode, type WheelEvent, type MouseEvent, useContext, useEffect, useRef } from 'react'
import { PreviewCalculator } from '@lib/editor/PreviewCalculator'
import type { Dimensions, Position } from '@lib/common/types'
import { EditorUtils } from '@lib/editor/EditorUtils'
import { useClasses } from '@hooks/common/useClasses'
import { useDragging } from '@hooks/useDragging'
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

  // STATE
  const dragging = useDragging()

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

  // HANDLER
  const mouseDownHandler = (event: MouseEvent<HTMLDivElement>): void => {
    if (!event.altKey) return
    dragging.update((target, previous) => {

      if (input.image === null) return
      if (preview.values.current === null) return

      const calculator = PreviewCalculator(input.image.dimensions, preview.values.current)
      const result = calculator.setPosition({
        x: target.clientX - (previous ?? event).clientX,
        y: target.clientY - (previous ?? event).clientY,
      })

      preview.setValues(result)

    })
  }

  // HANDLER
  const onEditorWheel = (event: WheelEvent<HTMLDivElement>): void => {

    if (event.deltaY === 0) return
    if (!event.altKey) return

    if (input.image === null) return
    if (preview.values.current === null) return
    if (elements.preview.current === null) return
    if (elements.cropper.current === null) return

    const utils = EditorUtils(input.image.dimensions, elements.preview.current, elements.cropper.current)
    const position = utils.relativeToPreview(event)

    const calculator = PreviewCalculator(input.image.dimensions, preview.values.current)
    const result = calculator.zoomAt(position, (event.deltaY < 0) ? 0.1 : -0.1)

    preview.setValues(result)

  }

  // RENDER
  return <div className={useClasses(css.EditorPreview, props.className)}
    ref={elements.preview}
    onMouseDown={mouseDownHandler}
    onWheel={onEditorWheel}
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
