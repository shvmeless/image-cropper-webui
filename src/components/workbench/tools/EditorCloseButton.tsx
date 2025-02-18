// IMPORTS
import { useContext, type ReactNode } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import { EditorImageInputContext } from '@contexts/editor/EditorImageInputContext'
import { BasicIconButton } from '@ui/buttons/BasicIconButton'
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
  return <BasicIconButton
    className={useClasses(css.EditorCloseButton, props.className)}
    label='Close Image'
    icon='close'
    iconSize='small'
    onClick={clickHandler}
  />

}
