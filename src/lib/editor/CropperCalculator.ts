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

  }
}
