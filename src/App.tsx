// IMPORTS
import type { ReactNode } from 'react'
import { EditorWorkbench } from '@workbench/EditorWorkbench'
import css from './App.module.scss'

// COMPONENT
export default function App (): ReactNode {

  return <div className={css.App}>
    <EditorWorkbench className={css.workbench}/>
  </div>
}
