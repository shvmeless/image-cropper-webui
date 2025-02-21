// IMPORTS
import { useContext, useEffect, useState, type ReactNode } from 'react'
import { CropperCalculator } from '@lib/editor/CropperCalculator'
import type { Position } from '@lib/common/types'
import { useClasses } from '@hooks/common/useClasses'
import { EditorCropperContext } from '@contexts/editor/EditorCropperContext'
import { EditorImageInputContext } from '@contexts/editor/EditorImageInputContext'
import { NumberInput } from '@ui/NumberInput/NumberInput'
import css from './EditorPositionInput.module.scss'

// COMPONENT
export function EditorPositionInput (): ReactNode {

  // CONTEXT
  const input = useContext(EditorImageInputContext)
  const cropper = useContext(EditorCropperContext)

  // STATE
  const [values, setValues] = useState({ x: '', y: '' })

  // EFFECT
  useEffect(() => {

    if (input.image === null) {
      setValues({ x: '', y: '' })
      return
    }

    const callback = (values: Position): void => {
      const x = Math.round(values.x)
      const y = Math.round(values.y)
      setValues({
        x: x.toString(),
        y: y.toString(),
      })
    }

    cropper.subscriber.subscribe(callback)
    return () => {
      cropper.subscriber.unsubscribe(callback)
    }

  }, [input.image])

  // FUNCTION
  const updateValues = (values: Partial<{ x: string, y: string }>): void => {
    setValues((prev) => ({ ...prev, ...values }))
  }

  // FUNCTION
  const inputChangeHandler = (property: keyof Position, value: number): void => {

    if (input.image === null) return
    if (cropper.values.current === null) return

    if (isNaN(value)) {
      updateValues({
        x: cropper.values.current.x.toString(),
        y: cropper.values.current.y.toString(),
      })
      return
    }

    value = Math.round(value)

    const calculator = new CropperCalculator(input.image.dimensions, cropper.values.current)
    if (property === 'x') calculator.setX(value)
    else calculator.setY(value)

    cropper.setValues(calculator.cropper)

  }

  // RENDER
  return <>

    <div className={useClasses(css.box, (input.image === null) && css.disabled)}>
      <div className={css.label}><span>{'X'}</span></div>
      <NumberInput
        className={css.input}
        placeholder='0'
        value={values.x}
        onValueChange={(x) => { updateValues({ x }) }}
        onComponentBlur={(x) => { inputChangeHandler('x', x) }}
        disabled={input.image === null}
      />
    </div>

    <div className={useClasses(css.box, (input.image === null) && css.disabled)}>
      <div className={css.label}><span>{'Y'}</span></div>
      <NumberInput
        className={css.input}
        placeholder='0'
        value={values.y}
        onValueChange={(y) => { updateValues({ y }) }}
        onComponentBlur={(y) => { inputChangeHandler('y', y) }}
        disabled={input.image === null}
      />
    </div>

  </>

}
