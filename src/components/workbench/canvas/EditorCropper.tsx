// IMPORTS
import { useContext, useEffect, type ReactNode } from 'react'
import { CropperCalculator } from '@lib/editor/CropperCalculator'
import type { Dimensions, Position } from '@lib/common/types'
import { useClasses } from '@hooks/common/useClasses'
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

  // RENDER
  return <div className={useClasses(css.EditorCropper, props.className)}
    ref={references.cropper}
  >
    {/*  */}
  </div>

}
