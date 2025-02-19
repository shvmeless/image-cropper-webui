// IMPORTS
import type { ReactNode } from 'react'
import { Parser } from 'expr-eval'
import { useClasses } from '@hooks/common/useClasses'
import css from './NumberInput.module.scss'

// PROPS
interface NumberInputProps {
  value: string
  onValueChange: (value: string) => void
  onComponentBlur?: (value: number) => void
  className?: string
  placeholder?: string
  disabled?: boolean
}

// COMPONENT
export function NumberInput (props: NumberInputProps): ReactNode {

  // HANDLER
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (props.disabled === true) return
    props.onValueChange(event.target.value)
  }

  // HANDLER
  const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>): void => {
    try {
      if (props.disabled === true) return
      const number = Parser.evaluate(event.target.value)
      props.onComponentBlur?.(number)
    }
    catch (error) {
      props.onComponentBlur?.(NaN)
    }

  }

  // RENDER
  return <input type='text'
    className={useClasses(css.NumberInput, props.className)}
    placeholder={props.placeholder}
    value={props.value}
    disabled={props.disabled}
    onChange={onChangeHandler}
    onBlur={onBlurHandler}
  />

}
