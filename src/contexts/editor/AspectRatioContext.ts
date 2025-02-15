// IMPORTS
import { type Dispatch, type SetStateAction, useState, createContext } from 'react'
import type { Dimensions } from '@lib/common/types'

// TYPE
export interface AspectRatioHook {
  values: Dimensions | null
  setValues: Dispatch<SetStateAction<Dimensions | null>>
}

// HOOK
export function useAspectRatio (): AspectRatioHook {

  // STATE
  const [values, setValues] = useState<Dimensions | null>(null)

  // RETURN
  return { values, setValues }

}

// CONTEXT
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-unsafe-type-assertion -- ignore
export const AspectRatioContext = createContext<AspectRatioHook>({} as AspectRatioHook)
