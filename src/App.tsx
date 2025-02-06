// IMPORTS
import type { ReactNode } from 'react'
import { ImageInputContext, useImageInput } from '@contexts/common/ImageInputContext'
import { EditorScreen } from '@screens/EditorScreen'
import { MainScreen } from '@screens/MainScreen'
import css from './App.module.scss'

// COMPONENT
export default function App (): ReactNode {

  // STATE
  const input = useImageInput()

  return <div className={css.App}>
    <ImageInputContext.Provider value={input}>

      {(input.image === null)
        ? <MainScreen className={css.screen}/>
        : <EditorScreen className={css.screen}/>}

    </ImageInputContext.Provider>
  </div>
}
