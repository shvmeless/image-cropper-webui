// IMPORTS
import { useContext, type ReactNode } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import { ImageInputContext } from '@contexts/common/ImageInputContext'
import { BasicIcon } from '@ui/BasicIcon/BasicIcon'
import css from './EditorCloseTool.module.scss'

// PROPS
interface EditorCloseToolProps {
  className?: string
}

// COMPONENT
export function EditorCloseTool (props: EditorCloseToolProps): ReactNode {

  // CONTEXT
  const input = useContext(ImageInputContext)

  // HANDLER
  const clickHandler = (): void => {
    input.discard()
  }

  // RENDER
  return <button className={useClasses(css.EditorCloseTool, props.className)}
    type='button'
    onClick={clickHandler}
  >
    <BasicIcon icon='close'/>
  </button>

}
