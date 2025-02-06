// IMPORTS
import { useContext, type ReactNode } from 'react'
import { useClasses } from '@hooks/common/useClasses'
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

  // RENDER
  if (input.image === null) return null

  // RENDER
  return <div className={useClasses(css.EditorPreview, props.className)}>
    <img className={css.image}
      alt={input.image.name}
      src={URL.createObjectURL(input.image.blob)}
    />
  </div>

}
