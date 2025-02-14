// IMPORTS
import type { Dimensions, MousePosition, Position } from '@lib/common/types'

// MODULE
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- ignore
export function EditorConverter (image: Dimensions, preview: HTMLDivElement, cropper: HTMLDivElement) {
  image = { ...image }
  return {

    // FUNCTION
    relativeToPreview (position: MousePosition): Position {

      const previewRect = preview.getBoundingClientRect()

      const x = (position.clientX - previewRect.left)
      const y = (position.clientY - previewRect.top)

      return { x, y }

    },

    // FUNCTION
    relativeToCropper (position: MousePosition): Position {

      const cropperRect = cropper.getBoundingClientRect()

      const x = (position.clientX - cropperRect.left)
      const y = (position.clientY - cropperRect.top)

      return { x, y }

    },

    // FUNCTION
    proportionalToImage (position: Position): Position {

      const previewRect = preview.getBoundingClientRect()

      const x = position.x * image.width / previewRect.width
      const y = position.y * image.height / previewRect.height

      return { x, y }

    },

  }
}
