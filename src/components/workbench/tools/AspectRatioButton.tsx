// IMPORTS
import { type ReactNode, useContext } from 'react'
import { CropperCalculator } from '@lib/editor/CropperCalculator'
import type { Dimensions } from '@lib/common/types'
import { EditorImageInputContext } from '@contexts/editor/EditorImageInputContext'
import { EditorCropperContext } from '@contexts/editor/EditorCropperContext'
import { AspectRatioContext } from '@contexts/editor/AspectRatioContext'
import { BasicButton } from '@ui/buttons/BasicButton'

// PROPS
interface AspectRatioButtonProps {
  value: Dimensions
  className?: string
}

// COMPONENT
export function AspectRatioButton (props: AspectRatioButtonProps): ReactNode {

  // CONTEXT
  const input = useContext(EditorImageInputContext)
  const ratio = useContext(AspectRatioContext)
  const cropper = useContext(EditorCropperContext)

  // HANDLER
  const clickHandler = (): void => {
    if (input.image === null) return

    ratio.setValues(props.value)

    if (cropper.values.current === null) return
    const { width, height } = cropper.values.current

    const calculator = CropperCalculator(input.image.dimensions, cropper.values.current)
    const result = (width >= height)
      ? calculator.setWidth(width, props.value)
      : calculator.setHeight(height, props.value)

    cropper.setValues(result)

  }

  // RENDER
  return <BasicButton className={props.className}
    onClick={clickHandler}
    disabled={input.image === null}
    active={(ratio.values !== null && (props.value.width / props.value.height) === (ratio.values.width / ratio.values.height))}
  >
    <span>{props.value.width}{':'}{props.value.height}</span>
  </BasicButton>

}
