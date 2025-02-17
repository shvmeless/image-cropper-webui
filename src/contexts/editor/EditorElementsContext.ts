// IMPORTS
import { createContext, type RefObject, useRef } from 'react'

// TYPE
export interface EditorElementsHook {
  preview: RefObject<HTMLDivElement>
  cropper: RefObject<HTMLDivElement>
}

// HOOK
export function useEditorElements (): EditorElementsHook {

  // PROPERTIES
  const preview = useRef<HTMLDivElement>(null)
  const cropper = useRef<HTMLDivElement>(null)

  // RETURN
  return { preview, cropper }

}

// CONTEXT
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-unsafe-type-assertion -- ignore
export const EditorElementsContext = createContext<EditorElementsHook>({} as EditorElementsHook)
