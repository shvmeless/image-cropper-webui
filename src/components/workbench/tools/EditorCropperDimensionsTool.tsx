// IMPORTS
import { useContext, useEffect, useState, type ReactNode } from 'react'
import { CropperCalculator } from '@lib/editor/CropperCalculator'
import type { Dimensions } from '@lib/common/types'
import { useClasses } from '@hooks/common/useClasses'
import { EditorCropperContext } from '@contexts/editor/EditorCropperContext'
import { ImageInputContext } from '@contexts/common/ImageInputContext'
import { NumberInput } from '@ui/NumberInput/NumberInput'
import css from './EditorCropperDimensionsTool.module.scss'

// PROPS
interface EditorCropperDimensionsToolProps {
  className?: string
}

// COMPONENT
export function EditorCropperDimensionsTool (props: EditorCropperDimensionsToolProps): ReactNode {

  // CONTEXT
  const input = useContext(ImageInputContext)
  const cropper = useContext(EditorCropperContext)

  // RENDER
  if (input.image === null) return null

  // STATE
  const [values, setValues] = useState({
    width: 0,
    height: 0,
  })

  // FUNCTION
  const updateValues = (values: Partial<Dimensions>): void => {
    setValues((prev) => ({ ...prev, ...values }))
  }

  // EFFECT
  useEffect(() => {

    const callback = (values: Dimensions): void => {
      const { width, height } = values
      setValues({ width, height })
    }

    cropper.subscriber.subscribe(callback)
    return () => {
      cropper.subscriber.unsubscribe(callback)
    }

  }, [input.image])

  // FUNCTION
  const inputChangeHandler = (property: string, value: number): void => {

    if (input.image === null) return
    if (cropper.values.current === null) return

    if (isNaN(value)) {
      updateValues(cropper.values.current)
      return
    }

    const calculator = CropperCalculator(input.image.dimensions, cropper.values.current)
    let result = { ...cropper.values.current }

    if (property === 'width') result = calculator.setWidth(value)
    else if (property === 'height') result = calculator.setHeight(value)
    else return

    cropper.setValues(result)

  }

  // RENDER
  return <div className={useClasses(css.EditorCropperDimensionsTool, props.className)}>

    <div className={css.item}>
      <div className={css.label}><span>{'W'}</span></div>
      <NumberInput
        className={css.input}
        placeholder=''
        value={values.width}
        onValueChange={(width) => { updateValues({ width }) }}
        onComponentBlur={(width) => { inputChangeHandler('width', width) }}
      />
    </div>

    <div className={css.item}>
      <div className={css.label}><span>{'H'}</span></div>
      <NumberInput
        className={css.input}
        placeholder=''
        value={values.height}
        onValueChange={(height) => { updateValues({ height }) }}
        onComponentBlur={(height) => { inputChangeHandler('height', height) }}
      />
    </div>

  </div>

}
