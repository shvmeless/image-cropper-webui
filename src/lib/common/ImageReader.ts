// IMPORTS
import type { Dimensions, Position } from './types'

// INTERFACE
export interface InputImage {
  name: string
  dimensions: Dimensions
  blob: Blob
}

// TYPE
export type ImageType = 'image/png' | 'image/jpeg' | 'image/webp'

// MODULE
export const ImageReader = {

  /**
   * Reads a file and returns its contents as an `ArrayBuffer`.
   * @throws An error if the file cannot be read.
   */
  async readFile (file: File): Promise<ArrayBuffer> {
    return await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        if (reader.result instanceof ArrayBuffer) resolve(reader.result)
        else reject(new Error('Failed to read file.'))
      }
      reader.onerror = reject
      reader.readAsArrayBuffer(file)
    })
  },

  /**
   * Loads an image from a URL and waits for it to fully load.
   * @throws An error if the image fails to load.
   */
  async loadImage (image: HTMLImageElement, url: string): Promise<void> {
    await new Promise((resolve, reject) => {
      image.onload = resolve
      image.onerror = reject
      image.src = url
    })
  },

  /**
   * Reads and loads an image from a file, returning its `InputImage` data.
   * @throws An error if the file cannot be read or the image fails to load.
   */
  async readImage (file: File): Promise<InputImage> {

    const buffer = await ImageReader.readFile(file)
    const blob = new Blob([buffer], { type: file.type })
    const url = URL.createObjectURL(blob)

    const img = new Image()
    img.alt = file.name

    await ImageReader.loadImage(img, url)

    return {
      name: file.name,
      blob,
      dimensions: {
        width: img.width,
        height: img.height,
      },
    }

  },

  // FUNCTION
  async blobToImage (blob: Blob): Promise<HTMLImageElement> {
    const url = URL.createObjectURL(blob)
    const img = new Image()
    await this.loadImage(img, url)
    return img
  },

  // FUNCTION
  async canvasToBlob (canvas: HTMLCanvasElement, type: ImageType): Promise<Blob> {
    return await new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob === null) {
          reject(new Error('Failed to get blob'))
          return
        }
        resolve(blob)
      }, type, 1)
    })
  },

  // FUNCTION
  cropImage (img: HTMLImageElement, cropper: Dimensions & Position): HTMLCanvasElement {

    const canvas = document.createElement('canvas')

    const ctx = canvas.getContext('2d')
    if (ctx === null) throw new Error('Failed to get 2D context')

    canvas.width = cropper.width
    canvas.height = cropper.height

    ctx.drawImage(img, cropper.x, cropper.y, cropper.width, cropper.height, 0, 0, cropper.width, cropper.height)

    return canvas

  },

}
