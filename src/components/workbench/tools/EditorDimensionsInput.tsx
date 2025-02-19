// IMPORTS
import { useContext, useEffect, useState, type ReactNode } from 'react'
import { CropperCalculator } from '@lib/editor/CropperCalculator'
import { useClasses } from '@hooks/common/useClasses'
import type { Dimensions } from '@lib/common/types'
import { EditorImageInputContext } from '@contexts/editor/EditorImageInputContext'
import { EditorCropperContext } from '@contexts/editor/EditorCropperContext'
import { EditorToolsContext } from '@contexts/editor/EditorToolsContext'
import { NumberInput } from '@ui/NumberInput/NumberInput'
import css from './EditorDimensionsInput.module.scss'

// COMPONENT
export function EditorDimensionsInput (): ReactNode {

  // CONTEXT
  const input = useContext(EditorImageInputContext)
  const cropper = useContext(EditorCropperContext)
  const tools = useContext(EditorToolsContext)

  // STATE
  const [values, setValues] = useState({
    width: 0,
    height: 0,
  })

  // EFFECT
  useEffect(() => {

    if (input.image === null) {
      setValues({ width: 0, height: 0 })
      return
    }

    const callback = (values: Dimensions): void => {
      const width = Math.round(values.width)
      const height = Math.round(values.height)
      setValues({ width, height })
    }

    cropper.subscriber.subscribe(callback)
    return () => {
      cropper.subscriber.unsubscribe(callback)
    }

  }, [input.image])

  // FUNCTION
  const updateValues = (values: Partial<Dimensions>): void => {
    setValues((prev) => ({ ...prev, ...values }))
  }

  // FUNCTION
  const inputChangeHandler = (property: keyof Dimensions, value: number): void => {

    if (input.image === null) return
    if (cropper.values.current === null) return

    if (isNaN(value)) {
      updateValues(cropper.values.current)
      return
    }

    value = Math.round(value)

    const calculator = new CropperCalculator(input.image.dimensions, cropper.values.current)
    if (property === 'width') calculator.setWidth(value, tools.aspectRatio)
    else calculator.setHeight(value, tools.aspectRatio)

    cropper.setValues(calculator.cropper)

  }

  // RENDER
  return <>

    <div className={useClasses(css.box, (input.image === null) && css.disabled)}>
      <div className={css.label}><span>{'W'}</span></div>
      <NumberInput
        className={css.input}
        placeholder='0'
        value={values.width}
        onValueChange={(width) => { updateValues({ width }) }}
        onComponentBlur={(width) => { inputChangeHandler('width', width) }}
        disabled={input.image === null}
      />
    </div>

    <div className={useClasses(css.box, (input.image === null) && css.disabled)}>
      <div className={css.label}><span>{'H'}</span></div>
      <NumberInput
        className={css.input}
        placeholder='0'
        value={values.height}
        onValueChange={(height) => { updateValues({ height }) }}
        onComponentBlur={(height) => { inputChangeHandler('height', height) }}
        disabled={input.image === null}
      />
    </div>

  </>

}
