// IMPORTS
import type { Dimensions, Position } from '@lib/common/types'

// MODULE
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- ignore
export function CropperCalculator (image: Dimensions, cropper: Dimensions & Position) {
  image = { ...image }
  cropper = { ...cropper }
  return {

    // FUNCTION
    reset (): Dimensions & Position {

      cropper.width = image.width
      cropper.height = image.height
      cropper.x = 0
      cropper.y = 0

      return cropper

    },

    // FUNCTION
    moveTopSide (y: number): Dimensions & Position {

      const previous = { ...cropper }

      const min = 0
      const max = previous.y + previous.height - 20

      y = Math.max(min, Math.min(y, max))

      cropper.y = y
      cropper.height = previous.y + previous.height - y

      return cropper

    },

    // FUNCTION
    moveRightSide (x: number): Dimensions & Position {

      const previous = { ...cropper }

      if (x < (previous.x + 20)) x = previous.x + 20
      if (x > (image.width)) x = image.width

      cropper.width = x - previous.x

      return cropper

    },

    // FUNCTION
    moveBottomSide (y: number): Dimensions & Position {

      const previous = { ...cropper }

      if (y < (previous.y + 20)) y = previous.y + 20
      if (y > image.height) y = image.height

      cropper.height = y - previous.y

      return cropper

    },

    // FUNCTION
    moveLeftSide (x: number): Dimensions & Position {

      const previous = { ...cropper }

      if (x < 0) x = 0
      if (x > (previous.x + previous.width - 20)) x = previous.x + previous.width - 20

      cropper.x = x
      cropper.width = previous.width - (x - previous.x)

      return cropper

    },

  }
}
