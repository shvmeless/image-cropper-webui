// IMPORTS
import { useContext, type ReactNode } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import { EditorImageInputContext } from '@contexts/editor/EditorImageInputContext'
import { BasicIcon } from '@ui/BasicIcon/BasicIcon'
import css from './EditorCloseButton.module.scss'

// PROPS
interface EditorCloseButtonProps {
  className?: string
}

// COMPONENT
export function EditorCloseButton (props: EditorCloseButtonProps): ReactNode {

  // CONTEXT
  const input = useContext(EditorImageInputContext)

  // HANDLER
  const clickHandler = (): void => {
    input.discard()
  }

  // RENDER
  return <button className={useClasses(css.EditorCloseButton, props.className)}
    type='button'
    onClick={clickHandler}
  >
    <BasicIcon icon='close'/>
  </button>

}
