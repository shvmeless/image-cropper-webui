// IMPORTS
import type { ReactNode } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import css from './NumberInput.module.scss'

// PROPS
interface NumberInputProps {
  value: number
  onValueChange: (value: number) => void
  onComponentBlur?: (value: number) => void
  placeholder?: string
  className?: string
}

// COMPONENT
export function NumberInput (props: NumberInputProps): ReactNode {

  // HANDLER
  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
    props.onValueChange(parseInt(event.target.value))
  }

  // HANDLER
  const onBlurHandler = (event: React.FocusEvent<HTMLInputElement>): void => {
    props.onComponentBlur?.(parseInt(event.target.value))
  }

  // RENDER
  return <input type='number'
    className={useClasses(css.NumberInput, props.className)}
    placeholder={props.placeholder}
    value={props.value}
    onChange={onChangeHandler}
    onBlur={onBlurHandler}
  />

}
