// IMPORTS
import type { Dimensions, MousePosition, Position } from '@lib/common/types'

// MODULE
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- ignore
export function EditorClientConverter (image: Dimensions, preview: HTMLDivElement) {
  image = { ...image }
  return {

    // FUNCTION
    clientPositionToPreview (position: MousePosition): Position {

      const rect = preview.getBoundingClientRect()
      const x = (position.clientX - rect.left)
      const y = (position.clientY - rect.top)

      return { x, y }

    },

    // FUNCTION
    relativeToImage (position: MousePosition | Position): Position {

      if ('clientX' in position && 'clientY' in position) {
        position = this.clientPositionToPreview(position)
      }

      const react = preview.getBoundingClientRect()
      const x = Math.round(position.x * image.width / react.width)
      const y = Math.round(position.y * image.height / react.height)

      return { x, y }

    },

  }
}
