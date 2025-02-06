// IMPORTS
import { createContext, type RefObject, useRef } from 'react'
import type { Dimensions, Position } from '@lib/common/types'
import { useSubscriber, type SubscriberCallback } from '@hooks/common/useSubscriber'

// TYPE
export interface EditorPreviewHook {
  values: RefObject<Dimensions & Position>
  setValues: (value: Dimensions & Position) => void
  subscriber: {
    subscribe: (callback: SubscriberCallback<Dimensions & Position>) => void
    unsubscribe: (callback: SubscriberCallback<Dimensions & Position>) => void
  }
}

// HOOK
export function useEditorPreview (): EditorPreviewHook {

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
      values.current.width = Math.round(value.width)
      values.current.height = Math.round(value.height)
      values.current.x = Math.round(value.x)
      values.current.y = Math.round(value.y)
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
export const EditorPreviewContext = createContext<EditorPreviewHook>({} as EditorPreviewHook)
