// IMPORTS
import { useState, createContext } from 'react'
import { type InputImage, ImageReader } from '@lib/common/ImageReader'

// INTERFACE
export interface EditorImageInputHook {
  image: InputImage | null
  read: (file: File) => Promise<InputImage | null>
  discard: () => void
}

// HOOK
export function useEditorImageInput (): EditorImageInputHook {

  // STATE
  const [image, setImage] = useState<InputImage | null>(null)

  // FUNCTION
  const read = async (file: File): Promise<InputImage | null> => {
    try {
      const image = await ImageReader.readImage(file)
      setImage(image)
      return image
    }
    catch (error) {
      console.error(error)
      return null
    }
  }

  // FUNCTION
  const discard = (): void => {
    setImage(null)
  }

  // RETURN
  return { image, read, discard }

}

// CONTEXT
export const EditorImageInputContext = createContext<EditorImageInputHook>({
  image: null,
  read: async () => (null),
  discard: () => {},
})
