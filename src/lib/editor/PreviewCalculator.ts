// IMPORTS
import type { Dimensions, Position } from '@lib/common/types'

// MODULE
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- ignore
export function PreviewCalculator (image: Dimensions, preview: Dimensions & Position) {
  image = { ...image }
  preview = { ...preview }
  return {

    // FUNCTION
    reset (): Dimensions & Position {

      preview.width = image.width
      preview.height = image.height
      preview.x = image.width / 2
      preview.y = image.height / 2

      return preview

    },
  }
}
