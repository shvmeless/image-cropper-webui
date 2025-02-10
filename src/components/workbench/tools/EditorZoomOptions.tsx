// IMPORTS
import { useContext, useEffect, useState, type ReactNode } from 'react'
import { PreviewCalculator } from '@lib/editor/PreviewCalculator'
import type { Dimensions } from '@lib/common/types'
import { useClasses } from '@hooks/common/useClasses'
import { EditorPreviewContext } from '@contexts/editor/EditorPreviewContext'
import { EditorImageInputContext } from '@contexts/editor/EditorImageInputContext'
import { BasicIcon } from '@ui/BasicIcon/BasicIcon'
import css from './EditorZoomOptions.module.scss'

// PROPS
interface EditorZoomOptionsProps {
  className?: string
}

// COMPONENT
export function EditorZoomOptions (props: EditorZoomOptionsProps): ReactNode {

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
  return <div
    className={useClasses(css.EditorZoomOptions, props.className, (input.image === null) && css.disabled)}
  >

    <button className={css.button}
      type='button'
      onClick={(): void => { changeZoom('OUT') }}
      disabled={input.image === null}
    >
      <BasicIcon icon='minus'/>
    </button>

    <div className={css.value}>
      <span>{Math.round(value)}{'%'}</span>
    </div>

    <button className={css.button}
      type='button'
      onClick={(): void => { changeZoom('IN') }}
      disabled={input.image === null}
    >
      <BasicIcon icon='plus'/>
    </button>

  </div>

}
