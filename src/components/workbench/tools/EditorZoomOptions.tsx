// IMPORTS
import { useContext, useEffect, useState, type ReactNode } from 'react'
import { PreviewCalculator } from '@lib/editor/PreviewCalculator'
import type { Dimensions } from '@lib/common/types'
import { EditorImageInputContext } from '@contexts/editor/EditorImageInputContext'
import { EditorPreviewContext } from '@contexts/editor/EditorPreviewContext'
import { BasicIconButton } from '@ui/buttons/BasicIconButton'
import { BasicTooltip } from '@ui/BasicTooltip/BasicTooltip'
import { BasicButton } from '@ui/buttons/BasicButton'
import css from './EditorZoomOptions.module.scss'

// COMPONENT
export function EditorZoomOptions (): ReactNode {

  // CONTEXT
  const input = useContext(EditorImageInputContext)
  const preview = useContext(EditorPreviewContext)

  // STATE
  const [value, setValue] = useState(100)

  // EFFECT
  useEffect(() => {

    if (input.image === null) {
      setValue(100)
      return
    }

    const callback = (values: Dimensions): void => {
      if (input.image === null) return
      const percent = values.width * 100 / input.image.dimensions.width
      setValue(percent)
    }

    preview.subscriber.subscribe(callback)
    return () => {
      preview.subscriber.unsubscribe(callback)
    }

  }, [input.image])

  // HANDLER
  const resetZoom = (): void => {

    if (input.image === null) return
    if (preview.values.current === null) return

    const calculator = new PreviewCalculator(input.image.dimensions, preview.values.current)
    calculator.reset()

    preview.setValues(calculator.preview)

  }

  // FUNCTION
  const changeZoom = (zoom: 'IN' | 'OUT'): void => {

    if (input.image === null) return
    if (preview.values.current === null) return

    const calculator = new PreviewCalculator(input.image.dimensions, preview.values.current)
    if (zoom === 'IN') calculator.zoomIn(0.1)
    else calculator.zoomOut(0.1)

    preview.setValues(calculator.preview)

  }

  // RENDER
  return <>

    <BasicTooltip text='Zoom Out' position='top' disabled={input.image === null}>
      <BasicIconButton className={css.button}
        icon='minus'
        label='Zoom Out'
        onClick={(): void => { changeZoom('OUT') }}
        disabled={input.image === null}
      />
    </BasicTooltip>

    <BasicTooltip className={css.tooltip} text='Reset' position='top' disabled={input.image === null}>
      <BasicButton className={css.value}
        onClick={resetZoom}
        disabled={input.image === null}
      >{Math.round(value)}{'%'}
      </BasicButton>
    </BasicTooltip>

    <BasicTooltip text='Zoom In' position='top' disabled={input.image === null}>
      <BasicIconButton className={css.button}
        icon='plus'
        label='Zoom In'
        onClick={(): void => { changeZoom('IN') }}
        disabled={input.image === null}
      />
    </BasicTooltip>

  </>

}
