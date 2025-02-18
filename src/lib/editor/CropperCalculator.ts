// IMPORTS
import type { Dimensions, Position } from '@lib/common/types'

// TYPES
export type CropperSide = 'top' | 'right' | 'bottom' | 'left'
export type CropperCorner = 'top_right' | 'bottom_right' | 'bottom_left' | 'top_left'

// CLASS
export class CropperCalculator {

  // PROPERTIES
  private readonly image: Dimensions
  public cropper: Dimensions & Position

  // CONSTRUCTOR
  constructor (image: Dimensions, cropper: Dimensions & Position) {
    this.image = { ...image }
    this.cropper = { ...cropper }
  }

  // METHOD
  public reset (): void {
    this.cropper.width = this.image.width
    this.cropper.height = this.image.height
    this.cropper.x = 0
    this.cropper.y = 0
  }

  // METHOD
  public setX (x: number): void {
    const previous = { ...this.cropper }

    this.cropper.x = x

    if (this.cropper.x < 0) this.cropper.x = 0
    if (this.cropper.x > (this.image.width - previous.width)) this.cropper.x = this.image.width - previous.width
  }

  // METHOD
  public setY (y: number): void {
    const previous = { ...this.cropper }

    this.cropper.y = y

    if (this.cropper.y < 0) this.cropper.y = 0
    if ((this.cropper.y + previous.height) > this.image.height) this.cropper.y = this.image.height - previous.height
  }

  // METHOD
  public setPosition (position: Position): void {
    this.setX(position.x)
    this.setY(position.y)
  }

  // METHOD
  public setWidth (width: number, ratio: Dimensions | null): void {

    const previous = { ...this.cropper }

    this.cropper.width = width

    if (this.cropper.width < 1) this.cropper.width = 1
    if (this.cropper.width > this.image.width) this.cropper.width = this.image.width

    this.cropper.x = previous.x - ((this.cropper.width - previous.width) / 2)

    if (this.cropper.x < 0) this.cropper.x = 0
    if ((this.cropper.width + this.cropper.x) > this.image.width) this.cropper.x = this.image.width - this.cropper.width

    if (ratio === null) return

    this.cropper.height = this.cropper.width * ratio.height / ratio.width
    this.cropper.y = previous.y - ((this.cropper.height - previous.height) / 2)

    if (this.cropper.height > this.image.height) {
      this.cropper.height = this.image.height
      this.cropper.width = this.cropper.height * ratio.width / ratio.height
      this.cropper.x = previous.x - ((this.cropper.width - previous.width) / 2)
    }

    if (this.cropper.y < 0) this.cropper.y = 0
    if ((this.cropper.y + this.cropper.height) > this.image.height) this.cropper.y = this.image.height - this.cropper.height

  }

  // METHOD
  public setHeight (height: number, ratio: Dimensions | null): void {

    const previous = { ...this.cropper }

    this.cropper.height = height

    if (this.cropper.height < 1) this.cropper.height = 1
    if (this.cropper.height > this.image.height) this.cropper.height = this.image.height

    this.cropper.y = previous.y - ((this.cropper.height - previous.height) / 2)

    if (this.cropper.y < 0) this.cropper.y = 0
    if ((this.cropper.height + this.cropper.y) > this.image.height) this.cropper.y = this.image.height - this.cropper.height

    if (ratio === null) return

    this.cropper.width = this.cropper.height * ratio.width / ratio.height
    this.cropper.x = previous.x - ((this.cropper.width - previous.width) / 2)

    if (this.cropper.width > this.image.width) {
      this.cropper.width = this.image.width
      this.cropper.height = this.cropper.width * ratio.height / ratio.width
      this.cropper.y = previous.y - ((this.cropper.height - previous.height) / 2)
    }

    if (this.cropper.x < 0) this.cropper.x = 0
    if ((this.cropper.x + this.cropper.width) > this.image.width) this.cropper.x = this.image.width - this.cropper.width

  }

  // METHOD
  private setTopSide (y: number, ratio: Dimensions | null): void {

    const previous = { ...this.cropper }

    if (y < 0) y = 0
    if (y > previous.y + previous.height - 1) y = previous.y + previous.height - 1

    this.cropper.y = y
    this.cropper.height = previous.y + previous.height - this.cropper.y

    if (ratio === null) return

    if ((this.cropper.y + this.cropper.height) > this.image.height) this.cropper.height = this.image.height - this.cropper.y
    this.cropper.width = this.cropper.height * ratio.width / ratio.height
    this.cropper.x = previous.x - ((this.cropper.width - previous.width) / 2)

    if (this.cropper.x < 0) {
      this.cropper.width = this.cropper.width + (this.cropper.x * 2)
      this.cropper.x = 0
      this.cropper.height = this.cropper.width * ratio.height / ratio.width
      this.cropper.y = previous.y + previous.height - this.cropper.height
    }

    if ((this.cropper.x + this.cropper.width) > this.image.width) {
      this.cropper.width = this.cropper.width - ((this.cropper.x + this.cropper.width - this.image.width) * 2)
      this.cropper.x = this.image.width - this.cropper.width
      this.cropper.height = this.cropper.width * ratio.height / ratio.width
      this.cropper.y = previous.y + previous.height - this.cropper.height
    }

  }

  // METHOD
  private setRightSide (x: number, ratio: Dimensions | null): void {

    const previous = { ...this.cropper }

    if (x < (previous.x + 1)) x = previous.x + 1
    if (x > (this.image.width)) x = this.image.width

    this.cropper.width = x - previous.x

    if (ratio === null) return

    if ((this.cropper.x + this.cropper.width) > this.image.width) this.cropper.width = this.image.width - this.cropper.x
    this.cropper.height = this.cropper.width * ratio.height / ratio.width
    this.cropper.y = previous.y + ((previous.height - this.cropper.height) / 2)

    if (this.cropper.y < 0) {
      this.cropper.height = this.cropper.height + (this.cropper.y * 2)
      this.cropper.y = 0
      this.cropper.width = this.cropper.height * ratio.width / ratio.height
    }

    if ((this.cropper.y + this.cropper.height) > this.image.height) {
      this.cropper.height = this.cropper.height - ((this.cropper.y + this.cropper.height - this.image.height) * 2)
      this.cropper.y = this.image.height - this.cropper.height
      this.cropper.width = this.cropper.height * ratio.width / ratio.height
    }

  }

  // METHOD
  private setBottomSide (y: number, ratio: Dimensions | null): void {

    const previous = { ...this.cropper }

    if (y < (previous.y + 1)) y = previous.y + 1
    if (y > this.image.height) y = this.image.height

    this.cropper.height = y - previous.y

    if (ratio === null) return

    this.cropper.width = this.cropper.height * ratio.width / ratio.height
    this.cropper.x = previous.x - ((this.cropper.width - previous.width) / 2)

    if (this.cropper.x < 0) {
      this.cropper.width = this.cropper.width + (this.cropper.x * 2)
      this.cropper.x = 0
      this.cropper.height = this.cropper.width * ratio.height / ratio.width
    }

    if ((this.cropper.x + this.cropper.width) > this.image.width) {
      this.cropper.width = this.cropper.width - ((this.cropper.x + this.cropper.width - this.image.width) * 2)
      this.cropper.x = this.image.width - this.cropper.width
      this.cropper.height = this.cropper.width * ratio.height / ratio.width
    }

  }

  // METHOD
  private setLeftSide (x: number, ratio: Dimensions | null): void {

    const previous = { ...this.cropper }

    if (x < 0) x = 0
    if (x > (previous.x + previous.width - 1)) x = previous.x + previous.width - 1

    this.cropper.x = x
    this.cropper.width = previous.width - (x - previous.x)

    if (ratio === null) return

    this.cropper.height = this.cropper.width * ratio.height / ratio.width
    this.cropper.y = previous.y + ((previous.height - this.cropper.height) / 2)

    if (this.cropper.y < 0) {
      this.cropper.height = this.cropper.height + (this.cropper.y * 2)
      this.cropper.y = 0
      this.cropper.width = this.cropper.height * ratio.width / ratio.height
      this.cropper.x = (previous.x + previous.width) - this.cropper.width
    }

    if ((this.cropper.y + this.cropper.height) > this.image.height) {
      this.cropper.height = this.cropper.height - ((this.cropper.y + this.cropper.height - this.image.height) * 2)
      this.cropper.y = this.image.height - this.cropper.height
      this.cropper.width = this.cropper.height * ratio.width / ratio.height
      this.cropper.x = (previous.x + previous.width) - this.cropper.width
    }

  }

  // METHOD
  public setSide (side: CropperSide, position: Position, ratio: Dimensions | null): void {
    if (side === 'top') this.setTopSide(position.y, ratio)
    else if (side === 'right') this.setRightSide(position.x, ratio)
    else if (side === 'bottom') this.setBottomSide(position.y, ratio)
    else this.setLeftSide(position.x, ratio)
  }

  // METHOD
  private setTopRightCorner (position: Position, ratio: Dimensions | null): void {

    const previous = { ...this.cropper }

    if (position.x < (previous.x + 1)) position.x = previous.x + 1
    if (position.x > (this.image.width)) position.x = this.image.width
    if (position.y < 0) position.y = 0
    if (position.y > (previous.y + previous.height - 1)) position.y = previous.y + previous.height - 1

    if (ratio === null) {
      this.cropper.y = position.y
      this.cropper.height = previous.y + previous.height - position.y
      this.cropper.width = position.x - previous.x
      return
    }

    this.cropper.y = position.y
    this.cropper.height = previous.y + previous.height - position.y
    this.cropper.width = this.cropper.height * ratio.width / ratio.height

    if ((this.cropper.x + this.cropper.width) <= this.image.width) return

    this.cropper = { ...previous }

    this.cropper.width = this.image.width - this.cropper.x
    this.cropper.height = this.cropper.width * ratio.height / ratio.width
    this.cropper.y = previous.y - (this.cropper.height - previous.height)

  }

  // METHOD
  private setBottomRightCorner (position: Position, ratio: Dimensions | null): void {

    const previous = { ...this.cropper }

    if (position.y < (previous.y + 1)) position.y = previous.y + 1
    if (position.y > this.image.height) position.y = this.image.height
    if (position.x < (previous.x + 1)) position.x = previous.x + 1
    if (position.x > (this.image.width)) position.x = this.image.width

    if (ratio === null) {
      this.cropper.height = position.y - previous.y
      this.cropper.width = position.x - previous.x
      return
    }

    this.cropper.height = position.y - previous.y
    this.cropper.width = this.cropper.height * ratio.width / ratio.height

    if ((this.cropper.x + this.cropper.width) <= this.image.width) return

    this.cropper = { ...previous }

    this.cropper.width = this.image.width - this.cropper.x
    this.cropper.height = this.cropper.width * ratio.height / ratio.width

  }

  // METHOD
  private setBottomLeftCorner (position: Position, ratio: Dimensions | null): void {

    const previous = { ...this.cropper }

    if (position.y < (previous.y + 1)) position.y = previous.y + 1
    if (position.y > this.image.height) position.y = this.image.height
    if (position.x < 0) position.x = 0
    if (position.x > (previous.x + previous.width - 1)) position.x = previous.x + previous.width - 1

    if (ratio === null) {
      this.cropper.height = position.y - previous.y
      this.cropper.x = position.x
      this.cropper.width = previous.width - (position.x - previous.x)
      return
    }

    this.cropper.height = position.y - previous.y
    this.cropper.width = this.cropper.height * ratio.width / ratio.height
    this.cropper.x = previous.x - (this.cropper.width - previous.width)

    if (this.cropper.x >= 0) return

    this.cropper = { ...previous }

    this.cropper.width = previous.x + previous.width
    this.cropper.x = 0
    this.cropper.height = this.cropper.width * ratio.height / ratio.width

  }

  // METHOD
  private setTopLeftCorner (position: Position, ratio: Dimensions | null): void {

    const previous = { ...this.cropper }

    if (position.y < 0) position.y = 0
    if (position.y > (previous.y + previous.height - 1)) position.y = previous.y + previous.height - 1
    if (position.x < 0) position.x = 0
    if (position.x > (previous.x + previous.width - 1)) position.x = previous.x + previous.width - 1

    if (ratio === null) {
      this.cropper.y = position.y
      this.cropper.height = previous.y + previous.height - position.y
      this.cropper.x = position.x
      this.cropper.width = previous.width - (position.x - previous.x)
      return
    }

    this.cropper.y = position.y
    this.cropper.height = previous.y + previous.height - position.y
    this.cropper.width = this.cropper.height * ratio.width / ratio.height
    this.cropper.x = previous.x - (this.cropper.width - previous.width)

    if (this.cropper.x >= 0) return

    this.cropper = { ...previous }

    this.cropper.x = 0
    this.cropper.width = previous.x + previous.width
    this.cropper.height = this.cropper.width * ratio.height / ratio.width
    this.cropper.y = previous.y - (this.cropper.height - previous.height)

  }

  // METHOD
  public setCorner (corner: CropperCorner, position: Position, ratio: Dimensions | null): void {
    if (corner === 'top_right') this.setTopRightCorner(position, ratio)
    else if (corner === 'bottom_right') this.setBottomRightCorner(position, ratio)
    else if (corner === 'bottom_left') this.setBottomLeftCorner(position, ratio)
    else this.setTopLeftCorner(position, ratio)
  }

}
