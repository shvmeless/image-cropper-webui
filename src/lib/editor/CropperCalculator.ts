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
    setX (x: number): Dimensions & Position {

      const previous = { ...cropper }

      cropper.x = x

      if (cropper.x < 0) cropper.x = 0
      if (cropper.x > (image.width - previous.width)) cropper.x = image.width - previous.width

      return cropper

    },

    // FUNCTION
    setY (y: number): Dimensions & Position {

      const previous = { ...cropper }

      cropper.y = y

      if (cropper.y < 0) cropper.y = 0
      if ((cropper.y + previous.height) > image.height) cropper.y = image.height - previous.height

      return cropper

    },

    // FUNCTION
    setPosition (position: Position): Dimensions & Position {

      cropper = this.setX(position.x)
      cropper = this.setY(position.y)

      return cropper

    },

    // FUNCTION
    setWidth (width: number, ratio: Dimensions | null): Dimensions & Position {

      const previous = { ...cropper }

      cropper.width = width

      if (cropper.width < 10) cropper.width = 10
      if (cropper.width > image.width) cropper.width = image.width

      cropper.x = previous.x - ((cropper.width - previous.width) / 2)

      if (cropper.x < 0) cropper.x = 0
      if ((cropper.width + cropper.x) > image.width) cropper.x = image.width - cropper.width

      if (ratio === null) return cropper

      cropper.height = cropper.width * ratio.height / ratio.width
      cropper.y = previous.y - ((cropper.height - previous.height) / 2)

      if (cropper.height > image.height) {
        cropper.height = image.height
        cropper.width = cropper.height * ratio.width / ratio.height
        cropper.x = previous.x - ((cropper.width - previous.width) / 2)
      }

      if (cropper.y < 0) cropper.y = 0
      if ((cropper.y + cropper.height) > image.height) cropper.y = image.height - cropper.height

      return cropper

    },

    // FUNCTION
    setHeight (height: number, ratio: Dimensions | null): Dimensions & Position {

      const previous = { ...cropper }

      cropper.height = height

      if (cropper.height < 10) cropper.height = 10
      if (cropper.height > image.height) cropper.height = image.height

      cropper.y = previous.y - ((cropper.height - previous.height) / 2)

      if (cropper.y < 0) cropper.y = 0
      if ((cropper.height + cropper.y) > image.height) cropper.y = image.height - cropper.height

      if (ratio === null) return cropper

      cropper.width = cropper.height * ratio.width / ratio.height
      cropper.x = previous.x - ((cropper.width - previous.width) / 2)

      if (cropper.width > image.width) {
        cropper.width = image.width
        cropper.height = cropper.width * ratio.height / ratio.width
        cropper.y = previous.y - ((cropper.height - previous.height) / 2)
      }

      if (cropper.x < 0) cropper.x = 0
      if ((cropper.x + cropper.width) > image.width) cropper.x = image.width - cropper.width

      return cropper

    },

    // FUNCTION
    moveTopSide (y: number, ratio: Dimensions | null): Dimensions & Position {

      const previous = { ...cropper }

      if (y < 0) y = 0
      if (y > previous.y + previous.height - 10) y = previous.y + previous.height - 10

      cropper.y = y
      cropper.height = previous.y + previous.height - cropper.y

      if (ratio === null) return cropper

      if ((cropper.y + cropper.height) > image.height) cropper.height = image.height - cropper.y
      cropper.width = cropper.height * ratio.width / ratio.height
      cropper.x = previous.x - ((cropper.width - previous.width) / 2)

      if (cropper.x < 0) {
        cropper.width = cropper.width + (cropper.x * 2)
        cropper.x = 0
        cropper.height = cropper.width * ratio.height / ratio.width
        cropper.y = previous.y + previous.height - cropper.height
      }

      if ((cropper.x + cropper.width) > image.width) {
        cropper.width = cropper.width - ((cropper.x + cropper.width - image.width) * 2)
        cropper.x = image.width - cropper.width
        cropper.height = cropper.width * ratio.height / ratio.width
        cropper.y = previous.y + previous.height - cropper.height
      }

      return cropper

    },

    // FUNCTION
    moveRightSide (x: number, ratio: Dimensions | null): Dimensions & Position {

      const previous = { ...cropper }

      if (x < (previous.x + 10)) x = previous.x + 10
      if (x > (image.width)) x = image.width

      cropper.width = x - previous.x

      if (ratio === null) return cropper

      if ((cropper.x + cropper.width) > image.width) cropper.width = image.width - cropper.x
      cropper.height = cropper.width * ratio.height / ratio.width
      cropper.y = previous.y + ((previous.height - cropper.height) / 2)

      if (cropper.y < 0) {
        cropper.height = cropper.height + (cropper.y * 2)
        cropper.y = 0
        cropper.width = cropper.height * ratio.width / ratio.height
      }

      if ((cropper.y + cropper.height) > image.height) {
        cropper.height = cropper.height - ((cropper.y + cropper.height - image.height) * 2)
        cropper.y = image.height - cropper.height
        cropper.width = cropper.height * ratio.width / ratio.height
      }

      return cropper

    },

    // FUNCTION
    moveBottomSide (y: number, ratio: Dimensions | null): Dimensions & Position {

      const previous = { ...cropper }

      if (y < (previous.y + 10)) y = previous.y + 10
      if (y > image.height) y = image.height

      cropper.height = y - previous.y

      if (ratio === null) return cropper

      cropper.width = cropper.height * ratio.width / ratio.height
      cropper.x = previous.x - ((cropper.width - previous.width) / 2)

      if (cropper.x < 0) {
        cropper.width = cropper.width + (cropper.x * 2)
        cropper.x = 0
        cropper.height = cropper.width * ratio.height / ratio.width
      }

      if ((cropper.x + cropper.width) > image.width) {
        cropper.width = cropper.width - ((cropper.x + cropper.width - image.width) * 2)
        cropper.x = image.width - cropper.width
        cropper.height = cropper.width * ratio.height / ratio.width
      }

      return cropper

    },

    // FUNCTION
    moveLeftSide (x: number, ratio: Dimensions | null): Dimensions & Position {

      const previous = { ...cropper }

      if (x < 0) x = 0
      if (x > (previous.x + previous.width - 10)) x = previous.x + previous.width - 10

      cropper.x = x
      cropper.width = previous.width - (x - previous.x)

      if (ratio === null) return cropper

      cropper.height = cropper.width * ratio.height / ratio.width
      cropper.y = previous.y + ((previous.height - cropper.height) / 2)

      if (cropper.y < 0) {
        cropper.height = cropper.height + (cropper.y * 2)
        cropper.y = 0
        cropper.width = cropper.height * ratio.width / ratio.height
        cropper.x = (previous.x + previous.width) - cropper.width
      }

      if ((cropper.y + cropper.height) > image.height) {
        cropper.height = cropper.height - ((cropper.y + cropper.height - image.height) * 2)
        cropper.y = image.height - cropper.height
        cropper.width = cropper.height * ratio.width / ratio.height
        cropper.x = (previous.x + previous.width) - cropper.width
      }

      return cropper

    },

    // FUNCTION
    moveTopRightCorner (position: Position, ratio: Dimensions | null): Dimensions & Position {

      const previous = { ...cropper }

      if (position.x < (previous.x + 10)) position.x = previous.x + 10
      if (position.x > (image.width)) position.x = image.width
      if (position.y < 0) position.y = 0
      if (position.y > (previous.y + previous.height - 10)) position.y = previous.y + previous.height - 10

      if (ratio === null) {
        cropper.y = position.y
        cropper.height = previous.y + previous.height - position.y
        cropper.width = position.x - previous.x
        return cropper
      }

      cropper.y = position.y
      cropper.height = previous.y + previous.height - position.y
      cropper.width = cropper.height * ratio.width / ratio.height

      if ((cropper.x + cropper.width) <= image.width) return cropper

      cropper = { ...previous }

      cropper.width = image.width - cropper.x
      cropper.height = cropper.width * ratio.height / ratio.width
      cropper.y = previous.y - (cropper.height - previous.height)

      return cropper

    },

    // FUNCTION
    moveBottomRightCorner (position: Position, ratio: Dimensions | null): Dimensions & Position {

      const previous = { ...cropper }

      if (position.y < (previous.y + 10)) position.y = previous.y + 10
      if (position.y > image.height) position.y = image.height
      if (position.x < (previous.x + 10)) position.x = previous.x + 10
      if (position.x > (image.width)) position.x = image.width

      if (ratio === null) {
        cropper.height = position.y - previous.y
        cropper.width = position.x - previous.x
        return cropper
      }

      cropper.height = position.y - previous.y
      cropper.width = cropper.height * ratio.width / ratio.height

      if ((cropper.x + cropper.width) <= image.width) return cropper

      cropper = { ...previous }

      cropper.width = image.width - cropper.x
      cropper.height = cropper.width * ratio.height / ratio.width

      return cropper

    },

    // FUNCTION
    moveBottomLeftCorner (position: Position, ratio: Dimensions | null): Dimensions & Position {

      const previous = { ...cropper }

      if (position.y < (previous.y + 10)) position.y = previous.y + 10
      if (position.y > image.height) position.y = image.height
      if (position.x < 0) position.x = 0
      if (position.x > (previous.x + previous.width - 10)) position.x = previous.x + previous.width - 10

      if (ratio === null) {
        cropper.height = position.y - previous.y
        cropper.x = position.x
        cropper.width = previous.width - (position.x - previous.x)
        return cropper
      }

      cropper.height = position.y - previous.y
      cropper.width = cropper.height * ratio.width / ratio.height
      cropper.x = previous.x - (cropper.width - previous.width)

      if (cropper.x >= 0) return cropper

      cropper = { ...previous }

      cropper.width = previous.x + previous.width
      cropper.x = 0
      cropper.height = cropper.width * ratio.height / ratio.width

      return cropper

    },

    // FUNCTION
    moveTopLeftCorner (position: Position, ratio: Dimensions | null): Dimensions & Position {

      const previous = { ...cropper }

      if (position.y < 0) position.y = 0
      if (position.y > (previous.y + previous.height - 10)) position.y = previous.y + previous.height - 10
      if (position.x < 0) position.x = 0
      if (position.x > (previous.x + previous.width - 10)) position.x = previous.x + previous.width - 10

      if (ratio === null) {
        cropper.y = position.y
        cropper.height = previous.y + previous.height - position.y
        cropper.x = position.x
        cropper.width = previous.width - (position.x - previous.x)
        return cropper
      }

      cropper.y = position.y
      cropper.height = previous.y + previous.height - position.y
      cropper.width = cropper.height * ratio.width / ratio.height
      cropper.x = previous.x - (cropper.width - previous.width)

      if (cropper.x >= 0) return cropper

      cropper = { ...previous }

      cropper.x = 0
      cropper.width = previous.x + previous.width
      cropper.height = cropper.width * ratio.height / ratio.width
      cropper.y = previous.y - (cropper.height - previous.height)

      return cropper

    },

  }
}
