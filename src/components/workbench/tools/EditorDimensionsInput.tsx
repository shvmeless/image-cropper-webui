// IMPORTS
import { useContext, useEffect, useState, type ReactNode } from 'react'
import { CropperCalculator } from '@lib/editor/CropperCalculator'
import type { Dimensions } from '@lib/common/types'
import { useClasses } from '@hooks/common/useClasses'
import { EditorCropperContext } from '@contexts/editor/EditorCropperContext'
import { EditorImageInputContext } from '@contexts/editor/EditorImageInputContext'
import { NumberInput } from '@ui/NumberInput/NumberInput'
import css from './EditorDimensionsInput.module.scss'
import { EditorToolsContext } from '@contexts/editor/EditorToolsContext'

// PROPS
interface EditorDimensionsInputProps {
  className?: string
}

// COMPONENT
export function EditorDimensionsInput (props: EditorDimensionsInputProps): ReactNode {

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

    const calculator = CropperCalculator(input.image.dimensions, cropper.values.current)
    let result = { ...cropper.values.current }

    if (property === 'width') result = calculator.setWidth(value, tools.aspectRatio)
    else result = calculator.setHeight(value, tools.aspectRatio)

    cropper.setValues(result)

  }

  // RENDER
  return <div
    className={useClasses(css.EditorDimensionsInput, props.className, (input.image === null) && css.disabled)}
  >

    <div className={css.item}>
      <div className={css.label}><span>{'W'}</span></div>
      <NumberInput
        className={css.input}
        placeholder=''
        value={values.width}
        onValueChange={(width) => { updateValues({ width }) }}
        onComponentBlur={(width) => { inputChangeHandler('width', width) }}
        disabled={input.image === null}
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
        disabled={input.image === null}
      />
    </div>

  </div>

}
