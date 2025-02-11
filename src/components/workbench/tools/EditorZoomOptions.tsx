// IMPORTS
import { useContext, useEffect, useState, type ReactNode } from 'react'
import { PreviewCalculator } from '@lib/editor/PreviewCalculator'
import type { Dimensions } from '@lib/common/types'
import { useClasses } from '@hooks/common/useClasses'
import { EditorPreviewContext } from '@contexts/editor/EditorPreviewContext'
import { EditorImageInputContext } from '@contexts/editor/EditorImageInputContext'
import { BasicIconButton } from '@ui/buttons/BasicIconButton'
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

  // FUNCTION
  const changeZoom = (zoom: 'IN' | 'OUT'): void => {

    if (input.image === null) return
    if (preview.values.current === null) return

    const calculator = PreviewCalculator(input.image.dimensions, preview.values.current)
    const result = calculator.zoom((zoom === 'IN') ? 0.1 : -0.1)

    preview.setValues(result)

  }

  // RENDER
  return <>

    <BasicIconButton className={css.button}
      icon='minus'
      onClick={(): void => { changeZoom('OUT') }}
      disabled={input.image === null}
    />

    <input className={useClasses(css.value, (input.image === null) && css.disabled)}
      value={`${Math.round(value)}%`}
      disabled={input.image === null}
      readOnly
    />

    <BasicIconButton className={css.button}
      icon='plus'
      onClick={(): void => { changeZoom('IN') }}
      disabled={input.image === null}
    />

  </>

}
