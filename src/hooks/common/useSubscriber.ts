// IMPORTS
import { type RefObject, useRef } from 'react'

// TYPE
export type SubscriberCallback<T> = (params: T) => void

// INTERFACE
export interface SubscriberHook<T> {
  subscribers: RefObject<Set<SubscriberCallback<T>>>
  subscribe: (callback: SubscriberCallback<T>) => void
  unsubscribe: (callback: SubscriberCallback<T>) => void
  notify: (params: T) => void
}

// HOOK
export function useSubscriber<T> (): SubscriberHook<T> {

  // STATE
  const subscribers = useRef<Set<SubscriberCallback<T>>>(new Set())

  // RETURN
  return {

    // PROPERTIES
    subscribers,

    // METHOD
    subscribe: (callback: SubscriberCallback<T>): void => {
      subscribers.current.add(callback)
    },

    // METHOD
    unsubscribe: (callback: SubscriberCallback<T>): void => {
      subscribers.current.delete(callback)
    },

    // METHOD
    notify: (params: T): void => {
      for (const callback of subscribers.current) {
        callback(params)
      }
    },

  }

}
