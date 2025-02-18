// IMPORTS
import { type ChangeEvent, type ReactNode, useRef } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import { BasicIcon } from '@ui/BasicIcon/BasicIcon'
import css from './EditorImageInput.module.scss'

// PROPS
interface EditorImageInputProps {
  onChange?: (file: File) => void
  className?: string
}

// COMPONENT
export function EditorImageInput (props: EditorImageInputProps): ReactNode {

  // REFERENCES
  const element = useRef<HTMLDivElement>(null)

  // HANDLER
  const draggingHandler = (): void => {
    if (element.current === null) return
    element.current.classList.add(css.dragging)
  }

  // HANDLER
  const stopDraggingHandler = (): void => {
    if (element.current === null) return
    element.current.classList.remove(css.dragging)
  }

  // HANDLER
  const changeHandler = (event: ChangeEvent<HTMLInputElement>): void => {

    if (event.target.files === null) return
    const file = event.target.files.item(0)
    if (file === null) return

    props.onChange?.(file)

  }

  // RENDER
  return <div ref={element}
    className={useClasses(css.EditorImageInput, props.className)}
    onDragOver={draggingHandler}
    onDragLeave={stopDraggingHandler}
    onDrop={stopDraggingHandler}
  >

    <BasicIcon icon='imageUp' size='large' className={css.icon}/>

    <div className={css.text}>
      <p className={css.title}>{'Drag and drop an image here'}</p>
      <p className={css.subtitle}>{'or click to browse in your device'}</p>
    </div>

    <input className={css.input} type='file' onChange={changeHandler} aria-label='Image Input'/>

  </div>

}
