// IMPORTS
import { useContext, type ReactNode } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import { EditorImageInputContext } from '@contexts/editor/EditorImageInputContext'
import { EditorToolsContext } from '@contexts/editor/EditorToolsContext'
import { BasicIconButton } from '@ui/buttons/BasicIconButton'
import css from './EditorRenderModeButton.module.scss'

// PROPS
interface EditorRenderModeButtonProps {
  className?: string
}

// COMPONENT
export function EditorRenderModeButton (props: EditorRenderModeButtonProps): ReactNode {

  // CONTEXT
  const input = useContext(EditorImageInputContext)
  const tools = useContext(EditorToolsContext)

  // HANDLER
  const clickHandler = (): void => {
    if (input.image === null) return
    tools.setRenderMode((tools.renderMode === 'default') ? 'pixelated' : 'default')
  }

  // RENDER
  return <BasicIconButton className={useClasses(css.EditorRenderModeButton, props.className)}
    icon={(tools.renderMode === 'default') ? 'renderDefault' : 'renderPixelated'}
    iconSize='small'
    active={(tools.renderMode === 'pixelated')}
    onClick={clickHandler}
    disabled={input.image === null}
  />

}
