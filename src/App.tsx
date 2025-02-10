// IMPORTS
import type { ReactNode } from 'react'
import { ImageInputContext, useImageInput } from '@contexts/common/ImageInputContext'
import { EditorWorkbench } from '@workbench/EditorWorkbench'
import css from './App.module.scss'

// COMPONENT
export default function App (): ReactNode {

  // STATE
  const input = useImageInput()

  return <div className={css.App}>
    <ImageInputContext.Provider value={input}>

      <EditorWorkbench className={css.workbench}/>

    </ImageInputContext.Provider>
  </div>
}
