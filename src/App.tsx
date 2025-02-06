// IMPORTS
import type { ReactNode } from 'react'
import { ImageInputContext, useImageInput } from '@contexts/common/ImageInputContext'
import { MainScreen } from '@screens/MainScreen'
import css from './App.module.scss'

// COMPONENT
export default function App (): ReactNode {

  // STATE
  const input = useImageInput()

  return <div className={css.App}>
    <ImageInputContext.Provider value={input}>

      <MainScreen className={css.screen}/>

    </ImageInputContext.Provider>
  </div>
}
