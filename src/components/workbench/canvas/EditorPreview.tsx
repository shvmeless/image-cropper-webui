// IMPORTS
import { useContext, useEffect, type ReactNode } from 'react'
import { PreviewCalculator } from '@lib/editor/PreviewCalculator'
import type { Dimensions, Position } from '@lib/common/types'
import { useClasses } from '@hooks/common/useClasses'
import { EditorReferencesContext } from '@contexts/editor/EditorReferencesContext'
import { EditorPreviewContext } from '@contexts/editor/EditorPreviewContext'
import { ImageInputContext } from '@contexts/common/ImageInputContext'
import css from './EditorPreview.module.scss'

// PROPS
interface EditorPreviewProps {
  className?: string
}

// COMPONENT
export function EditorPreview (props: EditorPreviewProps): ReactNode {

  // CONTEXT
  const input = useContext(ImageInputContext)
  const references = useContext(EditorReferencesContext)
  const preview = useContext(EditorPreviewContext)

  // RENDER
  if (input.image === null) return null

  // EFFECT
  useEffect(() => {

    const callback = (values: Dimensions & Position): void => {
      if (references.preview.current === null) return
      references.preview.current.style.width = `${values.width}px`
      references.preview.current.style.height = `${values.height}px`
      references.preview.current.style.left = `calc(50% - ${values.x}px)`
      references.preview.current.style.top = `calc(50% - ${values.y}px)`
    }

    preview.subscriber.subscribe(callback)
    return () => {
      preview.subscriber.unsubscribe(callback)
    }

  }, [input.image])

  // EFFECT
  useEffect(() => {

    if (input.image === null) return
    if (preview.values.current === null) return

    const calculator = PreviewCalculator(input.image.dimensions, preview.values.current)
    const result = calculator.reset()

    preview.setValues(result)

  }, [input.image])

  // RENDER
  return <div className={useClasses(css.EditorPreview, props.className)}
    ref={references.preview}
  >
    <img className={css.image}
      alt={input.image.name}
      src={URL.createObjectURL(input.image.blob)}
    />
  </div>

}
