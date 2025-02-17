// IMPORTS
import { type ReactNode, useContext, useEffect, useState } from 'react'
import type { Dimensions } from '@lib/common/types'
import { EditorImageInputContext } from '@contexts/editor/EditorImageInputContext'
import { EditorToolsContext } from '@contexts/editor/EditorToolsContext'
import { BasicIconButton } from '@ui/buttons/BasicIconButton'
import { AspectRatioButton } from './AspectRatioButton'
import css from './AspectRatioOptions.module.scss'
import { EditorCropperContext } from '@contexts/editor/EditorCropperContext'
import { CropperCalculator } from '@lib/editor/CropperCalculator'

// VALUES
const ASPECT_RATIOS: Array<Dimensions> = [
  { width: 1, height: 1 },
  { width: 5, height: 4 },
  { width: 4, height: 3 },
  { width: 3, height: 2 },
  { width: 16, height: 9 },
  { width: 21, height: 9 },
]

// FUNCTION
function rotate (ratios: Array<Dimensions>): Array<Dimensions> {
  return ratios.map((ratio) => ({ width: ratio.height, height: ratio.width }))
}

// COMPONENT
export function AspectRatioOptions (): ReactNode {

  // CONTEXT
  const input = useContext(EditorImageInputContext)
  const cropper = useContext(EditorCropperContext)
  const tools = useContext(EditorToolsContext)

  // STATE
  const [values, setValues] = useState([...ASPECT_RATIOS])

  // EFFECT
  useEffect(() => {
    tools.setAspectRatio(null)
  }, [input.image])

  // HANDLER
  const rotateHandler = (): void => {
    if (input.image === null) return
    setValues(rotate(values))

    if (tools.aspectRatio === null) return

    const newRatio = {
      width: tools.aspectRatio.height,
      height: tools.aspectRatio.width,
    }

    tools.setAspectRatio(newRatio)

    if (cropper.values.current === null) return
    const { width, height } = cropper.values.current

    const calculator = CropperCalculator(input.image.dimensions, cropper.values.current)
    const result = (width >= height)
      ? calculator.setWidth(width, newRatio)
      : calculator.setHeight(height, newRatio)

    cropper.setValues(result)

  }

  // HANDLER
  const removeHandler = (): void => {
    if (input.image === null) return
    tools.setAspectRatio(null)
  }

  // RENDER
  return <>

    <BasicIconButton className={css.button}
      icon='rotate'
      disabled={input.image === null}
      onClick={rotateHandler}
    />

    {values.map((ratio, index) => (<AspectRatioButton
      className={css.button}
      value={ratio}
      key={index}
    />))}

    {(tools.aspectRatio !== null) && (<BasicIconButton className={css.button}
      icon='close'
      iconSize='small'
      disabled={input.image === null}
      onClick={removeHandler}
    />)}

  </>

}
