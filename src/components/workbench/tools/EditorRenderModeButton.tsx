// IMPORTS
import { useContext, type ReactNode } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import { EditorImageInputContext } from '@contexts/editor/EditorImageInputContext'
import { EditorToolsContext } from '@contexts/editor/EditorToolsContext'
import { BasicIconButton } from '@ui/buttons/BasicIconButton'
import { BasicTooltip } from '@ui/BasicTooltip/BasicTooltip'
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
  return <BasicTooltip
    className={useClasses(css.EditorRenderModeButton, props.className)}
    text='Change Render Mode'
    position='left'
    disabled={input.image === null}
  >
    <BasicIconButton className={css.button}
      label='Render Mode'
      icon={(tools.renderMode === 'default') ? 'renderDefault' : 'renderPixelated'}
      iconSize='small'
      onClick={clickHandler}
      active={(tools.renderMode === 'pixelated')}
      disabled={input.image === null}
    />
  </BasicTooltip>

}
