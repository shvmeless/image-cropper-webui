// IMPORTS
import { type MouseEvent, useContext, useEffect, type ReactNode, type WheelEvent } from 'react'
import { PreviewCalculator } from '@lib/editor/PreviewCalculator'
import type { Dimensions, Position } from '@lib/common/types'
import { EditorConverter } from '@lib/editor/EditorConverter'
import { useClasses } from '@hooks/common/useClasses'
import { useDragging } from '@hooks/useDragging'
import { EditorReferencesContext } from '@contexts/editor/EditorReferencesContext'
import { EditorPreviewContext } from '@contexts/editor/EditorPreviewContext'
import { EditorImageInputContext } from '@contexts/editor/EditorImageInputContext'
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
  const references = useContext(EditorReferencesContext)
  const preview = useContext(EditorPreviewContext)

  // RENDER
  if (input.image === null) return null

  // STATE
  const dragging = useDragging()

  // EFFECT
  useEffect(() => {

    const callback = (values: Dimensions & Position): void => {
      if (references.preview.current === null) return
      references.preview.current.style.width = `${values.width}px`
      references.preview.current.style.height = `${values.height}px`
      references.preview.current.style.left = `calc(50% - ${values.x}px)`
      references.preview.current.style.top = `calc(50% - ${values.y}px)`
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
    if (references.preview.current === null) return
    if (references.cropper.current === null) return

    const converter = EditorConverter(input.image.dimensions, references.preview.current, references.cropper.current)
    const position = converter.relativeToPreview(event)

    const calculator = PreviewCalculator(input.image.dimensions, preview.values.current)
    const result = calculator.zoomAt(position, (event.deltaY < 0) ? 0.1 : -0.1)

    preview.setValues(result)

  }

  // RENDER
  return <div className={useClasses(css.EditorPreview, props.className)}
    ref={references.preview}
    onMouseDown={mouseDownHandler}
    onWheel={onEditorWheel}
  >

    <img className={css.image}
      alt={input.image.name}
      src={URL.createObjectURL(input.image.blob)}
      draggable={false}
    />

    <EditorCropper className={css.cropper}/>

  </div>

}
