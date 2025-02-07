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

    // FUNCTION
    setPosition (vector: Position): Dimensions & Position {

      const previous = { ...preview }

      preview.x = previous.x - vector.x
      preview.y = previous.y - vector.y

      return preview

    },

    // FUNCTION
    zoom (percent: number): Dimensions & Position {

      const previous = { ...preview }

      const multiplier = (previous.width / image.width) + percent

      preview.width = image.width * multiplier
      preview.height = image.height * preview.width / image.width

      preview.x = previous.x - ((previous.width - preview.width) / 2)
      preview.y = previous.y - ((previous.height - preview.height) / 2)

      return preview

    },

    // FUNCTION
    zoomAt (target: Position, percent: number): Dimensions & Position {

      const previous = { ...preview }

      const multiplier = (previous.width / image.width) + percent

      preview.width = image.width * multiplier
      preview.height = image.height * preview.width / image.width

      const pos2 = {
        x: target.x * preview.width / previous.width,
        y: target.y * preview.height / previous.height,
      }

      preview.x = previous.x - (target.x - pos2.x)
      preview.y = previous.y - (target.y - pos2.y)

      return preview

    },

  }
}
