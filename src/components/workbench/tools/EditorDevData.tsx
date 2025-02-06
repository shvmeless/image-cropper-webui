// IMPORTS
import { useContext, useEffect, useRef, type ReactNode } from 'react'
import type { Dimensions, Position } from '@lib/common/types'
import { useClasses } from '@hooks/common/useClasses'
import { EditorPreviewContext } from '@contexts/editor/EditorPreviewContext'
import { ImageInputContext } from '@contexts/common/ImageInputContext'
import css from './EditorDevData.module.scss'

// PROPS
interface EditorDevDataProps {
  className?: string
}

// COMPONENT
export function EditorDevData (props: EditorDevDataProps): ReactNode {

  // CONTEXT
  const input = useContext(ImageInputContext)
  const preview = useContext(EditorPreviewContext)

  // RENDER
  if (input.image === null) return null

  // REFERENCES
  const previewPositionRef = useRef<HTMLDivElement>(null)
  const previewDimensionsRef = useRef<HTMLDivElement>(null)

  // EFFECT
  useEffect(() => {

    const callback = (values: Dimensions & Position): void => {
      if (previewPositionRef.current === null) return
      previewPositionRef.current.innerHTML = `X ${values.x} Y ${values.y}`
      if (previewDimensionsRef.current === null) return
      previewDimensionsRef.current.innerHTML = `W ${values.width} H ${values.height}`
    }

    preview.subscriber.subscribe(callback)
    return () => {
      preview.subscriber.unsubscribe(callback)
    }

  }, [input.image])

  // RENDER
  return <div className={useClasses(css.EditorDevData, props.className)}>
    <div className={css.label}><span>{'Preview Position'}</span></div>
    <div className={css.value}><span ref={previewPositionRef}/></div>
    <div className={css.label}><span>{'Preview Dimensions'}</span></div>
    <div className={css.value}><span ref={previewDimensionsRef}/></div>
  </div>

}
