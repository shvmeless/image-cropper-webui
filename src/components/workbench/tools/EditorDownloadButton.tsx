// IMPORTS
import { type ReactNode, useContext } from 'react'
import { ImageReader } from '@lib/common/ImageReader'
import { useClasses } from '@hooks/common/useClasses'
import { EditorImageInputContext } from '@contexts/editor/EditorImageInputContext'
import { EditorCropperContext } from '@contexts/editor/EditorCropperContext'
import { BasicIconButton } from '@ui/buttons/BasicIconButton'
import { BasicTooltip } from '@ui/BasicTooltip/BasicTooltip'
import css from './EditorDownloadButton.module.scss'

// PROPS
interface EditorDownloadButtonProps {
  className?: string
}

// COMPONENT
export function EditorDownloadButton (props: EditorDownloadButtonProps): ReactNode {

  // CONTEXT
  const input = useContext(EditorImageInputContext)
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
  return <BasicTooltip className={useClasses(css.EditorDownloadButton, props.className)}
    text='Crop and download'
    position='left'
  >
    <BasicIconButton
      className={css.button}
      label='Download'
      icon='download'
      iconSize='small'
      onClick={formatChangeHandler}
    />
  </BasicTooltip>

}
