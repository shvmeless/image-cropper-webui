// IMPORTS
import { type ReactNode, useContext } from 'react'
import { useClasses } from '@hooks/common/useClasses'
import { EditorCropperContext } from '@contexts/editor/EditorCropperContext'
import { ImageInputContext } from '@contexts/common/ImageInputContext'
import { BasicIcon } from '@ui/BasicIcon/BasicIcon'
import { ImageReader } from '@lib/common/ImageReader'
import css from './EditorDownloadTool.module.scss'

// PROPS
interface EditorDownloadToolProps {
  className?: string
}

// COMPONENT
export function EditorDownloadTool (props: EditorDownloadToolProps): ReactNode {

  // CONTEXT
  const input = useContext(ImageInputContext)
  const cropper = useContext(EditorCropperContext)

  // HANDLER
  const formatChangeHandler = (): void => {
    (async (): Promise<void> => {

      if (input.image === null) return
      if (cropper.values.current === null) return

      const type = input.image.blob.type
      const format = (type === 'image/png' || type === 'image/jpeg' || type === 'image/webp') ? type : 'image/png'

      const img = await ImageReader.blobToImage(input.image.blob)
      const canvas = await ImageReader.cropImage(img, cropper.values.current)
      const blob = await ImageReader.canvasToBlob(canvas, format)

      const link = document.createElement('a')
      const extension = format.replace('image/', '')

      link.href = URL.createObjectURL(blob)
      link.download = input.image.name.replace(/(\S+)\.(\S+)$/, `$1.${extension}`)
      link.click()

    })().catch(console.error)
  }

  // RENDER
  return <button className={useClasses(css.EditorDownloadTool, props.className)}
    type='button'
    onClick={formatChangeHandler}
  >
    <BasicIcon icon='download' size='small'/>
  </button>

}
