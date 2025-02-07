// IMPORTS
import { type MouseEvent, useContext, useEffect, type ReactNode } from 'react'
import { EditorClientConverter } from '@lib/editor/ClientConverter'
import { CropperCalculator } from '@lib/editor/CropperCalculator'
import type { Dimensions, Position } from '@lib/common/types'
import { useClasses } from '@hooks/common/useClasses'
import { useDragging } from '@hooks/useDragging'
import { EditorReferencesContext } from '@contexts/editor/EditorReferencesContext'
import { EditorCropperContext } from '@contexts/editor/EditorCropperContext'
import { ImageInputContext } from '@contexts/common/ImageInputContext'
import css from './EditorCropper.module.scss'

// PROPS
interface EditorCropperProps {
  className?: string
}

// COMPONENT
export function EditorCropper (props: EditorCropperProps): ReactNode {

  // CONTEXTS
  const input = useContext(ImageInputContext)
  const references = useContext(EditorReferencesContext)
  const cropper = useContext(EditorCropperContext)

  // RENDER
  if (input.image === null) return null

  // STATE
  const dragging = useDragging()

  // EFFECT
  useEffect(() => {

    const callback = (values: Dimensions & Position): void => {
      if (input.image === null) return
      if (references.cropper.current === null) return

      references.cropper.current.style.width = `${values.width / input.image.dimensions.width * 100}%`
      references.cropper.current.style.height = `${values.height / input.image.dimensions.height * 100}%`
      references.cropper.current.style.left = `${values.x / input.image.dimensions.width * 100}%`
      references.cropper.current.style.top = `${values.y / input.image.dimensions.height * 100}%`
    }

    cropper.subscriber.subscribe(callback)
    return () => {
      cropper.subscriber.unsubscribe(callback)
    }

  }, [input.image])

  // EFFECT
  useEffect(() => {

    if (input.image === null) return
    if (cropper.values.current === null) return

    const calculator = CropperCalculator(input.image.dimensions, cropper.values.current)
    const result = calculator.reset()

    cropper.setValues(result)

  }, [input.image])

  // HANDLER
  const cropperSideClickHandler = (event: MouseEvent<HTMLDivElement>, side: 'top' | 'right' | 'bottom' | 'left'): void => {
    if (event.button !== 0) return
    if (event.shiftKey || event.ctrlKey || event.metaKey || event.altKey) return
    event.stopPropagation()
    dragging.update((target) => {

      if (input.image === null) return
      if (cropper.values.current === null) return
      if (references.preview.current === null) return

      const calculator = CropperCalculator(input.image.dimensions, cropper.values.current)
      const converter = EditorClientConverter(input.image.dimensions, references.preview.current)

      const position = converter.relativeToImage(target)
      let result = { ...cropper.values.current }

      if (side === 'top') result = calculator.moveTopSide(position.y)
      else if (side === 'right') result = calculator.moveRightSide(position.x)
      else if (side === 'bottom') result = calculator.moveBottomSide(position.y)
      else result = calculator.moveLeftSide(position.x)

      cropper.setValues(result)

    })
  }

  // RENDER
  return <div className={useClasses(css.EditorCropper, props.className)}
    ref={references.cropper}
  >

    <div className={css.top} onMouseDown={(event): void => { cropperSideClickHandler(event, 'top') }}/>
    <div className={css.right} onMouseDown={(event): void => { cropperSideClickHandler(event, 'right') }}/>
    <div className={css.bottom} onMouseDown={(event): void => { cropperSideClickHandler(event, 'bottom') }}/>
    <div className={css.left} onMouseDown={(event): void => { cropperSideClickHandler(event, 'left') }}/>

  </div>

}
