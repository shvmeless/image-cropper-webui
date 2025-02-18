// IMPORTS
import { type ReactNode, type MouseEvent, useContext, useEffect } from 'react'
import { type CropperCorner, type CropperSide, CropperCalculator } from '@lib/editor/CropperCalculator'
import type { Dimensions, Position } from '@lib/common/types'
import { EditorUtils } from '@lib/editor/EditorUtils'
import { useClasses } from '@hooks/common/useClasses'
import { useDragging } from '@hooks/useDragging'
import { EditorImageInputContext } from '@contexts/editor/EditorImageInputContext'
import { EditorElementsContext } from '@contexts/editor/EditorElementsContext'
import { EditorCropperContext } from '@contexts/editor/EditorCropperContext'
import { EditorToolsContext } from '@contexts/editor/EditorToolsContext'
import css from './EditorCropper.module.scss'

// PROPS
interface EditorCropperProps {
  className?: string
}

// COMPONENT
export function EditorCropper (props: EditorCropperProps): ReactNode {

  // CONTEXTS
  const input = useContext(EditorImageInputContext)
  const elements = useContext(EditorElementsContext)
  const cropper = useContext(EditorCropperContext)
  const tools = useContext(EditorToolsContext)

  // RENDER
  if (input.image === null) return null

  // STATE
  const dragging = useDragging()

  // EFFECT
  useEffect(() => {

    const callback = (values: Dimensions & Position): void => {
      if (input.image === null) return
      if (elements.cropper.current === null) return

      elements.cropper.current.style.width = `${values.width / input.image.dimensions.width * 100}%`
      elements.cropper.current.style.height = `${values.height / input.image.dimensions.height * 100}%`
      elements.cropper.current.style.left = `${values.x / input.image.dimensions.width * 100}%`
      elements.cropper.current.style.top = `${values.y / input.image.dimensions.height * 100}%`
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

    const calculator = new CropperCalculator(input.image.dimensions, cropper.values.current)
    calculator.reset()

    cropper.setValues(calculator.cropper)

  }, [input.image])

  // HANDLER
  const cropperClickHandler = (start: MouseEvent<HTMLDivElement>): void => {
    if (start.button !== 0) return
    if (start.shiftKey || start.ctrlKey || start.metaKey || start.altKey) return
    start.stopPropagation()

    if (input.image === null) return
    if (elements.cropper.current === null) return
    if (elements.preview.current === null) return

    const utils = EditorUtils(input.image.dimensions, elements.preview.current, elements.cropper.current)
    let diff = utils.relativeToCropper(start)
    diff = utils.proportionalToImage(diff)
    diff = utils.floor(diff)

    dragging.update((target) => {

      if (input.image === null) return
      if (cropper.values.current === null) return
      if (elements.preview.current === null) return
      if (elements.cropper.current === null) return

      const utils = EditorUtils(input.image.dimensions, elements.preview.current, elements.cropper.current)

      let position = utils.relativeToPreview(target)
      position = utils.proportionalToImage(position)
      position = utils.round(position)

      const calculator = new CropperCalculator(input.image.dimensions, cropper.values.current)
      calculator.setPosition({
        x: position.x - diff.x,
        y: position.y - diff.y,
      })

      cropper.setValues(calculator.cropper)

    })
  }

  // HANDLER
  const cropperSideClickHandler = (event: MouseEvent<HTMLDivElement>, side: CropperSide): void => {
    if (event.button !== 0) return
    if (event.shiftKey || event.ctrlKey || event.metaKey || event.altKey) return
    event.stopPropagation()
    dragging.update((target) => {

      if (input.image === null) return
      if (cropper.values.current === null) return
      if (elements.preview.current === null) return
      if (elements.cropper.current === null) return

      const utils = EditorUtils(input.image.dimensions, elements.preview.current, elements.cropper.current)

      let position = utils.relativeToPreview(target)
      position = utils.proportionalToImage(position)
      position = utils.round(position)

      const calculator = new CropperCalculator(input.image.dimensions, cropper.values.current)
      calculator.setSide(side, position, tools.aspectRatio)

      cropper.setValues(calculator.cropper)

    })
  }

  // HANDLER
  const cropperCornerClickHandler = (event: MouseEvent<HTMLDivElement>, corner: CropperCorner): void => {
    if (event.button !== 0) return
    if (event.shiftKey || event.ctrlKey || event.metaKey || event.altKey) return
    event.stopPropagation()
    dragging.update((target) => {

      if (input.image === null) return
      if (cropper.values.current === null) return
      if (elements.preview.current === null) return
      if (elements.cropper.current === null) return

      const utils = EditorUtils(input.image.dimensions, elements.preview.current, elements.cropper.current)

      let position = utils.relativeToPreview(target)
      position = utils.proportionalToImage(position)
      position = utils.round(position)

      const calculator = new CropperCalculator(input.image.dimensions, cropper.values.current)
      calculator.setCorner(corner, position, tools.aspectRatio)

      cropper.setValues(calculator.cropper)

    })
  }

  // RENDER
  return <div className={useClasses(css.EditorCropper, props.className)}
    ref={elements.cropper}
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
