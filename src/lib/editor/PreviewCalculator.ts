// IMPORTS
import type { Dimensions, Position } from '@lib/common/types'

// CLASS
export class PreviewCalculator {

  // PROPERTIES
  private readonly image: Dimensions
  public readonly preview: Dimensions & Position

  // CONTS
  private readonly MAX_SIZE = 50

  // CONSTRUCTOR
  constructor (image: Dimensions, preview: Dimensions & Position) {
    this.image = { ...image }
    this.preview = { ...preview }
  }

  // METHOD
  public reset (): void {
    this.preview.width = this.image.width
    this.preview.height = this.image.height
    this.preview.x = this.image.width / 2
    this.preview.y = this.image.height / 2
  }

  // METHOD
  public move (vector: Position): void {
    const previous = { ...this.preview }

    this.preview.x = previous.x - vector.x
    this.preview.y = previous.y - vector.y
  }

  // METHOD
  private setZoom (multiplier: number): void {
    const previous = { ...this.preview }

    this.preview.width = this.image.width * multiplier
    if (this.preview.width < this.MAX_SIZE) this.preview.width = this.MAX_SIZE
    this.preview.height = this.image.height * this.preview.width / this.image.width
    this.preview.x = previous.x - ((previous.width - this.preview.width) / 2)
    this.preview.y = previous.y - ((previous.height - this.preview.height) / 2)
  }

  // METHOD
  public zoomIn (percent: number): void {
    const current = this.preview.width / this.image.width
    const multiplier = current + percent
    this.setZoom(multiplier)
  }

  // METHOD
  public zoomOut (percent: number): void {
    const current = this.preview.width / this.image.width
    const multiplier = current - percent
    this.setZoom(multiplier)
  }

  // METHOD
  private setZoomAt (target: Position, multiplier: number): void {
    const previous = { ...this.preview }

    this.preview.width = this.image.width * multiplier
    if (this.preview.width < this.MAX_SIZE) this.preview.width = this.MAX_SIZE
    this.preview.height = this.image.height * this.preview.width / this.image.width

    const pos2 = {
      x: target.x * this.preview.width / previous.width,
      y: target.y * this.preview.height / previous.height,
    }

    this.preview.x = previous.x - (target.x - pos2.x)
    this.preview.y = previous.y - (target.y - pos2.y)
  }

  // METHOD
  public zoomInAt (target: Position, percent: number): void {
    const current = this.preview.width / this.image.width
    const multiplier = current + percent
    this.setZoomAt(target, multiplier)
  }

  // METHOD
  public zoomOutAt (target: Position, percent: number): void {
    const current = this.preview.width / this.image.width
    const multiplier = current - percent
    this.setZoomAt(target, multiplier)
  }

}
