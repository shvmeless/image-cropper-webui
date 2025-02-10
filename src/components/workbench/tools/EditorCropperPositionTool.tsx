// IMPORTS
import { useContext, useEffect, useState, type ReactNode } from 'react'
import { CropperCalculator } from '@lib/editor/CropperCalculator'
import type { Position } from '@lib/common/types'
import { useClasses } from '@hooks/common/useClasses'
import { EditorCropperContext } from '@contexts/editor/EditorCropperContext'
import { ImageInputContext } from '@contexts/common/ImageInputContext'
import { NumberInput } from '@ui/NumberInput/NumberInput'
import css from './EditorCropperPositionTool.module.scss'

// PROPS
interface EditorCropperPositionToolProps {
  className?: string
}

// COMPONENT
export function EditorCropperPositionTool (props: EditorCropperPositionToolProps): ReactNode {

  // CONTEXT
  const input = useContext(ImageInputContext)
  const cropper = useContext(EditorCropperContext)

  // RENDER
  if (input.image === null) return null

  // STATE
  const [values, setValues] = useState({
    x: 0,
    y: 0,
  })

  // FUNCTION
  const updateValues = (values: Partial<Position>): void => {
    setValues((prev) => ({ ...prev, ...values }))
  }

  // EFFECT
  useEffect(() => {

    const callback = (values: Position): void => {
      const { x, y } = values
      setValues({ x, y })
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

    if (property === 'x') result = calculator.setX(value)
    else if (property === 'y') result = calculator.setY(value)
    else return

    cropper.setValues(result)

  }

  // RENDER
  return <div className={useClasses(css.EditorCropperPositionTool, props.className)}>

    <div className={css.item}>
      <div className={css.label}><span>{'X'}</span></div>
      <NumberInput
        className={css.input}
        placeholder=''
        value={values.x}
        onValueChange={(x) => { updateValues({ x }) }}
        onComponentBlur={(x) => { inputChangeHandler('x', x) }}
      />
    </div>

    <div className={css.item}>
      <div className={css.label}><span>{'Y'}</span></div>
      <NumberInput
        className={css.input}
        placeholder=''
        value={values.y}
        onValueChange={(y) => { updateValues({ y }) }}
        onComponentBlur={(y) => { inputChangeHandler('y', y) }}
      />
    </div>

  </div>

}
