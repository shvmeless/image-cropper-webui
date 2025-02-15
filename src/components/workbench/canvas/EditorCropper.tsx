// IMPORTS
import { type MouseEvent, useContext, useEffect, type ReactNode } from 'react'
import { CropperCalculator } from '@lib/editor/CropperCalculator'
import { EditorConverter } from '@lib/editor/EditorConverter'
import type { Dimensions, Position } from '@lib/common/types'
import { useClasses } from '@hooks/common/useClasses'
import { useDragging } from '@hooks/useDragging'
import { EditorReferencesContext } from '@contexts/editor/EditorReferencesContext'
import { EditorImageInputContext } from '@contexts/editor/EditorImageInputContext'
import { EditorCropperContext } from '@contexts/editor/EditorCropperContext'
import { AspectRatioContext } from '@contexts/editor/AspectRatioContext'
import css from './EditorCropper.module.scss'

// PROPS
interface EditorCropperProps {
  className?: string
}

// COMPONENT
export function EditorCropper (props: EditorCropperProps): ReactNode {

  // CONTEXTS
  const input = useContext(EditorImageInputContext)
  const references = useContext(EditorReferencesContext)
  const cropper = useContext(EditorCropperContext)
  const ratio = useContext(AspectRatioContext)

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
  const cropperClickHandler = (start: MouseEvent<HTMLDivElement>): void => {
    if (start.button !== 0) return
    if (start.shiftKey || start.ctrlKey || start.metaKey || start.altKey) return
    start.stopPropagation()

    if (input.image === null) return
    if (references.cropper.current === null) return
    if (references.preview.current === null) return

    const converter = EditorConverter(input.image.dimensions, references.preview.current, references.cropper.current)
    let diff = converter.relativeToCropper(start)
    diff = converter.proportionalToImage(diff)

    diff.x = Math.floor(diff.x)
    diff.y = Math.floor(diff.y)

    dragging.update((target) => {

      if (input.image === null) return
      if (cropper.values.current === null) return
      if (references.preview.current === null) return
      if (references.cropper.current === null) return

      const converter = EditorConverter(input.image.dimensions, references.preview.current, references.cropper.current)

      let position = converter.relativeToPreview(target)
      position = converter.proportionalToImage(position)
      position.x = Math.floor(position.x)
      position.y = Math.floor(position.y)

      const calculator = CropperCalculator(input.image.dimensions, cropper.values.current)
      const result = calculator.setPosition({
        x: position.x - diff.x,
        y: position.y - diff.y,
      })

      cropper.setValues(result)

    })
  }

  // HANDLER
  const cropperSideClickHandler = (event: MouseEvent<HTMLDivElement>, side: 'top' | 'right' | 'bottom' | 'left'): void => {
    if (event.button !== 0) return
    if (event.shiftKey || event.ctrlKey || event.metaKey || event.altKey) return
    event.stopPropagation()
    dragging.update((target) => {

      if (input.image === null) return
      if (cropper.values.current === null) return
      if (references.preview.current === null) return
      if (references.cropper.current === null) return

      const converter = EditorConverter(input.image.dimensions, references.preview.current, references.cropper.current)

      let position = converter.relativeToPreview(target)
      position = converter.proportionalToImage(position)
      position.x = Math.round(position.x)
      position.y = Math.round(position.y)

      const calculator = CropperCalculator(input.image.dimensions, cropper.values.current)
      let result = { ...cropper.values.current }

      if (side === 'top') result = calculator.moveTopSide(position.y, ratio.values)
      else if (side === 'right') result = calculator.moveRightSide(position.x, ratio.values)
      else if (side === 'bottom') result = calculator.moveBottomSide(position.y, ratio.values)
      else result = calculator.moveLeftSide(position.x, ratio.values)

      cropper.setValues(result)

    })
  }

  // HANDLER
  const cropperCornerClickHandler = (event: MouseEvent<HTMLDivElement>, corner: 'top_left' | 'top_right' | 'bottom_right' | 'bottom_left'): void => {
    if (event.button !== 0) return
    if (event.shiftKey || event.ctrlKey || event.metaKey || event.altKey) return
    event.stopPropagation()
    dragging.update((target) => {

      if (input.image === null) return
      if (cropper.values.current === null) return
      if (references.preview.current === null) return
      if (references.cropper.current === null) return

      const converter = EditorConverter(input.image.dimensions, references.preview.current, references.cropper.current)

      let position = converter.relativeToPreview(target)
      position = converter.proportionalToImage(position)
      position.x = Math.round(position.x)
      position.y = Math.round(position.y)

      const calculator = CropperCalculator(input.image.dimensions, cropper.values.current)
      let result = { ...cropper.values.current }

      if (corner === 'top_right') result = calculator.moveTopRightCorner(position, ratio.values)
      else if (corner === 'bottom_right') result = calculator.moveBottomRightCorner(position, ratio.values)
      else if (corner === 'bottom_left') result = calculator.moveBottomLeftCorner(position, ratio.values)
      else result = calculator.moveTopLeftCorner(position, ratio.values)

      cropper.setValues(result)

    })
  }

  // RENDER
  return <div className={useClasses(css.EditorCropper, props.className)}
    ref={references.cropper}
    onMouseDown={cropperClickHandler}
  >

    <div className={css.top} onMouseDown={(event): void => { cropperSideClickHandler(event, 'top') }}/>
    <div className={css.right} onMouseDown={(event): void => { cropperSideClickHandler(event, 'right') }}/>
    <div className={css.bottom} onMouseDown={(event): void => { cropperSideClickHandler(event, 'bottom') }}/>
    <div className={css.left} onMouseDown={(event): void => { cropperSideClickHandler(event, 'left') }}/>

    <div className={css.topleft} onMouseDown={(event): void => { cropperCornerClickHandler(event, 'top_left') }}/>
    <div className={css.topright} onMouseDown={(event): void => { cropperCornerClickHandler(event, 'top_right') }}/>
    <div className={css.bottomright} onMouseDown={(event): void => { cropperCornerClickHandler(event, 'bottom_right') }}/>
    <div className={css.bottomleft} onMouseDown={(event): void => { cropperCornerClickHandler(event, 'bottom_left') }}/>

  </div>

}
