// IMPORTS
import { type Dispatch, type SetStateAction, useState, createContext } from 'react'
import type { Dimensions } from '@lib/common/types'

// TYPE
export interface EditorToolsHook {
  aspectRatio: Dimensions | null
  setAspectRatio: Dispatch<SetStateAction<Dimensions | null>>
  renderMode: 'default' | 'pixelated'
  setRenderMode: Dispatch<SetStateAction<'default' | 'pixelated'>>
}

// HOOK
export function useEditorTools (): EditorToolsHook {

  // STATE
  const [aspectRatio, setAspectRatio] = useState<Dimensions | null>(null)
  const [renderMode, setRenderMode] = useState<'default' | 'pixelated'>('default')

  // RETURN
  return { aspectRatio, setAspectRatio, renderMode, setRenderMode }

}

// CONTEXT
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-unsafe-type-assertion -- ignore
export const EditorToolsContext = createContext<EditorToolsHook>({} as EditorToolsHook)
