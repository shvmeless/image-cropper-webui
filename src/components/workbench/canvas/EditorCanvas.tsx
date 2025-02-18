// IMPORTS
import { type MouseEvent, type ReactNode, type WheelEvent, useContext, useEffect, useRef } from 'react'
import { PreviewCalculator } from '@lib/editor/PreviewCalculator'
import { EditorUtils } from '@lib/editor/EditorUtils'
import { useClasses } from '@hooks/common/useClasses'
import { useDragging } from '@hooks/useDragging'
import { EditorImageInputContext } from '@contexts/editor/EditorImageInputContext'
import { EditorElementsContext } from '@contexts/editor/EditorElementsContext'
import { EditorPreviewContext } from '@contexts/editor/EditorPreviewContext'
import { EditorPreview } from './EditorPreview'
import css from './EditorCanvas.module.scss'

// PROPS
interface EditorCanvasProps {
  className?: string
}

// COMPONENT
export function EditorCanvas (props: EditorCanvasProps): ReactNode {

  // CONTEXT
  const input = useContext(EditorImageInputContext)
  const elements = useContext(EditorElementsContext)
  const preview = useContext(EditorPreviewContext)

  // STATE
  const dragging = useDragging()

  // ELEMENTS
  const canvasRef = useRef<HTMLDivElement>(null)

  // EFFECT
  useEffect(() => {

    const keyDownHandler = (event: KeyboardEvent): void => {
      if (!event.altKey) return
      if (canvasRef.current === null) return
      canvasRef.current.style.cursor = 'move'
    }

    const onKeyUpHandler = (): void => {
      if (canvasRef.current === null) return
      canvasRef.current.style.cursor = 'default'
    }

    window.addEventListener('keydown', keyDownHandler)
    window.addEventListener('keyup', onKeyUpHandler)

    return () => {
      window.removeEventListener('keydown', keyDownHandler)
      window.removeEventListener('keyup', onKeyUpHandler)
    }

  }, [])

  // HANDLER
  const mouseDownHandler = (event: MouseEvent<HTMLDivElement>): void => {
    if (!event.altKey) return
    dragging.update((target, previous) => {

      if (input.image === null) return
      if (preview.values.current === null) return

      const calculator = new PreviewCalculator(input.image.dimensions, preview.values.current)
      calculator.move({
        x: target.clientX - (previous ?? event).clientX,
        y: target.clientY - (previous ?? event).clientY,
      })

      preview.setValues(calculator.preview)

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

    const calculator = new PreviewCalculator(input.image.dimensions, preview.values.current)
    if (event.deltaY < 0) calculator.zoomInAt(position, 0.1)
    else calculator.zoomOutAt(position, 0.1)

    preview.setValues(calculator.preview)

  }

  // RENDER
  return <div ref={canvasRef}
    className={useClasses(css.EditorCanvas, props.className)}
    onMouseDown={mouseDownHandler}
    onWheel={onEditorWheel}
  >
    <EditorPreview className={css.preview}/>
  </div>

}
