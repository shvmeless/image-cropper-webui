// IMPORTS
import type { Dimensions, MousePosition, Position } from '@lib/common/types'

// MODULE
export class EditorUtils {

  // PROPERTIES
  private readonly image: Dimensions
  private readonly preview: HTMLDivElement
  private readonly cropper: HTMLDivElement

  // CONSTRUCTOR
  constructor (image: Dimensions, preview: HTMLDivElement, cropper: HTMLDivElement) {
    this.image = { ...image }
    this.preview = preview
    this.cropper = cropper
  }

  // METHOD
  public static floor (position: Position): Position {
    position.x = Math.floor(position.x)
    position.y = Math.floor(position.y)
    return position
  }

  // METHOD
  public static round (position: Position): Position {
    position.x = Math.round(position.x)
    position.y = Math.round(position.y)
    return position
  }

  // METHOD
  public relativeToPreview (position: MousePosition): Position {

    const previewRect = this.preview.getBoundingClientRect()

    const x = (position.clientX - previewRect.left)
    const y = (position.clientY - previewRect.top)

    return { x, y }

  }

  // METHOD
  public relativeToCropper (position: MousePosition): Position {

    const cropperRect = this.cropper.getBoundingClientRect()

    const x = (position.clientX - cropperRect.left)
    const y = (position.clientY - cropperRect.top)

    return { x, y }

  }

  // METHOD
  public proportionalToImage (position: Position): Position {

    const previewRect = this.preview.getBoundingClientRect()

    const x = position.x * this.image.width / previewRect.width
    const y = position.y * this.image.height / previewRect.height

    return { x, y }

  }

}
