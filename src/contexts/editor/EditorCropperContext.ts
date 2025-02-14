// IMPORTS
import { createContext, type RefObject, useRef } from 'react'
import type { Dimensions, Position } from '@lib/common/types'
import { type SubscriberCallback, useSubscriber } from '@hooks/common/useSubscriber'

// TYPE
export interface EditorCropperHook {
  values: RefObject<Dimensions & Position>
  setValues: (value: Dimensions & Position) => void
  subscriber: {
    subscribe: (callback: SubscriberCallback<Dimensions & Position>) => void
    unsubscribe: (callback: SubscriberCallback<Dimensions & Position>) => void
  }
}

// HOOK
export function useEditorCropper (): EditorCropperHook {

  // STATE
  const subscriber = useSubscriber<Dimensions & Position>()

  // PROPERTIES
  const values = useRef<Dimensions & Position>({ width: 0, height: 0, x: 0, y: 0 })

  // RETURN
  return {

    // REFERENCES
    get values (): RefObject<Dimensions & Position> {
      return { ...values }
    },

    // METHOD
    setValues: (value: Dimensions & Position): void => {
      values.current.width = value.width
      values.current.height = value.height
      values.current.x = value.x
      values.current.y = value.y
      subscriber.notify(values.current)
    },

    // SUBSCRIBER
    subscriber: {
      subscribe: subscriber.subscribe,
      unsubscribe: subscriber.unsubscribe,
    },

  }

}

// CONTEXT
// eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-unsafe-type-assertion -- ignore
export const EditorCropperContext = createContext<EditorCropperHook>({} as EditorCropperHook)
